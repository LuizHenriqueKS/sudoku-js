import IPosition from "./IPosition";
import ISudokuCell from "./ISudokuCell";
import Position from "./Position";

class SudokuCell implements ISudokuCell {

  private _row: number;
  private _col: number;
  private _square: number;
  private _value: string;

  private static VALID_VALUES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  constructor(row: number, col: number, square: number, value: string) {
    this._row = row;
    this._col = col;
    this._square = square;
    this._value = value;
  }

  isEmpty(): boolean {
    return !this.hasValue();
  }

  position(): IPosition {
    return new Position(this._row, this._col);
  }

  hasSamePosition(other: ISudokuCell): boolean {
    return this.col() == other.col() &&
      this.row() == other.row();
  }

  col(): number {
    return this._col;
  }

  row(): number {
    return this._row;
  }

  square(): number {
    return this._square;
  }

  value(newValue?: string): string {
    if (newValue) {
      this._value = newValue;
    }
    return this._value;
  }

  clear(): void {
    this._value = "?";
  }

  hasValue(): boolean {
    return !!this._value && SudokuCell.VALID_VALUES.includes(this._value);
  }

}

export default SudokuCell;