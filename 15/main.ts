type BoxToys<Fill, Count extends number> = Values<{
	[K in Count]: CreateArrayOfLength<K, Fill>;
}>;

type Values<T> = T[keyof T];

type CreateArrayOfLength<N extends number, Fill, _Arr extends unknown[] = []> =
	_Arr extends { length: N } ? _Arr : CreateArrayOfLength<N, Fill, [Fill, ..._Arr]>;