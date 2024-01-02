type Connect4Chips = '🔴' | '🟡';
type Connect4Cell = Connect4Chips | '  ';
type Connect4State = '🔴' | '🟡' | '🔴 Won' | '🟡 Won' | 'Draw';

type Connect4Board = Connect4Cell[][];
type EmptyBoard = [
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
];

type Connect4Game = {
  board: Connect4Board;
  state: Connect4State;
}
type NewGame = {
  board: EmptyBoard;
  state: "🟡";
};

type InvMap = {
  '🟡': '🔴'
  '🔴': '🟡'
}

type ROWS = 0|1|2|3|4|5;
type COLS = 0|1|2|3|4|5|6;

type ConcatRow<Row extends Connect4Cell[]> = 
  `${Row[0]}${Row[1]}${Row[2]}${Row[3]}${Row[4]}${Row[5]}${Row[6]}`;
type IsFull<T extends Connect4Board> = T[ROWS][COLS] extends Connect4Chips ? true : false;

type WinnerDetect<S extends string> = 
  S extends `${string}🔴🔴🔴🔴${string}` 
  ? '🔴' 
  : S extends `${string}🟡🟡🟡🟡${string}`
  ? '🟡'
  : '  ';

type CurRowMap = {
  0: 5,
  1: 4,
  2: 3,
  3: 2,
  4: 1,
  5: 0,
}
type CurRow<T extends number> = T extends keyof CurRowMap ? CurRowMap[T] : never;
type RowState<Row extends Connect4Cell[]> = WinnerDetect<ConcatRow<Row>>;
type ConcatCol<Board extends Connect4Board, Col extends COLS> = 
  `${Board[0][Col]}${Board[1][Col]}${Board[2][Col]}${Board[3][Col]}${Board[4][Col]}${Board[5][Col]}`;
type ColState<Board extends Connect4Board, Col extends COLS> = WinnerDetect<ConcatCol<Board, Col>>;

type PlaceInRow<Row extends Connect4Cell[], Col extends COLS, Chip extends Connect4Chips> =
  Col extends 0
  ? [Chip,Row[1],Row[2],Row[3],Row[4],Row[5],Row[6]]
  : Col extends 1
  ? [Row[0],Chip,Row[2],Row[3],Row[4],Row[5],Row[6]]
  : Col extends 2
  ? [Row[0],Row[1],Chip,Row[3],Row[4],Row[5],Row[6]]
  : Col extends 3
  ? [Row[0],Row[1],Row[2],Chip,Row[4],Row[5],Row[6]]
  : Col extends 4
  ? [Row[0],Row[1],Row[2],Row[3],Chip,Row[5],Row[6]]
  : Col extends 5
  ? [Row[0],Row[1],Row[2],Row[3],Row[4],Chip,Row[6]]
  : Col extends 6
  ? [Row[0],Row[1],Row[2],Row[3],Row[4],Row[5],Chip]
  : never;



type DiagMap = {
  r0: ['2-0', '3-1', '4-2', '5-3' ];
  r1: ['1-0', '2-1', '3-2', '4-3', '5-4'];
  r2: ['0-0' , '1-1' , '2-2' , '3-3' , '4-4' , '5-5'];
  r3: ['0-1' , '1-2' , '2-3' , '3-4' , '4-5' , '5-6'];
  r4: ['0-2' , '1-3' , '2-4' , '3-5' , '4-6'];
  r5: ['0-3' , '1-4' , '2-5' , '4-6'];
  l0: ['0-3' , '1-2' , '2-1' , '3-0'];
  l1: ['0-4' , '1-3' , '2-2' , '3-1' , '4-0'];
  l2: ['0-5' , '1-4' , '2-3' , '3-2' , '4-1' , '5-0'];
  l3: ['0-6' , '1-5' , '2-4' , '3-3' , '4-2' , '5-1'];
  l4: ['1-6' , '2-5' , '3-4' , '4-3' , '5-2'];
  l5: ['2-6' , '3-5' , '4-4' , '5-3'];
}

type ConcatDiag<Board extends Connect4Board, Diag extends string[]> = 
  Diag extends [infer Next, ...infer Rest extends string[]] 
  ? Next extends `${infer R extends ROWS}-${infer C extends COLS}`
    ? `${Board[R][C]}${ConcatDiag<Board,Rest>}`
    : never
  : '';

type AllDiags<Board extends Connect4Board> = Values<{
  [K in keyof DiagMap]: ConcatDiag<Board, DiagMap[K]>;
}>

type DiagWinner<Board extends Connect4Board> = WinnerDetect<AllDiags<Board>>;

type Length<T extends unknown[]> = T extends { length: infer L } ? L : never; 
type NextBoard<Board extends Connect4Board, Move extends COLS, Chip extends Connect4Chips, Acc extends Connect4Board = [], Found extends boolean = false> =
  Length<Acc> extends 6
  ? Acc
  : Found extends true
  ? NextBoard<Board, Move, Chip, [Board[CurRow<Length<Acc>>], ...Acc], true>
  : Board[CurRow<Length<Acc>>][Move] extends '  '
  ? NextBoard<Board, Move, Chip, [PlaceInRow<Board[CurRow<Length<Acc>>], Move, Chip>, ...Acc], true>
  : NextBoard<Board, Move, Chip, [Board[CurRow<Length<Acc>>], ...Acc], false>


type Values<T> = T[keyof T];
type RowWinner<Board extends Connect4Cell[][]> = Values<{
  [K in ROWS]: RowState<Board[K]>
}>;
type ColWinner<Board extends Connect4Cell[][]> = Values<{
  [K in COLS]: ColState<Board, K>
}>;

type AnyWinner<Board extends Connect4Cell[][]> =
  RowWinner<Board> | ColWinner<Board> | DiagWinner<Board>; 

type NextState<Board extends Connect4Cell[][], LastState extends Connect4Chips> =
  '🔴' extends AnyWinner<Board> 
  ? '🔴 Won'
  : '🟡' extends AnyWinner<Board> 
  ? '🟡 Won'
  : IsFull<Board> extends true
  ? 'Draw'
  : InvMap[LastState];

type NextGame<Board extends Connect4Cell[][], LastState extends Connect4Chips > = {
  board: Board,
  state: NextState<Board, LastState>
}
type Connect4<Game extends Connect4Game, Move extends COLS> = 
  Game['state'] extends Connect4Chips 
  ? NextGame<NextBoard<Game['board'], Move, Game['state']>, Game['state']>
  : Game;