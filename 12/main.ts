type FindSanta<T extends string[]> = keyof {
	[K in keyof T as T[K] extends '🎅🏼' ? K : never]: true; 
} extends `${infer U extends number}` ? U : never; 