export default interface IPosition {
  readonly row: number;
  readonly col: number;

  equals(other: IPosition): boolean;
}