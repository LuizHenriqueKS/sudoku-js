import ISudokuData from "../data/ISudokuData";
import ISudokuPossibleValues from "../data/ISudokuPossibleValues";

export default interface ISudokuPossibleValuesFinder {

  find(data: ISudokuData): ISudokuPossibleValues;

}