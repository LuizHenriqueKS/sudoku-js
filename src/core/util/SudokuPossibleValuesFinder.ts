import ISudokuCell from "../data/ISudokuCell";
import ISudokuData from "../data/ISudokuData";
import ISudokuPossibleValues from "../data/ISudokuPossibleValues";
import SudokuPossibleValues from "../data/SudokuPossibleValues";
import ISudokuPossibleValuesFinder from "./ISudokuPossibleValuesFinder";

export default class SudokuPossibleValuesFinder implements ISudokuPossibleValuesFinder {

  private static instance: SudokuPossibleValuesFinder = new SudokuPossibleValuesFinder();

  static getInstance(): SudokuPossibleValuesFinder {
    return this.instance;
  }

  find(data: ISudokuData): ISudokuPossibleValues {
    const possibleValues = SudokuPossibleValues.of(data);
    possibleValues.fillEmptyCellsWithAllValues();
    for (const cell of data.cells()) {
      if (cell.hasValue()) {
        const cellsByRow = data.cellsByRow(cell.row());
        const cellsByCol = data.cellsByCol(cell.col());
        const cellsBySquare = data.cellsBySquare(cell.square());
        this.removePossibleValueBy(possibleValues, cellsByRow, cell);
        this.removePossibleValueBy(possibleValues, cellsByCol, cell);
        this.removePossibleValueBy(possibleValues, cellsBySquare, cell);
      }
    }
    return possibleValues;
  }

  private removePossibleValueBy(possibleValues: ISudokuPossibleValues, cells: ISudokuCell[], cell: ISudokuCell) {
    for (const it of cells) {
      if (!it.hasSamePosition(cell) && it.isEmpty()) {
        possibleValues.cell(it.row(), it.col()).removePossibleValue(cell.value());
      }
    }
  }

}