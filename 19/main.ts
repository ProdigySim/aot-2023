type Rebuild<List extends number[]> = 
	List extends [infer A extends number, infer B extends number, infer C extends number, infer D extends number, ...infer Rest extends number[]]
		? Concat<ConcatAll<[MkArray<A, '🛹'>,MkArray<B, '🚲'>,MkArray<C, '🛴'>,MkArray<D, '🏄'>]>, Rebuild<Rest>>
		: List extends [infer A extends number, infer B extends number, infer C extends number]
			? ConcatAll<[MkArray<A, '🛹'>,MkArray<B, '🚲'>,MkArray<C, '🛴'>]>
			: List extends [infer A extends number, infer B extends number]
				? ConcatAll<[MkArray<A, '🛹'>,MkArray<B, '🚲'>]>
				: List extends [infer A extends number]
					? MkArray<A, '🛹'>
					: [];

type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];
type ConcatAll<T extends unknown[][]> = 
	T extends [infer X extends unknown[], ...infer Rest extends unknown[][]]
	? Concat<X, ConcatAll<Rest>> : [];

type MkArray<Len extends number, Fill, _Arr extends unknown[] = []> = 
	_Arr extends { length: Len } ? _Arr : MkArray<Len, Fill, [Fill, ..._Arr]>;

type xx = Rebuild<[1,2,3,4]>;
type yy = ConcatAll<[[1],[2],[3]]>
type zz = Concat<[1],[2]>