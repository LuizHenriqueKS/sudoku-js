
export default class InvalidSudokuError extends Error {

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidSudokuError.prototype);
  }

}