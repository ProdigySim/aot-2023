type TicTacToeChip = "❌" | "⭕";
type TicTacToeEndState = "❌ Won" | "⭕ Won" | "Draw";
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = "  ";
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = "top" | "middle" | "bottom";
type TicTacToeXPositions = "left" | "center" | "right";
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTactToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
	board: TicTactToeBoard;
	state: TicTacToeState;
};

type PosMap = {
	"top-left": [0, 0];
	"top-center": [0, 1];
	"top-right": [0, 2];
	"middle-left": [1, 0];
	"middle-center": [1, 1];
	"middle-right": [1, 2];
	"bottom-left": [2, 0];
	"bottom-center": [2, 1];
	"bottom-right": [2, 2];
};

type EmptyBoard = [["  ", "  ", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];

type NewGame = {
	board: EmptyBoard;
	state: "❌";
};

type IsFull<Board extends TicTactToeBoard> =
	`${Board[0][0]}${Board[0][1]}${Board[0][2]}${Board[1][0]}${Board[1][1]}${Board[1][2]}${Board[2][0]}${Board[2][1]}${Board[2][2]}` extends `${TicTacToeChip}${TicTacToeChip}${TicTacToeChip}${TicTacToeChip}${TicTacToeChip}${TicTacToeChip}${TicTacToeChip}${TicTacToeChip}${TicTacToeChip}`
		? true
		: false;
type Get<
	Game extends TicTacToeGame,
	Pos extends TicTacToePositions,
> = Game["board"][PosMap[Pos][0]][PosMap[Pos][1]];

type GetNext<
	Pos extends TicTacToePositions,
	Game extends TicTacToeGame,
	Move extends TicTacToePositions,
> = Move extends Pos // Move is on this cell.
	? Get<Game, Pos> extends "  "
		? Extract<Game["state"], TicTacToeChip>
		: Get<Game, Pos> // invalid
	: Get<Game, Pos>;

type NextState<
	Game extends TicTacToeGame,
	Move extends TicTacToePositions,
	NextBoard extends TicTactToeBoard,
> = "❌" extends Outcome<NextBoard>
	? "❌ Won"
  : "⭕" extends Outcome<NextBoard>
	? "⭕ Won"
	: IsFull<NextBoard> extends true
  ? "Draw"
  : Get<Game, Move> extends TicTacToeChip
  ? Game["state"]
  : Game["state"] extends "❌"
  ? "⭕"
  : "❌";

type CheckStr<S extends string> = S extends "❌❌❌" ? "❌" : S extends "⭕⭕⭕" ? "⭕" : never;
type CheckConstr<
	Board extends TicTactToeBoard,
	Constr extends "dia-0" | "dia-1" | `row-${0 | 1 | 2}` | `col-${0 | 1 | 2}`,
> = Constr extends "dia-0"
	? CheckStr<`${Board[0][0]}${Board[1][1]}${Board[2][2]}`>
	: Constr extends `dia-1`
		? CheckStr<`${Board[0][2]}${Board[1][1]}${Board[2][0]}`>
		: Constr extends `row-${infer R extends number}`
			? CheckStr<`${Board[R][0]}${Board[R][1]}${Board[R][2]}`>
			: Constr extends `col-${infer C extends number}`
				? CheckStr<`${Board[0][C]}${Board[1][C]}${Board[2][C]}`>
				: never;
type Values<T> = T[keyof T];
type Outcome<Board extends TicTactToeBoard> = Values<{
	[Constr in "dia-0" | "dia-1" | `row-${0 | 1 | 2}` | `col-${0 | 1 | 2}`]: CheckConstr<
		Board,
		Constr
	>;
}>;

type NextBoard<Game extends TicTacToeGame, Move extends TicTacToePositions> = [
	[
		GetNext<"top-left", Game, Move>,
		GetNext<"top-center", Game, Move>,
		GetNext<"top-right", Game, Move>,
	],
	[
		GetNext<"middle-left", Game, Move>,
		GetNext<"middle-center", Game, Move>,
		GetNext<"middle-right", Game, Move>,
	],
	[
		GetNext<"bottom-left", Game, Move>,
		GetNext<"bottom-center", Game, Move>,
		GetNext<"bottom-right", Game, Move>,
	],
];

type GenNext<
	Game extends TicTacToeGame,
	Move extends TicTacToePositions,
	NextBoard extends TicTactToeBoard,
> = {
	board: NextBoard;
	state: NextState<Game, Move, NextBoard>;
};
type TicTacToe<Game extends TicTacToeGame, Move extends TicTacToePositions> = GenNext<
	Game,
	Move,
	NextBoard<Game, Move>
>;

type g = {
  board: [
    ['⭕', '❌', '⭕'], 
    ['⭕', '❌', '❌'], 
    ['❌', '⭕', '  ']];
  state: '⭕';
};
type m = 'bottom-center'
type mm = NextBoard<g,m>;
type o = Outcome<mm>;
type zcv = 'x' | '';
type zxcv = zcv extends 'x' ? true : false;
type ss = NextState<g,m,mm>;
type conssa = CheckConstr<mm, 'col-1'>;