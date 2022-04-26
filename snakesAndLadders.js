const snakes = {
  9: 4,
  13: 8,
  20: 2,
  22: 19
};

const ladders = {
  1: 8,
  6: 10,
  15: 21
};

const createPlayer = function (name) {
  return player = {
    name: name,
    position: 0,
    status: 'playing'
  };
};

const rollDice = function () {
  return Math.ceil(Math.random() * 6);
};

const snakeTail = function (position, board) {
  return board.snakes[position]
};

const ladderTop = function (position, board) {
  return board.ladders[position]
};

const newPosition = function (position, board) {
  const nextPosition = position + rollDice();
  const snakeBite = snakeTail(nextPosition, board);
  const ladderClimb = ladderTop(nextPosition, board);
  return snakeBite || ladderClimb || nextPosition;
};

const runRound = function (player, board) {
  const nextPosition = newPosition(player.position, board);
  const status = nextPosition >= board.target ? 'won' : 'playing';
  return { name: player.name, position: nextPosition, status: status };
};

const isplaying = function (player) {
  return player.status === 'playing';
};

const isWon = function (player) {
  return player.status === 'won';
};

const generateStats = function (player1, player2) {
  const stats = {};
  stats[player1.name] = player1.position;
  stats[player2.name] = player2.position;
  return stats;
};

const snakesAndLadders = function (firstPlayer, secondPlayer, board) {
  let player1 = createPlayer(firstPlayer);
  let player2 = createPlayer(secondPlayer);
  const gameStats = [];

  while ([player1, player2].every(isplaying)) {
    player1 = runRound(player1, board);
    player2 = runRound(player2, board);
    gameStats.push(generateStats(player1, player2));
  }

  console.table(gameStats);
  return [player1, player2].find(isWon).name;
};

const board = {
  target: 25,
  snakes: snakes,
  ladders: ladders
};

console.log(snakesAndLadders('venkata', 'sai', board), 'Won!');
