type RemoveNaughtyChildren<T> = {
	[K in keyof T as K extends `naughty_${infer U}` ? never : K]: T[K]
};