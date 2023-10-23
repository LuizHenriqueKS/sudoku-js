import Sudoku from "../src/core/Sudoku";
import SudokuPossibleValues from "../src/core/data/SudokuPossibleValues";
import SudokuPossibleValuesCell from "../src/core/data/SudokuPossibleValuesCell";

const createSudokuEx = () => {
  return Sudoku.fromText(`
    534 678 912
    672 195 348
    198 342 567

    859 761 423
    426 853 791
    713 924 856

    961 537 284
    287 419 635
    345 286 179
  `);
};

describe('data', () => {
  it('should return the data', () => {
    const sudoku = createSudokuEx();
    const possiblevalues = SudokuPossibleValues.of(sudoku);
    expect(possiblevalues.data()).toBe(sudoku);
  });
});

describe('allValues', () => {
  it('should return an array with numbers of 1 to 9', () => {
    const expectedValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const sudoku = createSudokuEx();
    const possiblevalues = SudokuPossibleValues.of(sudoku);
    expect(possiblevalues.allValues()).toStrictEqual(expectedValues);
  });
});

describe('cell', () => {
  it('should return a cell', () => {
    const sudoku = createSudokuEx();
    const possiblevalues = SudokuPossibleValues.of(sudoku);
    const cell = possiblevalues.cell(1, 2);
    expect(cell.row()).toBe(1);
    expect(cell.col()).toBe(2);
    expect(cell.value()).toBe("2");
  });
});

describe('cells', () => {
  it('should return all cells', () => {
    const sudoku = createSudokuEx();
    const possiblevalues = SudokuPossibleValues.of(sudoku);
    const cells = possiblevalues.cells();
    expect(cells.length).toBe(sudoku.cells().length);
    expect(cells[0]).toBeInstanceOf(SudokuPossibleValuesCell);
  });
});

describe('emptyCellsWithOnePossibleValue', () => {
  it('should return cells with a possible value', () => {
    const sudoku = Sudoku.empty();
    const possiblevalues = SudokuPossibleValues.of(sudoku);
    const expectedCell = possiblevalues.cell(1, 2);
    expectedCell.addPossibleValue("4");
    const emptyCellsWithOnePossibleValue = possiblevalues.emptyCellsWithOnePossibleValue();
    expect(emptyCellsWithOnePossibleValue.length).toBe(1);
    expect(emptyCellsWithOnePossibleValue[0].row()).toBe(expectedCell.row());
    expect(emptyCellsWithOnePossibleValue[0].col()).toBe(expectedCell.col());
    expect(emptyCellsWithOnePossibleValue[0]).toBe(expectedCell);
  });
});

describe('emptyCellsWithZeroPossibleValues', () => {
  it('should return cells with no one possible value', () => {
    const sudoku = createSudokuEx();
    const possiblevalues = SudokuPossibleValues.of(sudoku);

    possiblevalues.fillEmptyCellsWithAllValues();

    const expectedCell = possiblevalues.cell(1, 2);
    expectedCell.cell().clear();
    expectedCell.clearPossibleValues();

    const emptyCellsWithZeroPossibleValues = possiblevalues.emptyCellsWithZeroPossibleValues();
    expect(emptyCellsWithZeroPossibleValues.length).toBe(1);
    expect(emptyCellsWithZeroPossibleValues[0].row()).toBe(expectedCell.row());
    expect(emptyCellsWithZeroPossibleValues[0].col()).toBe(expectedCell.col());
    expect(emptyCellsWithZeroPossibleValues[0]).toBe(expectedCell);
  });
});

describe('fillEmptyCellsWithAllValues', () => {
  it('should fill all empty cells with possible values from 1 to 9', () => {
    const sudoku = createSudokuEx();
    const possiblevalues = SudokuPossibleValues.of(sudoku);

    const emptyCell = possiblevalues.cell(1, 2);
    emptyCell.cell().clear();

    const filledCell = possiblevalues.cell(5, 3);

    expect(emptyCell.possibleValues().length).toBe(0);
    expect(filledCell.possibleValues().length).toBe(0);

    possiblevalues.fillEmptyCellsWithAllValues();

    expect(emptyCell.possibleValues().length).toBe(9);
    expect(emptyCell.possibleValues()).toStrictEqual(possiblevalues.allValues());

    expect(filledCell.possibleValues().length).toBe(0);
  });
});