/** because "dashing" implies speed */
type Dasher = '💨';

/** representing dancing or grace */
type Dancer = '💃';

/** a deer, prancing */
type Prancer = '🦌';

/** a star for the dazzling, slightly mischievous Vixen */
type Vixen = '🌟';

/** for the celestial body that shares its name */
type Comet = '☄️';

/** symbolizing love, as Cupid is the god of love */
type Cupid = '❤️';

/** representing thunder, as "Donner" means thunder in German */
type Donner = '🌩️';

/** meaning lightning in German, hence the lightning bolt */
type Blitzen = '⚡';

/** for his famous red nose */
type Rudolph = '🔴';

type Reindeer = Dasher | Dancer | Prancer | Vixen | Comet | Cupid | Donner | Blitzen | Rudolph;

type Threedeer = [Reindeer,Reindeer,Reindeer];
type Ninedeer = [Threedeer,Threedeer,Threedeer];
type DeerdokuExt = [
	Ninedeer, Ninedeer, Ninedeer, 
	Ninedeer, Ninedeer, Ninedeer, 
	Ninedeer, Ninedeer, Ninedeer
]
type DeerRow = [
	Reindeer,Reindeer,Reindeer,
	Reindeer,Reindeer,Reindeer,
	Reindeer,Reindeer,Reindeer
]
type Deerdoku = [
	DeerRow,DeerRow,DeerRow,
	DeerRow,DeerRow,DeerRow,
	DeerRow,DeerRow,DeerRow,
]
type UnfoldDeer<T extends Ninedeer> =
	[T[0][0], T[0][1], T[0][2],
	T[1][0], T[1][1], T[1][2],
	T[2][0], T[2][1], T[2][2],];
type Convert<T extends DeerdokuExt> = [
	UnfoldDeer<T[0]>,
	UnfoldDeer<T[1]>,
	UnfoldDeer<T[2]>,
	UnfoldDeer<T[3]>,
	UnfoldDeer<T[4]>,
	UnfoldDeer<T[5]>,
	UnfoldDeer<T[6]>,
	UnfoldDeer<T[7]>,
	UnfoldDeer<T[8]>,
];
type Validate<T extends DeerdokuExt> = 
ValidateInternal<Convert<T>>;

type ValidateInternal<T extends Deerdoku> = 
	'unmet' extends Values<TestRows<T>> 
	? false
	: 'unmet' extends Values<TestCols<T>>
	? false
	: 'unmet' extends Values<TestBoxes<T>>
	? false
	: true;

type BoxCoords = {
	0: `${0|1|2}-${0|1|2}`;
	1: `${0|1|2}-${3|4|5}`;
	2: `${0|1|2}-${6|7|8}`;
	3: `${3|4|5}-${0|1|2}`;
	4: `${3|4|5}-${3|4|5}`;
	5: `${3|4|5}-${6|7|8}`;
	6: `${6|7|8}-${0|1|2}`;
	7: `${6|7|8}-${3|4|5}`;
	8: `${6|7|8}-${6|7|8}`;
}
 
type NUMS = 0|1|2|3|4|5|6|7|8;
type Values<T> = T[keyof T];
type Test<List extends Reindeer> = false extends Values<{
	[K in Reindeer]: K extends List ? true : false;
}> ? 'unmet': 'met'; 

type xz = Test<Exclude<Reindeer, Vixen> | Vixen>;

type GetRow<T extends Deerdoku, R extends number> = 
		| T[R][0] | T[R][1] | T[R][2]
		| T[R][3] | T[R][4] | T[R][5]
		| T[R][6] | T[R][7] | T[R][8];
type GetCol<T extends Deerdoku, C extends number> = 
		| T[0][C] | T[1][C] | T[2][C]
		| T[3][C] | T[4][C] | T[5][C]
		| T[6][C] | T[7][C] | T[8][C];

type GetBox<T extends Deerdoku, B extends NUMS> = Values<{
	[K in BoxCoords[B]]: K extends `${infer Row extends NUMS}-${infer Col extends NUMS}` ? T[Row][Col] : never;
}>

type RowTest<T extends Deerdoku, R extends number> =
	Test<GetRow<T,R>>

type TestRows<T extends Deerdoku> = {
	[K in NUMS]: RowTest<T, K>;
}
type TestCols<T extends Deerdoku> = {
	[K in NUMS]: Test<GetCol<T, K>>;
}
type TestBoxes<T extends Deerdoku> = {
	[K in NUMS]: Test<GetBox<T, K>>;
}
type xx = TestRows<Convert<[
  [['💨', '💃', '🦌'], ['☄️', '❤️', '🌩️'], ['🌟', '⚡', '🔴']],
  [['🌟', '⚡', '🔴'], ['💨', '💃', '🦌'], ['☄️', '❤️', '🌩️']],
  [['☄️', '❤️', '🌩️'], ['🌟', '⚡', '🔴'], ['💨', '💃', '🦌']],
  [['🦌', '💨', '💃'], ['⚡', '☄️', '❤️'], ['🔴', '🌩️', '🌟']],
  [['🌩️', '🔴', '🌟'], ['🦌', '💨', '💃'], ['⚡', '☄️', '❤️']],
  [['⚡', '☄️', '❤️'], ['🌩️', '🔴', '🌟'], ['🦌', '💨', '💃']],
  [['💃', '🦌', '💨'], ['❤️', '🌟', '☄️'], ['⚡', '🔴', '🌟']],
  [['🔴', '🌩️', '⚡'], ['💃', '🦌', '💨'], ['❤️', '🌟', '☄️']],
  [['❤️', '🌟', '☄️'], ['🔴', '🌩️', '⚡'], ['💃', '🦌', '💨']]
	]>>;
  