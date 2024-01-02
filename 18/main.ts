type Count<Sack extends string[], Item extends string> = Length<Filter<Sack, Item>>;


type Length<T extends unknown[]> = T extends { length: infer L } ? L : never;


type Filter<List extends unknown[], Item> = List extends [Item, ...infer Rest]
	? [Item, ...Filter<Rest, Item>]
	: List extends [any, ...infer Rest] ? Filter<Rest, Item> : [];
