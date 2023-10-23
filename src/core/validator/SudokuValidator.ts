import ISudokuCell from "../data/ISudokuCell";
import ISudokuData from "../data/ISudokuData";
import ISudokuValidation from "../data/ISudokuValidation";
import ISudokuValidationResponse from "../data/ISudokuValidationResponse";
import ISudokuValidatorOptions from "../data/ISudokuValidatorOptions";
import ISudokuValidator from "./ISudokuValidator";

export default class SudokuValidator implements ISudokuValidator {

  static instance = new SudokuValidator();

  static getInstance(): SudokuValidator {
    return SudokuValidator.instance;
  }

  validate(data: ISudokuData, options?: ISudokuValidatorOptions): ISudokuValidationResponse {
    const validations: ISudokuValidation[] = [];
    const numCellsByRow = Math.sqrt(data.cells().length);
    const maxNumberOfValidations = (options && options.maxNumberOfValidations) ? options.maxNumberOfValidations : Number.MAX_VALUE;

    for (let i = 0; i < numCellsByRow; i++) {

      validations.push(...this.validateCells(data.cellsByRow(i), maxNumberOfValidations));
      if (validations.length >= maxNumberOfValidations) break;

      validations.push(...this.validateCells(data.cellsByCol(i), maxNumberOfValidations));
      if (validations.length >= maxNumberOfValidations) break;

      validations.push(...this.validateCells(data.cellsBySquare(i), maxNumberOfValidations));
      if (validations.length >= maxNumberOfValidations) break;

    }

    return { ok: validations.length === 0, validations };
  }

  private validateCells(cells: ISudokuCell[], maxNumberOfValidations: number): ISudokuValidation[] {
    const validations: ISudokuValidation[] = [];
    for (let i = 0; i < cells.length; i++) {
      for (let j = i + 1; j < cells.length; j++) {
        const a = cells[i];
        const b = cells[j];
        if (a.hasValue() && a.value() == b.value()) {
          validations.push({
            aPos: a.position(),
            bPos: b.position(),
            value: a.value()
          });
        }
      }
    }
    return validations;
  }

}