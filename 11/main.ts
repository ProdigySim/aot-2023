type SantaListProtector<T extends unknown> = 
	T extends Record<any, unknown> ? Readonly<{[K in keyof T]: SantaListProtector<T[K]> }>
	: T extends [infer X, ...infer Rest] ? Readonly<[SantaListProtector<X>, ...SantaListProtector<Rest>]>
	: T;
