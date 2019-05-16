// @flow
import MapSlicer from 'mapslice'
import fs from 'fs'
import batchPromises from 'batch-promises'
import uuidv1 from 'uuid/v1'
import path from 'path'
import { walkDir } from 'smart-fs'
import { createNodeWithEdges } from 'Database'
import { streamToBuffer } from 'Utils/media'
import type { ImageUpload, ImageType } from 'Types/ImageTypes'
import type { TilesetType } from 'Types/TilesetTypes'
import { upload } from 'Services/aws'
import { validateNew } from './tilesetDBSchema'
import config from '../../config'

const debug = require('debug')('api')

const createSlices = async (file: string, outputDir: string): Promise<void> =>
	new Promise((resolve) => {
		const mapSlicer = new MapSlicer({
			file, // (required) Huge image to slice
			output: `${outputDir}/{z}/{x}/{y}.png`, // Output file pattern
			imageMagick: true, // (default: false) If (true) then use ImageMagick instead of GraphicsMagick
			// background: '#0000000', // (default: '#FFFFFFFF') Background color to be used for the tiles. More: http://ow.ly/rsluD
			// tmp: './temp', // (default: '.tmp') Temporary directory to be used to store helper files
			parallelLimit: 3, // (default: 5) Maximum parallel tasks to be run at the same time (warning: processes can consume a lot of memory!)
			minWidth: 200, // See explanation about Size detection below
			skipEmptyTiles: true, // Skips all the empty tiles
			// bitdepth: 8,                       // (optional) See http://aheckmann.github.io/gm/docs.html#dither
			// dither: true,                      // (optional) See http://aheckmann.github.io/gm/docs.html#bitdepth
			// colors: 128,                       // (optional) See http://aheckmann.github.io/gm/docs.html#colors
			// autoStart: false,                  // (default: false) Automatically runs .start() if true
			// gm, // (optional) Alternative way to specify the GraphicsMagic library
		})

		mapSlicer.on('start', (files) => debug(`Starting to process ${files} files.`))
		mapSlicer.on('error', (err) => debug(err))
		mapSlicer.on('warning', (err) => debug(err))
		mapSlicer.on('progress', (progress) => debug(`Progress: ${Math.round(progress * 100)}%`))
		mapSlicer.on('end', () => {
			debug('Finished processing slices.')
			resolve()
		})
		mapSlicer.start()
	})

const tileDir = config.get('aws.tileDirectory')

const uploadSlices = async (dirpath: string, uid: string): Promise<void> => {
	const files = walkDir(dirpath)
	await batchPromises(5, files, (file) => {
		const buffer = fs.readFileSync(path.join(dirpath, file))
		const filename = path.join(tileDir, uid, file)
		return upload(buffer, filename)
	})
	//
}

const cleanup = async (dirpath: string): Promise<void> => {
	//
}

export const createTileSet = async (imageUpload: ImageUpload, imageNode: ImageType): Promise<TilesetType> => {
	const { createReadStream, filename } = await imageUpload
	const buffer = await streamToBuffer(createReadStream())
	const tileId = uuidv1()
	const dir = path.join('.temp', tileId)
	fs.mkdirSync(dir, { recursive: true })

	const outputDir = path.join(dir, 'output')
	fs.mkdirSync(outputDir)
	const filePath = path.join(dir, filename)
	fs.writeFileSync(filePath, buffer)

	await createSlices(filePath, outputDir)
	await uploadSlices(outputDir, tileId)
	// const { maxZoom,}
	await cleanup(dir)
	const tileset = {
		tileId,
	}
	const validated = await validateNew(tileset)
	const imageEdge = [
		{
			fromUid: imageNode.uid,
			pred: 'has_tiles',
		},
		{},
	]
	const newTileset = await createNodeWithEdges(validated, [imageEdge])
	// return { uid }
	return newTileset
}
