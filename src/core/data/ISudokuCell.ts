import IPosition from "./IPosition";

export default interface ISudokuCell {

  col(): number;
  row(): number;
  square(): number;

  value(newValue?: string): string;
  clear(): void;
  position(): IPosition;

  isEmpty(): boolean;
  hasValue(): boolean;
  hasSamePosition(other: ISudokuCell): boolean;

}