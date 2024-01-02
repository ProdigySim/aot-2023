type RockPaperScissors = '👊🏻' | '🖐🏾' | '✌🏽';

type RPSKey = '✌🏽🖐🏾👊🏻✌🏽';
type WhoWins<Opponent extends RockPaperScissors, Player extends RockPaperScissors> = 
	RPSKey extends `${string}${Player}${Opponent}${string}` 
		? 'win'
		: RPSKey extends `${string}${Opponent}${Player}${string}`
			? 'lose'
			: 'draw';
