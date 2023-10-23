import ISudokuValidation from "./ISudokuValidation";

export default interface ISudokuValidationResponse {
  readonly ok: boolean;
  readonly validations: ISudokuValidation[];
}