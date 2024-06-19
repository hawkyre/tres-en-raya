/**
 *
 * @param board a string of the format "........." representing a "tres en raya"/tic-tac-toe board, where . can be X, O or _
 * @returns true if the board is valid, false otherwise
 */

const validateBoard = (board: string) => {
  return /[_OX]{9}/.test(board);
};

// In order:
// - Horizontal (needs to be in the same row)
// - Negative diagonal (only one case)
// - Vertical (always 2 cells (any) + the comma in between Xs)
// - Positive diagonal (only one case)
const player1WinsRegexes = [/,XXX,/, /X,.X.,X/, /X...X...X/, /X..,.X.,..X/];
const player2WinsRegexes = [/,OOO,/, /O,.O.,O/, /O...O...O/, /O..,.O.,..O/];

const addSeparatorsToBoard = (board: string) => {
  return board.slice(0, 3) + ',' + board.slice(3, 6) + ',' + board.slice(6, 9);
};

/**
 *
 * @param board a string of the format "........." representing a "tres en raya"/tic-tac-toe board, where . can be X, O or _
 * @returns 'playing' if the board is not done, 'draw', 'player1' or 'player2' if it is representing the corresponding result
 */
const getBoardResult = (board: string) => {
  // First we add the commas to make it easier to work with
  board = addSeparatorsToBoard(board);

  if (player1WinsRegexes.some((regex) => regex.test(board))) {
    return 'player1';
  }

  console.log(board, /O,.O.,O/.exec(board));

  if (player2WinsRegexes.some((regex) => regex.test(board))) {
    return 'player2';
  }

  if (!board.includes('_')) {
    return 'draw';
  }

  return 'playing';
};

/**
 *
 * @param board a string of the format "...,...,..." representing a "tres en raya"/tic-tac-toe board, where . can be X, O or _
 * @returns a new board with the next move, without the commas, ready to be sent to the client
 *
 * Caveats:
 * - The board is assumed to be validated beforehand
 */
const getNextBoardMove = (board: string) => {
  // First we add the commas to make it easier to work with
  board = addSeparatorsToBoard(board);

  let regexRes;

  // Try to find 2 Xs horizontally next to each other (commas avoid 2-line XXs)
  const regexH1Index = /XX/g;

  while ((regexRes = regexH1Index.exec(board)) !== null) {
    console.log('matched on', 'regexIndex = /XX/', regexRes.index);
    const regexIndex = regexRes.index;
    const nextMoveIndex =
      regexIndex % 4 === 0 ? regexIndex + 2 : regexIndex - 1;

    // Check that we can actually play on this spot
    if (board[nextMoveIndex] === '_')
      return generateNewBoard(board, nextMoveIndex);
  }

  // Try to find 2 Xs horizontally separated by something that isn't a comma
  const regexH2Index = /X[_O]X/g;

  while ((regexRes = regexH2Index.exec(board)) !== null) {
    console.log('matched on', 'regexIndex = /X[_O]X/', regexRes.index);
    const regexIndex = regexRes.index;
    const nextMoveIndex = regexIndex + 1;

    // Check that we can actually play on this spot
    if (board[nextMoveIndex] === '_')
      return generateNewBoard(board, nextMoveIndex);
  }

  // Try to find 2 Xs vertically next to each other (2 cells + comma = 3)
  const regexV1Index = /X...X/g;

  while ((regexRes = regexV1Index.exec(board)) !== null) {
    console.log('matched on', 'regexIndex = /X...X/', regexRes.index);
    const regexIndex = regexRes.index;
    const nextMoveIndex = regexIndex / 4 < 1 ? regexIndex + 8 : regexIndex - 4;

    // Check that we can actually play on this spot
    if (board[nextMoveIndex] === '_')
      return generateNewBoard(board, nextMoveIndex);
  }

  // Try to find 2 Xs vertically separated (5 cells + 2 commas = 7)
  const regexV2Index = /X.......X/g;

  while ((regexRes = regexV2Index.exec(board)) !== null) {
    console.log('matched on', 'regexIndex = /X.......X/', regexRes.index);
    const regexIndex = regexRes.index;
    const nextMoveIndex = regexIndex + 4;

    // Check that we can actually play on this spot
    if (board[nextMoveIndex] === '_')
      return generateNewBoard(board, nextMoveIndex);
  }

  // We don't check for diagonals to not make it perfect
  // If none of the above, choose random index to move to
  console.log('matched on', 'nextMoveIndex === -1');
  const randomPossiblePositions = board
    .split('')
    .flatMap((play, i) => (play === '_' ? [i] : []));

  const nextMoveIndex =
    randomPossiblePositions[
      Math.floor(Math.random() * randomPossiblePositions.length)
    ];

  return generateNewBoard(board, nextMoveIndex);
};

const generateNewBoard = (board: string, indexToPlay: number) => {
  const newBoard =
    board.substring(0, indexToPlay) + 'O' + board.substring(indexToPlay + 1);

  // Cool trick to print the board in console for debugging
  console.table(newBoard.split(','));
  return newBoard.replaceAll(',', '');
};

export { validateBoard, getBoardResult, getNextBoardMove };
