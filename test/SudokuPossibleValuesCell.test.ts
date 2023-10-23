import SudokuCell from "../src/core/data/SudokuCell";
import SudokuPossibleValuesCell from "../src/core/data/SudokuPossibleValuesCell";

describe('col', () => {
  it('should return the column index', () => {
    const cell = new SudokuCell(1, 2, 3, "4");
    const spCell = new SudokuPossibleValuesCell(cell);
    expect(spCell.col()).toBe(cell.col());
  });
});

describe('row', () => {
  it('should return the row index', () => {
    const cell = new SudokuCell(1, 2, 3, "4");
    const spCell = new SudokuPossibleValuesCell(cell);
    expect(spCell.row()).toBe(cell.row());
  });
});

describe('cell', () => {
  it('should return the original cell', () => {
    const cell = new SudokuCell(1, 2, 3, "4");
    const spCell = new SudokuPossibleValuesCell(cell);
    expect(spCell.cell()).toBe(cell);
  });
});

describe('value', () => {
  it('should return the value', () => {
    const cell = new SudokuCell(1, 2, 3, "4");
    const spCell = new SudokuPossibleValuesCell(cell);
    expect(spCell.value()).toBe(cell.value());
  });
});

describe('hasValue', () => {
  it('should return true when the value is valid', () => {
    const cell = new SudokuCell(1, 2, 3, "4");
    const spCell = new SudokuPossibleValuesCell(cell);
    expect(spCell.hasValue()).toBeTruthy();
  });
  it('should return false when the value is invalid', () => {
    const cell = new SudokuCell(1, 2, 3, "?");
    const spCell = new SudokuPossibleValuesCell(cell);
    expect(spCell.hasValue()).toBeFalsy();
  });
});

describe('isValue', () => {
  it('should return true when the value is invalid', () => {
    const cell = new SudokuCell(1, 2, 3, "?");
    const spCell = new SudokuPossibleValuesCell(cell);
    expect(spCell.isEmpty()).toBeTruthy();
  });
  it('should return false when the value is valid', () => {
    const cell = new SudokuCell(1, 2, 3, "4");
    const spCell = new SudokuPossibleValuesCell(cell);
    expect(spCell.isEmpty()).toBeFalsy();
  });
});

describe('possibleValues', () => {
  it('should change and return the possible values', () => {
    const cell = new SudokuCell(1, 2, 3, "?");
    const spCell = new SudokuPossibleValuesCell(cell);
    expect(spCell.possibleValues().length).toBe(0);

    const possibleValues = ["1", "2", "3"]
    spCell.possibleValues(possibleValues);
    expect(spCell.possibleValues()).toBe(possibleValues);
  });
});

describe('addPossibleValue', () => {
  it('should add a new possible value', () => {
    const cell = new SudokuCell(1, 2, 3, "?");
    const spCell = new SudokuPossibleValuesCell(cell);
    expect(spCell.possibleValues().length).toBe(0);
    spCell.addPossibleValue("6");
    expect(spCell.possibleValues().length).toBe(1);
    expect(spCell.possibleValues()[0]).toBe("6");
  });
});

describe('removePossibleValue', () => {
  it('should add a new possible value', () => {
    const cell = new SudokuCell(1, 2, 3, "?");
    const spCell = new SudokuPossibleValuesCell(cell);
    spCell.possibleValues(["1", "3", "5"]);
    spCell.removePossibleValue("3");
    expect(spCell.possibleValues().length).toBe(2);
    expect(spCell.possibleValues()).toStrictEqual(["1", "5"]);
  });
});

describe('clearPossibleValues', () => {
  it('should add a new possible value', () => {
    const cell = new SudokuCell(1, 2, 3, "?");
    const spCell = new SudokuPossibleValuesCell(cell);
    spCell.possibleValues(["1", "3", "5"]);
    expect(spCell.possibleValues().length).toBe(3);
    spCell.clearPossibleValues();
    expect(spCell.possibleValues().length).toBe(0);
  });
});