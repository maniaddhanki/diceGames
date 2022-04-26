const createPlayer = function (name) {
  return player = {
    name: name,
    position: 0,
    hasWon: false
  };
};

const rollDice = function () {
  return Math.ceil(Math.random() * 6);
};

const snakeTail = function (position, board) {
  return board.snakes[position];
};

const ladderTop = function (position, board) {
  return board.ladders[position];
};

const newPosition = function (position, board) {
  const nextPosition = position + rollDice();
  const snakeBite = snakeTail(nextPosition, board);
  const ladderClimb = ladderTop(nextPosition, board);
  return snakeBite || ladderClimb || nextPosition;
};

const playRound = function (player, board) {
  const nextPosition = newPosition(player.position, board);
  const hasWon = nextPosition >= board.target;
  return { name: player.name, position: nextPosition, hasWon: hasWon };
};

const isPlaying = function (player) {
  return !player.hasWon;
};

const playerStats = function (stats, player) {
  stats[player.name] = player.position;
  return stats;
};

const generateStats = function (player) {
  return player.reduce(playerStats, {});
};

const noWinner = function (players) {
  return players.every(isPlaying);
};

const snakesAndLadders = function (playerNames, board) {
  let players = playerNames.map(createPlayer);
  const gameStats = [];

  while (noWinner(players)) {
    players = players.map(function (player) {
      return playRound(player, board);
    });
    gameStats.push(generateStats(players));
  }

  return gameStats;
};

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

const determineWinner = function (gameResult) {
  const target = 25;
  const lastRound = gameResult[gameResult.length - 1];
  return Object.keys(lastRound).find(function (player) {
    return lastRound[player] >= target;
  });
};

const board = {
  target: 25,
  snakes: snakes,
  ladders: ladders
};

const main = function () {
  const players = ['venkata', 'sai'];
  const gameResult = snakesAndLadders(players, board);
  const winner = determineWinner(gameResult);
  console.table(gameResult);
  console.log(winner, 'Won');
};

main();
