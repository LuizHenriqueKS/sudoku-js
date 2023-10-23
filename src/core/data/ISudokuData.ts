import ISudokuCell from "./ISudokuCell";

export default interface ISudokuData {
  cellsBySquare(i: number): ISudokuCell[];

  cell(row: number, col: number): ISudokuCell;
  cellsByCol(col: number): ISudokuCell[];
  cellsByRow(row: number): ISudokuCell[];
  cellsBySquare(square: number): ISudokuCell[];

  emptyCells(): ISudokuCell[];

  numberOfCols(): number;
  numberOfRows(): number;
  numberOfSquares(): number;

  cells(): ISudokuCell[];
  clone(): ISudokuData;

  toString(): string;
  equals(other: ISudokuData): boolean;

}