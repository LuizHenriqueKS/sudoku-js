import ISolutionInfo from "../data/ISolutionInfo";
import ISudokuData from "../data/ISudokuData";
import ISudokuPossibleValues from "../data/ISudokuPossibleValues";
import ISudokuPossibleValuesCell from "../data/ISudokuPossibleValuesCell";
import InvalidSudokuError from "../error/InvalidSudokuError";
import ValidationSudokuError from "../error/ValidationSudokuError";
import SudokuPossibleValuesFinder from "../util/SudokuPossibleValuesFinder";
import SudokuValidator from "../validator/SudokuValidator";
import ISudokuSolver from "./ISudokuSolver";

export default class SudokuSolver implements ISudokuSolver {

  private static instance = new SudokuSolver();

  static getInstance(): SudokuSolver {
    return SudokuSolver.instance;
  }

  solve(data: ISudokuData): ISolutionInfo {
    const solution = {};
    this.trySolve(solution, data);
    return solution;
  }

  private trySolve(solution: ISolutionInfo, data: ISudokuData): void {
    this.validateSudokuData(data);
    while (data.emptyCells().length > 0) {
      const possibleValues = this.findPossibleValues(data);
      if (possibleValues.emptyCellsWithZeroPossibleValues().length > 0) {
        this.throwEmptycellsWithZeroPossibleValues(possibleValues.emptyCellsWithZeroPossibleValues());
      } else if (possibleValues.emptyCellsWithOnePossibleValue().length > 0) {
        this.fillCellsWithOnePossibleValue(data, possibleValues);
      } else {
        this.fillNextEmptyCellAndTrySolve(solution, data, possibleValues);
      }
      this.validateSudokuData(data);
    }
  }

  private throwEmptycellsWithZeroPossibleValues(emptyCellsWithZeroPossibleValues: ISudokuPossibleValuesCell[]) {
    const firstCell = emptyCellsWithZeroPossibleValues[0];
    throw new InvalidSudokuError(
      `No possible value for: (row=${firstCell.row};col=${firstCell.col})`
    );
  }

  private validateSudokuData(data: ISudokuData): void {
    const validationResponse = SudokuValidator.getInstance().validate(data);
    if (!validationResponse.ok) {
      throw new ValidationSudokuError(validationResponse);
    }
  }

  private fillNextEmptyCellAndTrySolve(solution: ISolutionInfo, data: ISudokuData, possibleValues: ISudokuPossibleValues) {
    throw new Error("Method not implemented.");
  }

  private fillCellsWithOnePossibleValue(data: ISudokuData, possibleValues: ISudokuPossibleValues) {
    possibleValues
      .emptyCellsWithOnePossibleValue()
      .forEach(c => c.cell().value(c.possibleValues()[0]))
  }

  private findPossibleValues(data: ISudokuData): ISudokuPossibleValues {
    return SudokuPossibleValuesFinder.getInstance().find(data);
  }

}