function SudokuApp(el) {

  this.el = el;
  this.cells = [];

  this.init = function () {
    this.buildCells();
  };

  this.buildCells = function () {
    const exampleGroup = el.querySelector('.sudoku__group');
    const code = exampleGroup.innerHTML;
    const container = this.el;
    for (let i = 0; i < 9; i++) {
      const newGroup = document.createElement('div');
      newGroup.innerHTML = code;
      exampleGroup.classList.forEach(
        cl => newGroup.classList.add(cl)
      );
      newGroup.classList.remove('sudoku__group__example');
      container.appendChild(newGroup);
    }
    this.loadCells();
    this.updateSelection();
  };

  this.loadCells = function () {
    const unsortedCells = this.el.querySelectorAll('.sudoku__group:not(.sudoku__group__example) .sudoku__cell');
    for (let i = 0; i < unsortedCells.length; i++) {
      const pos = this.getPositionByUnsortedIndex(i);
      this.cells.push({
        row: pos.row,
        col: pos.col,
        group: pos.group,
        el: unsortedCells[i]
      });
    }
    this.cells.sort((a, b) => {
      const c1 = a.row - b.row;
      if (c1 == 0) {
        return a.col - b.col;
      }
      return c1;
    });
    console.debug(this.cells);
  };

  this.getPositionByUnsortedIndex = function (index) {
    const groupIndex = index % 9;
    const group = Math.floor(index / 9);
    const row = Math.floor(group / 3) * 3 + Math.floor(groupIndex / 3);
    const col = (group % 3) * 3 + (groupIndex % 3);
    return { group, row, col };
  };

  this.updateSelection = function () {
    const selectedCells = this.el.querySelectorAll('.selected');
    Array.from(selectedCells).forEach(
      cell => cell.classList.remove('selected')
    );
  };

  this.setValuesText = function (valuesText) {
    valuesText = removeValues(valuesText, ['\r', '\n', ' ', '\t']);
    const values = valuesText.split('');
    for (let i = 0; i < this.cells.length; i++) {
      let value = values[i];
      let cell = this.cells[i];
      value = value === '?' ? '' : value;
      cell.el.innerHTML = value;
    }
  };

  this.init();

}

var sudokuApp = new SudokuApp(document.querySelector('#sudoku'));
sudokuApp.setValuesText(`
  ?1? ??? ?8?
  ??? 9?6 5?7
  ??9 ?78 ???

  ?35 ??? 27?
  ??7 6?? ???
  ?9? ?3? 1?8

  2?1 5?? ???
  9?3 ?27 451
  8?4 164 79?
`);