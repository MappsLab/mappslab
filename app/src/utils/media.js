// @flow
import parseUrl from 'url-parse'
import type { ImageType } from 'Types/Media'

type ParsedURL = {
	hostname: string,
	pathname: string,
	query?: { [key: string]: string },
	href: string,
}
const VIMEO = 'vimeo'
const YOUTUBE = 'youtube'
const DAILYMOTION = 'dailymotion'

type VideoType = typeof YOUTUBE | typeof VIMEO | typeof DAILYMOTION

const VIMEO_MATCH_RE = /^(?:\/video|\/channels\/[\w-]+|\/groups\/[\w-]+\/videos)?\/(\d+)/

const getVideoType = (url: ParsedURL): VideoType => {
	if (url.hostname.indexOf('vimeo.com') > -1) return VIMEO
	if (url.hostname.indexOf('youtube.com') > -1 || url.hostname === 'youtu.be') return YOUTUBE
	if (url.hostname.indexOf('dailymotion.com') > -1) return DAILYMOTION
	throw new Error(`URL "${url.href}" is not a Youtube, Vimeo, or DailyMotion video`)
}

const getVideoId = (type: VideoType, url: ParsedURL): string => {
	if (type === VIMEO) {
		const match = VIMEO_MATCH_RE.exec(url.pathname)
		if (!match || !match[1]) throw new Error(`No match for vimeo url ${url.pathname}`)
		return match[1]
	}
	if (type === YOUTUBE) {
		if (url.hostname.indexOf('youtube.com') > -1 && url.query && url.query.v) {
			return url.query.v
		}

		if (url.hostname === 'youtu.be') {
			return url.pathname.split('/')[1]
		}
		throw new Error(`No match for youtube url ${url.pathname}`)
	}
	if (type === DAILYMOTION) {
		if (url.hostname.indexOf('dailymotion.com') > -1) {
			return url.pathname.split('/')[2].split('_')[0]
		}

		if (url.hostname === 'dai.ly') {
			return url.pathname.split('/')[1]
		}
		throw new Error(`No match for dailymotion url ${url.pathname}`)
	}
	throw new Error(`Video type "${type}" is not valid`)
}

const getEmbedSrc = (type: VideoType, id: string) => {
	switch (type) {
		case VIMEO:
			return `//player.vimeo.com/video/${id}`
		case YOUTUBE:
			return `//www.youtube.com/embed/${id}`
		case DAILYMOTION:
			return `//www.dailymotion.com/embed/video/${id}`
		default:
			throw new Error(`Video type "${type}" is not valid`)
	}
}

export type VideoInfo = {
	type: VideoType,
	id: string,
	src: string,
	url: string,
	parsedURL: ParsedURL,
}

/**
 * getVideoSrc
 *
 * returns an embed code when given a Youtube/Vimeo/DailyMotion URL
 */

export const getVideoInfo = (url: string): VideoInfo => {
	const parsedURL = parseUrl(url, true)
	if (!parsedURL || !parsedURL.hostname || !parsedURL.pathname) throw new Error('!!')
	if (parsedURL.hostname === undefined) throw new Error('?')
	const type = getVideoType(parsedURL)
	const id = getVideoId(type, parsedURL)
	const src = getEmbedSrc(type, id)
	return {
		type,
		id,
		src,
		parsedURL,
		url,
	}
}

/**
 * getBestSize
 *
 * returns the next-largest image size
 */
export const getBestSize = (image: ImageType, size: number) =>
	// include the original size in the search
	[...image.sizes, image.original]
		// sort the sizes
		.sort((a, b) => a.width - b.width)
		.reduce((prev, current) => {
			if (
				(size > prev.width && size < current.width) ||
				(size < prev.width && current.width < prev.width) ||
				(size > prev.width && size > current.width)
			)
				return current
			return prev
		})
