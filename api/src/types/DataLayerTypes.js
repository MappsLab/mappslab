// @flow

// input for the model
export interface NewDataLayerData {
	title: string;
	url: string;
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
