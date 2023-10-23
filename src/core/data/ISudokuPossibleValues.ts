import ISudokuData from "./ISudokuData";
import ISudokuPossibleValuesCell from "./ISudokuPossibleValuesCell";

export default interface ISudokuPossibleValues {

  data(): ISudokuData;

  allValues(): string[];

  cell(row: number, col: number): ISudokuPossibleValuesCell;
  cells(): ISudokuPossibleValuesCell[];
  emptyCellsWithOnePossibleValue(): ISudokuPossibleValuesCell[];
  emptyCellsWithZeroPossibleValues(): ISudokuPossibleValuesCell[];

  fillEmptyCellsWithAllValues(): void;

}