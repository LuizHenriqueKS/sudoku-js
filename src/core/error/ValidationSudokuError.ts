import ISudokuValidationResponse from "../data/ISudokuValidationResponse";

export default class ValidationSudokuError extends Error {

  validation: ISudokuValidationResponse;

  constructor(validation: ISudokuValidationResponse) {
    super(ValidationSudokuError.buildMessage(validation));
    Object.setPrototypeOf(this, ValidationSudokuError.prototype);
    this.validation = validation;
  }

  private static buildMessage(validation: ISudokuValidationResponse): string {
    const aPos = validation.validations[0].aPos;
    const bPos = validation.validations[0].bPos;
    return `Invalid sudoku: (row=${aPos.row};col=${aPos.col}) and (row=${bPos.row};col=${bPos.col})`;
  }

}