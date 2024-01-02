type FindSanta<T extends string[][]> = 
	keyof {
		[Row in Extract<keyof T, `${number}`> 
			as FindSantaTuple<T[Row]> extends 
				infer Column extends number 
					? `${Row},${Column}` 
					: never
		]: true; 
	} extends `${infer Row extends number},${infer Col extends number}` 
		? [Row, Col]
		: never; 

type FindSantaTuple<T extends string[]> = keyof {
	[K in keyof T as T[K] extends '🎅🏼' ? K : never]: true; 
} extends `${infer U extends number}` ? U : never; 



type FindSantax<T extends string[][]> = {
    [Row in Extract<keyof T, `${number}`> as FindSantaTuple<T[Row]>]: Row;
};

type xx = FindSantax<[
  ['🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎅🏼', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄'],
]>;
