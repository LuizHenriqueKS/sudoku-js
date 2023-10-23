import SudokuCell from "../src/core/data/SudokuCell";
import SudokuData from "../src/core/data/SudokuData";

describe('empty', () => {
  it('should return a sudoku with 81 cells', () => {
    const data = SudokuData.empty();
    expect(data.cells().length).toBe(81);
  });
});

describe('ofSize', () => {
  it('should return a sudoku with 64 cells', () => {
    const data = SudokuData.ofSize(8, 8);
    expect(data.cells().length).toBe(64);
  });
});

describe('cell', () => {
  it('should get a cell', () => {
    const data = SudokuData.empty();
    const cell12 = data.cell(1, 2);
    expect(cell12.row()).toBe(1);
    expect(cell12.col()).toBe(2);
    const cell21 = data.cell(2, 1);
    expect(cell21.row()).toBe(2);
    expect(cell21.col()).toBe(1);
  });
});

describe('cellsByRow', () => {
  it('should list cells from the same row', () => {
    const data = SudokuData.empty();
    expect(data.cellsByRow(0).length).toBe(9);
    for (const cell of data.cellsByRow(1)) {
      expect(cell.row()).toBe(1);
    }
    for (const cell of data.cellsByRow(2)) {
      expect(cell.row()).toBe(2);
    }
  });
});

describe('cellsByCol', () => {
  it('should list cells from the same column', () => {
    const data = SudokuData.empty();
    expect(data.cellsByCol(0).length).toBe(9);
    for (const cell of data.cellsByCol(1)) {
      expect(cell.col()).toBe(1);
    }
    for (const cell of data.cellsByCol(2)) {
      expect(cell.col()).toBe(2);
    }
  });
});

describe('cells', () => {
  it('should list cells from the same column', () => {
    const data = SudokuData.empty();
    const positions = [];
    expect(data.cells().length).toBe(81);
    for (const cell of data.cells()) {
      const pos = `${cell.row()}_${cell.col()}`;
      expect(positions.includes(pos)).toBeFalsy();
      positions.push(pos);
    }
  });
});

describe('clone', () => {
  it('should clone the sudoku', () => {
    const a = SudokuData.empty();
    a.cell(0, 0).value("3");
    const b = a.clone();
    expect(b.cell(0, 0).value()).toBe("3");
    b.cell(0, 0).value("4");
    a.cell(0, 0).value("3");
  });
});

describe('equals', () => {
  it('should compare two sudokus', () => {
    const a = SudokuData.empty();
    a.cell(0, 0).value("3");
    const b = a.clone();
    expect(a.equals(b)).toBeTruthy();
    b.cell(1, 1).value("5");
    expect(a.equals(b)).toBeFalsy();
  });
});

describe('toString', () => {
  it('should convert the sudoku object to string', () => {
    const a = SudokuData.empty();
    for (const cell of a.cells()) {
      const value = ((cell.row() + cell.col()) % 9) + 1;
      cell.value(value + "");
    }
    expect(a.toString()).toBe((
      "123 456 789\r\n"
      + "234 567 891\r\n"
      + "345 678 912\r\n"
      + "\r\n"
      + "456 789 123\r\n"
      + "567 891 234\r\n"
      + "678 912 345\r\n"
      + "\r\n"
      + "789 123 456\r\n"
      + "891 234 567\r\n"
      + "912 345 678\r\n"
    ).trim());
  });
});

describe('numberOfCols', () => {
  it('should return number of columns', () => {
    const sudoku = SudokuData.ofSize(9, 9)
    expect(sudoku.numberOfCols()).toBe(9);
  });
});

describe('numberOfRows', () => {
  it('should return number of rows', () => {
    const sudoku = SudokuData.ofSize(9, 9)
    expect(sudoku.numberOfRows()).toBe(9);
  });
});

describe('numberOfSquares', () => {
  it('should return number of squares', () => {
    const sudoku = SudokuData.ofSize(9, 9)
    expect(sudoku.numberOfSquares()).toBe(9);
  });
});

describe('cellsBySquare', () => {
  it('should list cells from the same square', () => {
    const data = SudokuData.ofSize(9, 9);
    const positions = [
      [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]], // 1
      [[0, 3], [0, 4], [0, 5], [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5]], // 2
      [[0, 6], [0, 7], [0, 8], [1, 6], [1, 7], [1, 8], [2, 6], [2, 7], [2, 8]], // 3
      [[3, 0], [3, 1], [3, 2], [4, 0], [4, 1], [4, 2], [5, 0], [5, 1], [5, 2]], // 4
      [[3, 3], [3, 4], [3, 5], [4, 3], [4, 4], [4, 5], [5, 3], [5, 4], [5, 5]], // 5
      [[3, 6], [3, 7], [3, 8], [4, 6], [4, 7], [4, 8], [5, 6], [5, 7], [5, 8]], // 6
      [[6, 0], [6, 1], [6, 2], [7, 0], [7, 1], [7, 2], [8, 0], [8, 1], [8, 2]], // 7
      [[6, 3], [6, 4], [6, 5], [7, 3], [7, 4], [7, 5], [8, 3], [8, 4], [8, 5]], // 8
      [[6, 6], [6, 7], [6, 8], [7, 6], [7, 7], [7, 8], [8, 6], [8, 7], [8, 8]]  // 9
    ];
    for (let squareIndex = 0; squareIndex < 9; squareIndex++) {
      const square = data.cellsBySquare(squareIndex);
      for (let i = 0; i < 9; i++) {
        const cell = square[i];
        const pos = positions[squareIndex][i];
        expect(cell.row()).toBe(pos[0])
        expect(cell.col()).toBe(pos[1])
      }
    }
  });
});

describe('emptyCells', () => {
  it('should list empty cells', () => {
    const data = SudokuData.empty();
    data.cell(3, 4).value("1");
    const emptyCells = data.emptyCells();
    expect(emptyCells.length).toBe(80);
    expect(
      emptyCells.find(c => c.row() === 3 && c.col() === 4)
    ).toBeUndefined();
  });
});