export const getLinePositionsForWin: (
  b: string
) => [number, number, string][] = (board: string) => {
  const lines: [number, number, string][] = [];

  let regex;

  regex = /X...X...X/g;
  if (regex.test(board)) {
    lines.push([0, 8, 'X']);
  }

  regex = /..X.X.X../g;
  if (regex.test(board)) {
    lines.push([2, 6, 'X']);
  }

  regex = /XXX....../g;
  if (regex.test(board)) {
    lines.push([0, 2, 'X']);
  }

  regex = /...XXX.../g;
  if (regex.test(board)) {
    lines.push([3, 5, 'X']);
  }

  regex = /......XXX/g;
  if (regex.test(board)) {
    lines.push([6, 8, 'X']);
  }

  regex = /X..X..X../g;
  if (regex.test(board)) {
    lines.push([0, 6, 'X']);
  }

  regex = /.X..X..X./g;
  if (regex.test(board)) {
    lines.push([1, 7, 'X']);
  }

  regex = /..X..X..X/g;
  if (regex.test(board)) {
    lines.push([2, 8, 'X']);
  }

  regex = /O...O...O/g;
  if (regex.test(board)) {
    lines.push([0, 8, 'O']);
  }

  regex = /..O.O.O../g;
  if (regex.test(board)) {
    lines.push([2, 6, 'O']);
  }

  regex = /OOO....../g;
  if (regex.test(board)) {
    lines.push([0, 2, 'O']);
  }

  regex = /...OOO.../g;
  if (regex.test(board)) {
    lines.push([3, 5, 'O']);
  }

  regex = /......OOO/g;
  if (regex.test(board)) {
    lines.push([6, 8, 'O']);
  }

  regex = /O..O..O../g;
  if (regex.test(board)) {
    lines.push([0, 6, 'O']);
  }

  regex = /.O..O..O./g;
  if (regex.test(board)) {
    lines.push([1, 7, 'O']);
  }

  regex = /..O..O..O/g;
  if (regex.test(board)) {
    lines.push([2, 8, 'O']);
  }

  return lines;
};
