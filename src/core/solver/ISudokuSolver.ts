import ISolutionInfo from "../data/ISolutionInfo";
import ISudokuData from "../data/ISudokuData";

export default interface ISudokuSolver {

  solve(data: ISudokuData): ISolutionInfo;

}
