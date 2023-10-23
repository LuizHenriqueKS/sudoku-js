import ISudokuData from "../data/ISudokuData";
import ISudokuValidationResponse from "../data/ISudokuValidationResponse";
import ISudokuValidatorOptions from "../data/ISudokuValidatorOptions";

export default interface ISudokuValidator {

  validate(data: ISudokuData, options?: ISudokuValidatorOptions): ISudokuValidationResponse;

}