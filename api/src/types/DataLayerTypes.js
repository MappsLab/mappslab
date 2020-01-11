// @flow

export type FileUpload = Promise<{
	createReadStream: () => ReadableStream,
	mimetype: string,
	filename: string,
}>

// input for the model
export interface NewDataLayerData {
	title: string;
	kml: FileUpload;
	addToMaps?: Array<string>;
}

// input for the resolver
export interface NewDataLayerInput {
	title: string;
	url: string;
}

export interface DataLayerType {
	uid: string;
	title: string;
	url: string;
}
