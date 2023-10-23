import IPosition from "./IPosition";

export default class Position implements IPosition {

  row: number;
  col: number;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  equals(other: IPosition): boolean {
    return this.row === other.row &&
      this.col === other.col;
  }

}