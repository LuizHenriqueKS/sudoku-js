import ISudokuPossibleValues from "./ISudokuPossibleValues";
import ISudokuPossibleValuesCell from "./ISudokuPossibleValuesCell";
import ISudokuData from "./ISudokuData";
import ISudokuCell from "./ISudokuCell";
import SudokuPossibleValuesCell from "./SudokuPossibleValuesCell";

export default class SudokuPossibleValues implements ISudokuPossibleValues {

  private _data: ISudokuData;
  private _cells: ISudokuPossibleValuesCell[];
  private _cellsByRow: ISudokuPossibleValuesCell[][];

  private _allValues: string[];

  private constructor(data: ISudokuData) {
    this._data = data;
    this._allValues = SudokuPossibleValues.createAllValues(this._data.cells().length);
    this._cells = this.createCells(this._data.cells());
    this._cellsByRow = this.indexCellsByRow(this._cells);
  }

  static of(data: ISudokuData): ISudokuPossibleValues {
    return new SudokuPossibleValues(data);
  }

  private createCells(cells: ISudokuCell[]): ISudokuPossibleValuesCell[] {
    const spCells: ISudokuPossibleValuesCell[] = [];
    for (let cell of cells) {
      const spCell = new SudokuPossibleValuesCell(cell);
      spCells.push(spCell);
    }
    return spCells;
  }

  private indexCellsByRow(cells: ISudokuPossibleValuesCell[]): ISudokuPossibleValuesCell[][] {
    const cellsByRow: ISudokuPossibleValuesCell[][] = [];
    for (let i = 0; i < this.numberOfRows(); i++) {
      const cells = this._cells.filter(c => c.row() === i);
      cellsByRow.push(cells);
    }
    return cellsByRow;
  }

  private static createAllValues(numOfCells: number): string[] {
    const maxValue = Math.sqrt(numOfCells);
    const allValues: string[] = [];
    for (let i = 1; i <= maxValue; i++) {
      allValues.push(i + "");
    }
    return allValues;
  }

  data(): ISudokuData {
    return this._data;
  }

  fillEmptyCellsWithAllValues(): void {
    const allValues = this.allValues();
    this
      .cells()
      .filter(c => c.isEmpty())
      .forEach(c => c.possibleValues(allValues));
  }

  numberOfRows(): number {
    return this._data.numberOfRows();
  }

  numberOfCols(): number {
    return this._data.numberOfCols();
  }

  allValues(): string[] {
    return [...this._allValues];
  }

  cell(row: number, col: number): ISudokuPossibleValuesCell {
    return this._cellsByRow[row][col];
  }

  cells(): ISudokuPossibleValuesCell[] {
    return [...this._cells];
  }

  emptyCellsWithOnePossibleValue(): ISudokuPossibleValuesCell[] {
    return this._cells.filter(
      c => c.isEmpty() && c.possibleValues().length == 1
    );
  }

  emptyCellsWithZeroPossibleValues(): ISudokuPossibleValuesCell[] {
    return this._cells.filter(
      c => c.isEmpty() && c.possibleValues().length == 0
    );
  }

}