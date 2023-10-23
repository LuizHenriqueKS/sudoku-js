import ISudokuCell from "./ISudokuCell";
import ISudokuPossibleValues from "./ISudokuPossibleValues";
import ISudokuPossibleValuesCell from "./ISudokuPossibleValuesCell";

export default class SudokuPossibleValuesCell implements ISudokuPossibleValuesCell {

  private _cell: ISudokuCell;
  private _possibleValues: string[];

  constructor(cell: ISudokuCell) {
    this._cell = cell;
    this._possibleValues = [];
  }

  hasValue(): boolean {
    return this._cell.hasValue();
  }

  isEmpty(): boolean {
    return this._cell.isEmpty();
  }

  col(): number {
    return this._cell.col();
  }

  row(): number {
    return this._cell.row();
  }

  cell(): ISudokuCell {
    return this._cell;
  }

  value(): string {
    return this._cell.value();
  }

  possibleValues(newPossibleValues?: string[]): string[] {
    if (newPossibleValues) {
      this._possibleValues = newPossibleValues;
    }
    return this._possibleValues;
  }

  addPossibleValue(possibleValue: string): void {
    if (!this._possibleValues.includes(possibleValue)) {
      this._possibleValues = [...this._possibleValues, possibleValue];
    }
  }

  removePossibleValue(possibleValue: string): void {
    this._possibleValues = this._possibleValues.filter(v => v !== possibleValue);
  }

  clearPossibleValues(): void {
    this._possibleValues = [];
  }

}