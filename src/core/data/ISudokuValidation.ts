import IPosition from "./IPosition";

export default interface ISudokuValidation {
  readonly aPos: IPosition;
  readonly bPos: IPosition;
  readonly value: string;
}