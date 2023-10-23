import IPosition from "./IPosition";
import ISudokuCell from "./ISudokuCell";
import ISudokuData from "./ISudokuData";
import SudokuCell from "./SudokuCell";

class SudokuData implements ISudokuData {

  private _cells: ISudokuCell[];
  private _cellsByCol: ISudokuCell[][];
  private _cellsByRow: ISudokuCell[][];
  private _cellsBySquare: ISudokuCell[][];

  private constructor(cells: ISudokuCell[]) {
    this._cells = cells;
    this._cellsByCol = this.indexCellsByCol(this._cells);
    this._cellsByRow = this.indexCellsByRow(this._cells);
    this._cellsBySquare = this.indexCellsBySquare(this._cells);
  }

  public static ofSize(numOfRows: number, numOfCols: number): SudokuData {
    const cells = this.createCells(numOfRows, numOfCols);
    return new SudokuData(cells);
  }

  public static empty(): SudokuData {
    return SudokuData.ofSize(9, 9);
  }

  private indexCellsBySquare(cells: ISudokuCell[]): ISudokuCell[][] {
    const squares: ISudokuCell[][] = [];
    const numOfSquares = Math.sqrt(cells.length);
    const numOfColsBySquare = Math.sqrt(numOfSquares);
    for (let i = 0; i < numOfSquares; i++) {
      squares.push(cells.filter(c => c.square() === i));
    }
    for (const square of squares) {
      square.sort((a, b) => {
        const comp = a.row() - b.row();
        if (comp == 0) {
          return a.col() - b.col();
        }
        return comp;
      });
    }
    return squares;
  }

  private static getSquareIndex(row: number, col: number) {
    return Math.floor(row / 3) * 3 + Math.floor(col / 3);
  }

  private indexCellsByCol(cells: ISudokuCell[]): ISudokuCell[][] {
    const cols: ISudokuCell[][] = [];
    for (let colIndex = 0; ; colIndex++) {
      const col = cells.filter(c => c.col() === colIndex);
      if (col.length === 0) break;
      cols.push(col);
    }
    return cols;
  }

  private indexCellsByRow(cells: ISudokuCell[]): ISudokuCell[][] {
    const rows: ISudokuCell[][] = [];
    for (let rowIndex = 0; ; rowIndex++) {
      const row = cells.filter(c => c.row() === rowIndex);
      if (row.length === 0) break;
      rows.push(row);
    }
    return rows;
  }

  private static createCells(numOfRows: number, numOfCols: number): ISudokuCell[] {
    const cells: ISudokuCell[] = [];
    for (let row = 0; row < numOfRows; row++) {
      for (let col = 0; col < numOfCols; col++) {
        const square = SudokuData.getSquareIndex(row, col);
        const cell = new SudokuCell(row, col, square, "?");
        cells.push(cell);
      }
    }
    return cells;
  }

  cell(row: number, col: number): ISudokuCell {
    return this._cellsByRow[row][col];
  }

  cellsByCol(col: number): ISudokuCell[] {
    return [...this._cellsByCol[col]];
  }

  cellsByRow(row: number): ISudokuCell[] {
    return [...this._cellsByRow[row]];
  }

  cells(): ISudokuCell[] {
    return [...this._cells];
  }

  clone(): ISudokuData {
    const cells: ISudokuCell[] = [];
    for (const srcCell of this.cells()) {
      const newCell = new SudokuCell(srcCell.row(), srcCell.col(), srcCell.square(), srcCell.value());
      cells.push(newCell);
    }
    return new SudokuData(cells);
  }

  toString(): string {
    let rows = [];
    let row = "";
    const numByRow = Math.sqrt(this._cells.length);
    const numByCol = Math.sqrt(numByRow);
    for (const cell of this.cells()) {
      row += cell.value();
      if (((cell.col() + 1) % numByCol) == 0) {
        row += " ";
      }
      if (((cell.col() + 1) % numByRow) == 0) {
        rows.push(row.trim());
        row = "";
        if (((cell.row() + 1) % numByCol) == 0) {
          rows.push("");
        }
      }
    }
    return rows.reduce((a, b) => `${a}\r\n${b}`).trim();
  }

  equals(other: ISudokuData): boolean {
    return this.toString() === other.toString();
  }

  cellsBySquare(square: number): ISudokuCell[] {
    return this._cellsBySquare[square];
  }

  numberOfCols(): number {
    return Math.sqrt(this._cells.length);
  }

  numberOfRows(): number {
    return Math.sqrt(this._cells.length);
  }

  numberOfSquares(): number {
    return Math.sqrt(this._cells.length);
  }

  emptyCells(): ISudokuCell[] {
    return this.cells().filter(c => c.isEmpty());
  }

}

export default SudokuData;