// @flow
import MapSlicer from 'mapslice'
import fs from 'fs'
import batchPromises from 'batch-promises'
import uuidv1 from 'uuid/v1'
import rimraf from 'rimraf'
import path from 'path'
import { walkDir } from 'smart-fs'
import { createNodeWithEdges } from 'Database'
import { streamToBuffer } from 'Utils/media'
import type { ImageUpload, ImageType } from 'Types/ImageTypes'
import type { TilesetType } from 'Types/TilesetTypes'
import { upload } from 'Services/aws'
import { validateNew } from './tilesetDBSchema'
import config from '../../config'

const debug = require('debug')('api:images')

const createSlices = async (file: string, outputDir: string): Promise<void> =>
	new Promise((resolve, reject) => {
		const mapSlicer = new MapSlicer({
			file, // (required) Huge image to slice
			output: `${outputDir}/{z}/{x}/{y}.png`, // Output file pattern
			imageMagick: true, // (default: false) If (true) then use ImageMagick instead of GraphicsMagick
			background: '#000000', // (default: '#FFFFFFFF') Background color to be used for the tiles. More: http://ow.ly/rsluD
			tmp: '.tmp', // (default: '.tmp') Temporary directory to be used to store helper files
			parallelLimit: 3, // (default: 5) Maximum parallel tasks to be run at the same time (warning: processes can consume a lot of memory!)
			minWidth: 200, // See explanation about Size detection below
			skipEmptyTiles: true, // Skips all the empty tiles
			// bitdepth: 8,                       // (optional) See http://aheckmann.github.io/gm/docs.html#dither
			// dither: true,                      // (optional) See http://aheckmann.github.io/gm/docs.html#bitdepth
			// colors: 128,                       // (optional) See http://aheckmann.github.io/gm/docs.html#colors
			// autoStart: false,                  // (default: false) Automatically runs .start() if true
			// gm, // (optional) Alternative way to specify the GraphicsMagic library
		})

		mapSlicer.on('start', (files) =>
			debug(`Starting to process ${files} files.`),
		)
		mapSlicer.on('error', (err) => {
			debug(err)
		})
		mapSlicer.on('warning', (err) => {
			debug(err)
		})
		mapSlicer.on('progress', (progress) => {
			debug(`Progress: ${Math.round(progress * 100)}%`)
			if (progress === 1) resolve()
		})
		mapSlicer.on('end', () => {
			debug('Finished processing slices.')
			resolve()
		})
		mapSlicer.start().catch((err) => {
			debug(err)
			reject(err)
		})
	})

const tileDir = config.get('aws.tileDirectory')
const bucketName = config.get('aws.bucketName')

const uploadSlices = async (
	sourceDir: string,
	baseUri: string,
): Promise<void> => {
	const files = walkDir(sourceDir)
	await batchPromises(5, files, (file) => {
		const buffer = fs.readFileSync(path.join(sourceDir, file))
		const filename = path.join(baseUri, file)
		return upload(buffer, filename)
	})
}

const isDirectory = (source) => fs.lstatSync(source).isDirectory()

const getMaxZoom = async (source: string): Promise<number> =>
	fs
		.readdirSync(source)
		.map((name) => path.join(source, name))
		.filter(isDirectory)
		.map((fullPath) => fullPath.split('/').slice(-1)[0])
		.reduce((prev, next) => Math.max(prev, parseInt(next, 10)), 0)

const cleanup = async (dirpath: string): Promise<void> => {
	rimraf(dirpath, (err) => {
		if (err) throw err
	})
}

export const createTileSet = async (
	imageUpload: ImageUpload,
	imageNode: ImageType,
): Promise<TilesetType> => {
	const { createReadStream, filename } = await imageUpload
	const buffer = await streamToBuffer(createReadStream())
	const uuid = uuidv1()
	const tempDir = '.temp'
	if (!fs.existsSync(tempDir)) {
		fs.mkdirSync(tempDir)
	}
	const tempFileDir = path.join(tempDir, uuid)
	const originalFileName = path.join(tempFileDir, filename)
	fs.mkdirSync(tempFileDir)
	fs.writeFileSync(originalFileName, buffer)

	await createSlices(originalFileName, tempFileDir)
	const uploadTo = [tileDir, uuid].join('/')
	await uploadSlices(tempFileDir, uploadTo)
	const maxZoom = await getMaxZoom(path.join(tempDir, uuid))
	await cleanup(path.join(tempDir, uuid))
	const baseUri = path.join(bucketName, uploadTo)

	const tileset = {
		baseUri,
		maxZoom,
	}
	const validated = await validateNew(tileset)
	const imageEdge = [
		{
			fromUid: imageNode.uid,
			pred: 'has_tileset',
		},
		{},
	]
	const newTileset = await createNodeWithEdges(validated, [imageEdge])

	return newTileset
}
