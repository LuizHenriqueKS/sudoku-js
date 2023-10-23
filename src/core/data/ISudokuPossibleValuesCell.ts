import ISudokuCell from "./ISudokuCell";

export default interface ISudokuPossibleValuesCell {

  col(): number;
  row(): number;
  cell(): ISudokuCell;

  value(): string;
  hasValue(): boolean;
  isEmpty(): boolean;

  possibleValues(newPossibleValues?: string[]): string[];

  addPossibleValue(possibleValue: string): void;
  removePossibleValue(possibleValue: string): void;
  clearPossibleValues(): void;

}