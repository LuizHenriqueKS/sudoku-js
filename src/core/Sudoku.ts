import ISolutionInfo from "./data/ISolutionInfo";
import ISudokuCell from "./data/ISudokuCell";
import ISudokuData from "./data/ISudokuData";
import ISudokuValidationResponse from "./data/ISudokuValidationResponse";
import ISudokuValidatorOptions from "./data/ISudokuValidatorOptions";
import SudokuData from "./data/SudokuData";
import SudokuSolver from "./solver/SudokuSolver";
import SudokuValidator from "./validator/SudokuValidator";

export default class Sudoku implements ISudokuData {

  private data: ISudokuData;

  private constructor(data: ISudokuData) {
    this.data = data;
  }

  static fromText(text: string): Sudoku {
    text = text
      .split(" ")
      .join('')
      .split("\r")
      .join('')
      .split("\n")
      .join('')
      .split('\t')
      .join('');
    const data = SudokuData.empty();
    const cells = data.cells();
    const values = text.split("");
    if (values.length !== cells.length) {
      throw new Error(`Expected ${cells.length} numbers but it was ${values.length}`);
    }
    for (let i = 0; i < values.length; i++) {
      cells[i].value(values[i]);
    }
    return new Sudoku(data);
  }

  static empty(): Sudoku {
    return new Sudoku(SudokuData.empty());
  }

  static ofSize(numOfRows: number, numOfCols: number): Sudoku {
    return new Sudoku(SudokuData.ofSize(numOfRows, numOfCols));
  }

  cell(row: number, col: number): ISudokuCell {
    return this.data.cell(row, col);
  }

  cellsByCol(col: number): ISudokuCell[] {
    return this.data.cellsByCol(col);
  }

  cellsByRow(row: number): ISudokuCell[] {
    return this.data.cellsByRow(row);
  }

  cells(): ISudokuCell[] {
    return this.data.cells();
  }

  clone(): Sudoku {
    const data = this.data.clone();
    return new Sudoku(data);
  }

  toString(): string {
    return this.data.toString();
  }

  equals(other: Sudoku): boolean {
    return this.data.equals(other.data);
  }

  validate(options?: ISudokuValidatorOptions): ISudokuValidationResponse {
    return SudokuValidator.getInstance().validate(this.data, options);
  }

  cellsBySquare(square: number): ISudokuCell[] {
    return this.data.cellsBySquare(square);
  }

  numberOfCols(): number {
    return this.data.numberOfCols();
  }

  numberOfRows(): number {
    return this.data.numberOfRows();
  }

  numberOfSquares(): number {
    return this.data.numberOfSquares();
  }

  solve(): ISolutionInfo {
    return SudokuSolver.getInstance().solve(this.data);
  }

  emptyCells(): ISudokuCell[] {
    return this.data.emptyCells();
  }

}
