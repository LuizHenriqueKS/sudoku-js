import SudokuCell from "../src/core/data/SudokuCell";

describe('col', () => {
  it('should return column index', () => {
    const cell = new SudokuCell(1, 2, 0, "3");
    expect(cell.col()).toBe(2);
  });
});

describe('row', () => {
  it('should return row index', () => {
    const cell = new SudokuCell(1, 2, 0, "3");
    expect(cell.row()).toBe(1);
  });
});

describe('square', () => {
  it('should return square index', () => {
    const cell = new SudokuCell(1, 2, 3, "3");
    expect(cell.square()).toBe(3);
  });
});

describe('value', () => {
  it('should return value', () => {
    const cell = new SudokuCell(1, 2, 0, "3");
    expect(cell.value()).toBe("3");
  });
  it('should change the value', () => {
    const cell = new SudokuCell(1, 2, 0, "1");
    expect(cell.value()).toBe("1");
    cell.value("2");
    expect(cell.value()).toBe("2");
  });
});

describe('hasValue', () => {
  it('should return true when value is a number from 0 till 9', () => {
    for (let i = 0; i < 10; i++) {
      const cell = new SudokuCell(1, 2, 0, "" + i);
      expect(cell.hasValue()).toBeTruthy();
    }
  });
  it('should return false when value is not a number', () => {
    const cell = new SudokuCell(1, 2, 0, "?");
    expect(cell.hasValue()).toBeFalsy();
  });
  it('should return false when value is greater than 9', () => {
    const cell = new SudokuCell(1, 2, 0, "10");
    expect(cell.hasValue()).toBeFalsy();
  });
  it('should return false when value is less than 0', () => {
    const cell = new SudokuCell(1, 2, 0, "-1");
    expect(cell.hasValue()).toBeFalsy();
  });
});

describe('clear', () => {
  it('should clear the value', () => {
    const cell = new SudokuCell(1, 2, 0, "3");
    expect(cell.hasValue()).toBeTruthy();
    cell.clear();
    expect(cell.hasValue()).toBeFalsy();
  });
});

describe('position', () => {
  it('should return an object with the position of the cell', () => {
    const cell = new SudokuCell(1, 2, 0, "?");
    expect(cell.col()).toBe(cell.position().col);
    expect(cell.row()).toBe(cell.position().row);
  });
});

describe('hasSamePosition', () => {
  it('should return true when two cells have same position', () => {
    const aCell = new SudokuCell(1, 2, 0, "1");
    const bCell = new SudokuCell(1, 2, 0, "2");
    expect(aCell.hasSamePosition(bCell)).toBeTruthy();
  });
  it('should return false when two cells have different positions', () => {
    const aCell = new SudokuCell(1, 2, 0, "?");
    const bCell = new SudokuCell(2, 2, 0, "?");
    expect(aCell.hasSamePosition(bCell)).toBeFalsy();
  });
});

describe('isEmpty', () => {
  it('should return false when value is a number from 0 till 9', () => {
    for (let i = 0; i < 10; i++) {
      const cell = new SudokuCell(1, 2, 0, "" + i);
      expect(cell.isEmpty()).toBeFalsy();
    }
  });
  it('should return true when value is not a number', () => {
    const cell = new SudokuCell(1, 2, 0, "?");
    expect(cell.isEmpty()).toBeTruthy();
  });
  it('should return true when value is greater than 9', () => {
    const cell = new SudokuCell(1, 2, 0, "10");
    expect(cell.isEmpty()).toBeTruthy();
  });
  it('should return true when value is less than 0', () => {
    const cell = new SudokuCell(1, 2, 0, "-1");
    expect(cell.isEmpty()).toBeTruthy();
  });
});