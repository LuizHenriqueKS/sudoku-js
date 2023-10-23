import Position from "../src/core/data/Position";

describe('equals', () => {
  it('should return true when two positions are same', () => {
    const aPos = new Position(1, 2);
    const bPos = new Position(1, 2);
    expect(aPos.equals(bPos)).toBeTruthy();
  });
  it('should return false when two positions are different', () => {
    const aPos = new Position(1, 2);
    const bPos = new Position(2, 2);
    expect(aPos.equals(bPos)).toBeFalsy();
  });
});
