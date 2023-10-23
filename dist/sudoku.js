/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Sudoku_1 = __importDefault(__webpack_require__(/*! ./core/Sudoku */ "./src/core/Sudoku.ts"));
window.Sudoku = Sudoku_1.default;
exports["default"] = Sudoku_1.default;


/***/ }),

/***/ "./src/core/Sudoku.ts":
/*!****************************!*\
  !*** ./src/core/Sudoku.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var SudokuData_1 = __importDefault(__webpack_require__(/*! ./data/SudokuData */ "./src/core/data/SudokuData.ts"));
var SudokuSolver_1 = __importDefault(__webpack_require__(/*! ./solver/SudokuSolver */ "./src/core/solver/SudokuSolver.ts"));
var SudokuValidator_1 = __importDefault(__webpack_require__(/*! ./validator/SudokuValidator */ "./src/core/validator/SudokuValidator.ts"));
var Sudoku = /** @class */ (function () {
    function Sudoku(data) {
        this.data = data;
    }
    Sudoku.fromText = function (text) {
        text = text
            .split(" ")
            .join('')
            .split("\r")
            .join('')
            .split("\n")
            .join('')
            .split('\t')
            .join('');
        var data = SudokuData_1.default.empty();
        var cells = data.cells();
        var values = text.split("");
        if (values.length !== cells.length) {
            throw new Error("Expected ".concat(cells.length, " numbers but it was ").concat(values.length));
        }
        for (var i = 0; i < values.length; i++) {
            cells[i].value(values[i]);
        }
        return new Sudoku(data);
    };
    Sudoku.empty = function () {
        return new Sudoku(SudokuData_1.default.empty());
    };
    Sudoku.ofSize = function (numOfRows, numOfCols) {
        return new Sudoku(SudokuData_1.default.ofSize(numOfRows, numOfCols));
    };
    Sudoku.prototype.cell = function (row, col) {
        return this.data.cell(row, col);
    };
    Sudoku.prototype.cellsByCol = function (col) {
        return this.data.cellsByCol(col);
    };
    Sudoku.prototype.cellsByRow = function (row) {
        return this.data.cellsByRow(row);
    };
    Sudoku.prototype.cells = function () {
        return this.data.cells();
    };
    Sudoku.prototype.clone = function () {
        var data = this.data.clone();
        return new Sudoku(data);
    };
    Sudoku.prototype.toString = function () {
        return this.data.toString();
    };
    Sudoku.prototype.equals = function (other) {
        return this.data.equals(other.data);
    };
    Sudoku.prototype.validate = function (options) {
        return SudokuValidator_1.default.getInstance().validate(this.data, options);
    };
    Sudoku.prototype.cellsBySquare = function (square) {
        return this.data.cellsBySquare(square);
    };
    Sudoku.prototype.numberOfCols = function () {
        return this.data.numberOfCols();
    };
    Sudoku.prototype.numberOfRows = function () {
        return this.data.numberOfRows();
    };
    Sudoku.prototype.numberOfSquares = function () {
        return this.data.numberOfSquares();
    };
    Sudoku.prototype.solve = function () {
        return SudokuSolver_1.default.getInstance().solve(this.data);
    };
    Sudoku.prototype.emptyCells = function () {
        return this.data.emptyCells();
    };
    return Sudoku;
}());
exports["default"] = Sudoku;


/***/ }),

/***/ "./src/core/data/Position.ts":
/*!***********************************!*\
  !*** ./src/core/data/Position.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Position = /** @class */ (function () {
    function Position(row, col) {
        this.row = row;
        this.col = col;
    }
    Position.prototype.equals = function (other) {
        return this.row === other.row &&
            this.col === other.col;
    };
    return Position;
}());
exports["default"] = Position;


/***/ }),

/***/ "./src/core/data/SudokuCell.ts":
/*!*************************************!*\
  !*** ./src/core/data/SudokuCell.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Position_1 = __importDefault(__webpack_require__(/*! ./Position */ "./src/core/data/Position.ts"));
var SudokuCell = /** @class */ (function () {
    function SudokuCell(row, col, square, value) {
        this._row = row;
        this._col = col;
        this._square = square;
        this._value = value;
    }
    SudokuCell.prototype.isEmpty = function () {
        return !this.hasValue();
    };
    SudokuCell.prototype.position = function () {
        return new Position_1.default(this._row, this._col);
    };
    SudokuCell.prototype.hasSamePosition = function (other) {
        return this.col() == other.col() &&
            this.row() == other.row();
    };
    SudokuCell.prototype.col = function () {
        return this._col;
    };
    SudokuCell.prototype.row = function () {
        return this._row;
    };
    SudokuCell.prototype.square = function () {
        return this._square;
    };
    SudokuCell.prototype.value = function (newValue) {
        if (newValue) {
            this._value = newValue;
        }
        return this._value;
    };
    SudokuCell.prototype.clear = function () {
        this._value = "?";
    };
    SudokuCell.prototype.hasValue = function () {
        return !!this._value && SudokuCell.VALID_VALUES.includes(this._value);
    };
    SudokuCell.VALID_VALUES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    return SudokuCell;
}());
exports["default"] = SudokuCell;


/***/ }),

/***/ "./src/core/data/SudokuData.ts":
/*!*************************************!*\
  !*** ./src/core/data/SudokuData.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var SudokuCell_1 = __importDefault(__webpack_require__(/*! ./SudokuCell */ "./src/core/data/SudokuCell.ts"));
var SudokuData = /** @class */ (function () {
    function SudokuData(cells) {
        this._cells = cells;
        this._cellsByCol = this.indexCellsByCol(this._cells);
        this._cellsByRow = this.indexCellsByRow(this._cells);
        this._cellsBySquare = this.indexCellsBySquare(this._cells);
    }
    SudokuData.ofSize = function (numOfRows, numOfCols) {
        var cells = this.createCells(numOfRows, numOfCols);
        return new SudokuData(cells);
    };
    SudokuData.empty = function () {
        return SudokuData.ofSize(9, 9);
    };
    SudokuData.prototype.indexCellsBySquare = function (cells) {
        var squares = [];
        var numOfSquares = Math.sqrt(cells.length);
        var numOfColsBySquare = Math.sqrt(numOfSquares);
        var _loop_1 = function (i) {
            squares.push(cells.filter(function (c) { return c.square() === i; }));
        };
        for (var i = 0; i < numOfSquares; i++) {
            _loop_1(i);
        }
        for (var _i = 0, squares_1 = squares; _i < squares_1.length; _i++) {
            var square = squares_1[_i];
            square.sort(function (a, b) {
                var comp = a.row() - b.row();
                if (comp == 0) {
                    return a.col() - b.col();
                }
                return comp;
            });
        }
        return squares;
    };
    SudokuData.getSquareIndex = function (row, col) {
        return Math.floor(row / 3) * 3 + Math.floor(col / 3);
    };
    SudokuData.prototype.indexCellsByCol = function (cells) {
        var cols = [];
        var _loop_2 = function (colIndex) {
            var col = cells.filter(function (c) { return c.col() === colIndex; });
            if (col.length === 0)
                return "break";
            cols.push(col);
        };
        for (var colIndex = 0;; colIndex++) {
            var state_1 = _loop_2(colIndex);
            if (state_1 === "break")
                break;
        }
        return cols;
    };
    SudokuData.prototype.indexCellsByRow = function (cells) {
        var rows = [];
        var _loop_3 = function (rowIndex) {
            var row = cells.filter(function (c) { return c.row() === rowIndex; });
            if (row.length === 0)
                return "break";
            rows.push(row);
        };
        for (var rowIndex = 0;; rowIndex++) {
            var state_2 = _loop_3(rowIndex);
            if (state_2 === "break")
                break;
        }
        return rows;
    };
    SudokuData.createCells = function (numOfRows, numOfCols) {
        var cells = [];
        for (var row = 0; row < numOfRows; row++) {
            for (var col = 0; col < numOfCols; col++) {
                var square = SudokuData.getSquareIndex(row, col);
                var cell = new SudokuCell_1.default(row, col, square, "?");
                cells.push(cell);
            }
        }
        return cells;
    };
    SudokuData.prototype.cell = function (row, col) {
        return this._cellsByRow[row][col];
    };
    SudokuData.prototype.cellsByCol = function (col) {
        return __spreadArray([], this._cellsByCol[col], true);
    };
    SudokuData.prototype.cellsByRow = function (row) {
        return __spreadArray([], this._cellsByRow[row], true);
    };
    SudokuData.prototype.cells = function () {
        return __spreadArray([], this._cells, true);
    };
    SudokuData.prototype.clone = function () {
        var cells = [];
        for (var _i = 0, _a = this.cells(); _i < _a.length; _i++) {
            var srcCell = _a[_i];
            var newCell = new SudokuCell_1.default(srcCell.row(), srcCell.col(), srcCell.square(), srcCell.value());
            cells.push(newCell);
        }
        return new SudokuData(cells);
    };
    SudokuData.prototype.toString = function () {
        var rows = [];
        var row = "";
        var numByRow = Math.sqrt(this._cells.length);
        var numByCol = Math.sqrt(numByRow);
        for (var _i = 0, _a = this.cells(); _i < _a.length; _i++) {
            var cell = _a[_i];
            row += cell.value();
            if (((cell.col() + 1) % numByCol) == 0) {
                row += " ";
            }
            if (((cell.col() + 1) % numByRow) == 0) {
                rows.push(row.trim());
                row = "";
                if (((cell.row() + 1) % numByCol) == 0) {
                    rows.push("");
                }
            }
        }
        return rows.reduce(function (a, b) { return "".concat(a, "\r\n").concat(b); }).trim();
    };
    SudokuData.prototype.equals = function (other) {
        return this.toString() === other.toString();
    };
    SudokuData.prototype.cellsBySquare = function (square) {
        return this._cellsBySquare[square];
    };
    SudokuData.prototype.numberOfCols = function () {
        return Math.sqrt(this._cells.length);
    };
    SudokuData.prototype.numberOfRows = function () {
        return Math.sqrt(this._cells.length);
    };
    SudokuData.prototype.numberOfSquares = function () {
        return Math.sqrt(this._cells.length);
    };
    SudokuData.prototype.emptyCells = function () {
        return this.cells().filter(function (c) { return c.isEmpty(); });
    };
    return SudokuData;
}());
exports["default"] = SudokuData;


/***/ }),

/***/ "./src/core/data/SudokuPossibleValues.ts":
/*!***********************************************!*\
  !*** ./src/core/data/SudokuPossibleValues.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var SudokuPossibleValuesCell_1 = __importDefault(__webpack_require__(/*! ./SudokuPossibleValuesCell */ "./src/core/data/SudokuPossibleValuesCell.ts"));
var SudokuPossibleValues = /** @class */ (function () {
    function SudokuPossibleValues(data) {
        this._data = data;
        this._allValues = SudokuPossibleValues.createAllValues(this._data.cells().length);
        this._cells = this.createCells(this._data.cells());
        this._cellsByRow = this.indexCellsByRow(this._cells);
    }
    SudokuPossibleValues.of = function (data) {
        return new SudokuPossibleValues(data);
    };
    SudokuPossibleValues.prototype.createCells = function (cells) {
        var spCells = [];
        for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
            var cell = cells_1[_i];
            var spCell = new SudokuPossibleValuesCell_1.default(cell);
            spCells.push(spCell);
        }
        return spCells;
    };
    SudokuPossibleValues.prototype.indexCellsByRow = function (cells) {
        var cellsByRow = [];
        var _loop_1 = function (i) {
            var cells_2 = this_1._cells.filter(function (c) { return c.row() === i; });
            cellsByRow.push(cells_2);
        };
        var this_1 = this;
        for (var i = 0; i < this.numberOfRows(); i++) {
            _loop_1(i);
        }
        return cellsByRow;
    };
    SudokuPossibleValues.createAllValues = function (numOfCells) {
        var maxValue = Math.sqrt(numOfCells);
        var allValues = [];
        for (var i = 1; i <= maxValue; i++) {
            allValues.push(i + "");
        }
        return allValues;
    };
    SudokuPossibleValues.prototype.data = function () {
        return this._data;
    };
    SudokuPossibleValues.prototype.fillEmptyCellsWithAllValues = function () {
        var allValues = this.allValues();
        this
            .cells()
            .filter(function (c) { return c.isEmpty(); })
            .forEach(function (c) { return c.possibleValues(allValues); });
    };
    SudokuPossibleValues.prototype.numberOfRows = function () {
        return this._data.numberOfRows();
    };
    SudokuPossibleValues.prototype.numberOfCols = function () {
        return this._data.numberOfCols();
    };
    SudokuPossibleValues.prototype.allValues = function () {
        return __spreadArray([], this._allValues, true);
    };
    SudokuPossibleValues.prototype.cell = function (row, col) {
        return this._cellsByRow[row][col];
    };
    SudokuPossibleValues.prototype.cells = function () {
        return __spreadArray([], this._cells, true);
    };
    SudokuPossibleValues.prototype.emptyCellsWithOnePossibleValue = function () {
        return this._cells.filter(function (c) { return c.isEmpty() && c.possibleValues().length == 1; });
    };
    SudokuPossibleValues.prototype.emptyCellsWithZeroPossibleValues = function () {
        return this._cells.filter(function (c) { return c.isEmpty() && c.possibleValues().length == 0; });
    };
    return SudokuPossibleValues;
}());
exports["default"] = SudokuPossibleValues;


/***/ }),

/***/ "./src/core/data/SudokuPossibleValuesCell.ts":
/*!***************************************************!*\
  !*** ./src/core/data/SudokuPossibleValuesCell.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports) {


var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var SudokuPossibleValuesCell = /** @class */ (function () {
    function SudokuPossibleValuesCell(cell) {
        this._cell = cell;
        this._possibleValues = [];
    }
    SudokuPossibleValuesCell.prototype.hasValue = function () {
        return this._cell.hasValue();
    };
    SudokuPossibleValuesCell.prototype.isEmpty = function () {
        return this._cell.isEmpty();
    };
    SudokuPossibleValuesCell.prototype.col = function () {
        return this._cell.col();
    };
    SudokuPossibleValuesCell.prototype.row = function () {
        return this._cell.row();
    };
    SudokuPossibleValuesCell.prototype.cell = function () {
        return this._cell;
    };
    SudokuPossibleValuesCell.prototype.value = function () {
        return this._cell.value();
    };
    SudokuPossibleValuesCell.prototype.possibleValues = function (newPossibleValues) {
        if (newPossibleValues) {
            this._possibleValues = newPossibleValues;
        }
        return this._possibleValues;
    };
    SudokuPossibleValuesCell.prototype.addPossibleValue = function (possibleValue) {
        if (!this._possibleValues.includes(possibleValue)) {
            this._possibleValues = __spreadArray(__spreadArray([], this._possibleValues, true), [possibleValue], false);
        }
    };
    SudokuPossibleValuesCell.prototype.removePossibleValue = function (possibleValue) {
        this._possibleValues = this._possibleValues.filter(function (v) { return v !== possibleValue; });
    };
    SudokuPossibleValuesCell.prototype.clearPossibleValues = function () {
        this._possibleValues = [];
    };
    return SudokuPossibleValuesCell;
}());
exports["default"] = SudokuPossibleValuesCell;


/***/ }),

/***/ "./src/core/error/InvalidSudokuError.ts":
/*!**********************************************!*\
  !*** ./src/core/error/InvalidSudokuError.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var InvalidSudokuError = /** @class */ (function (_super) {
    __extends(InvalidSudokuError, _super);
    function InvalidSudokuError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, InvalidSudokuError.prototype);
        return _this;
    }
    return InvalidSudokuError;
}(Error));
exports["default"] = InvalidSudokuError;


/***/ }),

/***/ "./src/core/error/ValidationSudokuError.ts":
/*!*************************************************!*\
  !*** ./src/core/error/ValidationSudokuError.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var ValidationSudokuError = /** @class */ (function (_super) {
    __extends(ValidationSudokuError, _super);
    function ValidationSudokuError(validation) {
        var _this = _super.call(this, ValidationSudokuError.buildMessage(validation)) || this;
        Object.setPrototypeOf(_this, ValidationSudokuError.prototype);
        _this.validation = validation;
        return _this;
    }
    ValidationSudokuError.buildMessage = function (validation) {
        var aPos = validation.validations[0].aPos;
        var bPos = validation.validations[0].bPos;
        return "Invalid sudoku: (row=".concat(aPos.row, ";col=").concat(aPos.col, ") and (row=").concat(bPos.row, ";col=").concat(bPos.col, ")");
    };
    return ValidationSudokuError;
}(Error));
exports["default"] = ValidationSudokuError;


/***/ }),

/***/ "./src/core/solver/SudokuSolver.ts":
/*!*****************************************!*\
  !*** ./src/core/solver/SudokuSolver.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var InvalidSudokuError_1 = __importDefault(__webpack_require__(/*! ../error/InvalidSudokuError */ "./src/core/error/InvalidSudokuError.ts"));
var ValidationSudokuError_1 = __importDefault(__webpack_require__(/*! ../error/ValidationSudokuError */ "./src/core/error/ValidationSudokuError.ts"));
var SudokuPossibleValuesFinder_1 = __importDefault(__webpack_require__(/*! ../util/SudokuPossibleValuesFinder */ "./src/core/util/SudokuPossibleValuesFinder.ts"));
var SudokuValidator_1 = __importDefault(__webpack_require__(/*! ../validator/SudokuValidator */ "./src/core/validator/SudokuValidator.ts"));
var SudokuSolver = /** @class */ (function () {
    function SudokuSolver() {
    }
    SudokuSolver.getInstance = function () {
        return SudokuSolver.instance;
    };
    SudokuSolver.prototype.solve = function (data) {
        var solution = {};
        this.trySolve(solution, data);
        return solution;
    };
    SudokuSolver.prototype.trySolve = function (solution, data) {
        this.validateSudokuData(data);
        while (data.emptyCells().length > 0) {
            var possibleValues = this.findPossibleValues(data);
            if (possibleValues.emptyCellsWithZeroPossibleValues().length > 0) {
                this.throwEmptycellsWithZeroPossibleValues(possibleValues.emptyCellsWithZeroPossibleValues());
            }
            else if (possibleValues.emptyCellsWithOnePossibleValue().length > 0) {
                this.fillCellsWithOnePossibleValue(data, possibleValues);
            }
            else {
                this.fillNextEmptyCellAndTrySolve(solution, data, possibleValues);
            }
            this.validateSudokuData(data);
        }
    };
    SudokuSolver.prototype.throwEmptycellsWithZeroPossibleValues = function (emptyCellsWithZeroPossibleValues) {
        var firstCell = emptyCellsWithZeroPossibleValues[0];
        throw new InvalidSudokuError_1.default("No possible value for: (row=".concat(firstCell.row, ";col=").concat(firstCell.col, ")"));
    };
    SudokuSolver.prototype.validateSudokuData = function (data) {
        var validationResponse = SudokuValidator_1.default.getInstance().validate(data);
        if (!validationResponse.ok) {
            throw new ValidationSudokuError_1.default(validationResponse);
        }
    };
    SudokuSolver.prototype.fillNextEmptyCellAndTrySolve = function (solution, data, possibleValues) {
        throw new Error("Method not implemented.");
    };
    SudokuSolver.prototype.fillCellsWithOnePossibleValue = function (data, possibleValues) {
        possibleValues
            .emptyCellsWithOnePossibleValue()
            .forEach(function (c) { return c.cell().value(c.possibleValues()[0]); });
    };
    SudokuSolver.prototype.findPossibleValues = function (data) {
        return SudokuPossibleValuesFinder_1.default.getInstance().find(data);
    };
    SudokuSolver.instance = new SudokuSolver();
    return SudokuSolver;
}());
exports["default"] = SudokuSolver;


/***/ }),

/***/ "./src/core/util/SudokuPossibleValuesFinder.ts":
/*!*****************************************************!*\
  !*** ./src/core/util/SudokuPossibleValuesFinder.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var SudokuPossibleValues_1 = __importDefault(__webpack_require__(/*! ../data/SudokuPossibleValues */ "./src/core/data/SudokuPossibleValues.ts"));
var SudokuPossibleValuesFinder = /** @class */ (function () {
    function SudokuPossibleValuesFinder() {
    }
    SudokuPossibleValuesFinder.getInstance = function () {
        return this.instance;
    };
    SudokuPossibleValuesFinder.prototype.find = function (data) {
        var possibleValues = SudokuPossibleValues_1.default.of(data);
        possibleValues.fillEmptyCellsWithAllValues();
        for (var _i = 0, _a = data.cells(); _i < _a.length; _i++) {
            var cell = _a[_i];
            if (cell.hasValue()) {
                var cellsByRow = data.cellsByRow(cell.row());
                var cellsByCol = data.cellsByCol(cell.col());
                var cellsBySquare = data.cellsBySquare(cell.square());
                this.removePossibleValueBy(possibleValues, cellsByRow, cell);
                this.removePossibleValueBy(possibleValues, cellsByCol, cell);
                this.removePossibleValueBy(possibleValues, cellsBySquare, cell);
            }
        }
        return possibleValues;
    };
    SudokuPossibleValuesFinder.prototype.removePossibleValueBy = function (possibleValues, cells, cell) {
        for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
            var it_1 = cells_1[_i];
            if (!it_1.hasSamePosition(cell) && it_1.isEmpty()) {
                possibleValues.cell(it_1.row(), it_1.col()).removePossibleValue(cell.value());
            }
        }
    };
    SudokuPossibleValuesFinder.instance = new SudokuPossibleValuesFinder();
    return SudokuPossibleValuesFinder;
}());
exports["default"] = SudokuPossibleValuesFinder;


/***/ }),

/***/ "./src/core/validator/SudokuValidator.ts":
/*!***********************************************!*\
  !*** ./src/core/validator/SudokuValidator.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var SudokuValidator = /** @class */ (function () {
    function SudokuValidator() {
    }
    SudokuValidator.getInstance = function () {
        return SudokuValidator.instance;
    };
    SudokuValidator.prototype.validate = function (data, options) {
        var validations = [];
        var numCellsByRow = Math.sqrt(data.cells().length);
        var maxNumberOfValidations = (options && options.maxNumberOfValidations) ? options.maxNumberOfValidations : Number.MAX_VALUE;
        for (var i = 0; i < numCellsByRow; i++) {
            validations.push.apply(validations, this.validateCells(data.cellsByRow(i), maxNumberOfValidations));
            if (validations.length >= maxNumberOfValidations)
                break;
            validations.push.apply(validations, this.validateCells(data.cellsByCol(i), maxNumberOfValidations));
            if (validations.length >= maxNumberOfValidations)
                break;
            validations.push.apply(validations, this.validateCells(data.cellsBySquare(i), maxNumberOfValidations));
            if (validations.length >= maxNumberOfValidations)
                break;
        }
        return { ok: validations.length === 0, validations: validations };
    };
    SudokuValidator.prototype.validateCells = function (cells, maxNumberOfValidations) {
        var validations = [];
        for (var i = 0; i < cells.length; i++) {
            for (var j = i + 1; j < cells.length; j++) {
                var a = cells[i];
                var b = cells[j];
                if (a.hasValue() && a.value() == b.value()) {
                    validations.push({
                        aPos: a.position(),
                        bPos: b.position(),
                        value: a.value()
                    });
                }
            }
        }
        return validations;
    };
    SudokuValidator.instance = new SudokuValidator();
    return SudokuValidator;
}());
exports["default"] = SudokuValidator;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QztBQUNELGtCQUFlOzs7Ozs7Ozs7OztBQ3ZDRjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixtQkFBbUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGtCQUFrQjtBQUMxQyxnQ0FBZ0Msa0JBQWtCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGtCQUFlOzs7Ozs7O1VDN0NmO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdWRva3UvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL3N1ZG9rdS8uL3NyYy9jb3JlL1N1ZG9rdS50cyIsIndlYnBhY2s6Ly9zdWRva3UvLi9zcmMvY29yZS9kYXRhL1Bvc2l0aW9uLnRzIiwid2VicGFjazovL3N1ZG9rdS8uL3NyYy9jb3JlL2RhdGEvU3Vkb2t1Q2VsbC50cyIsIndlYnBhY2s6Ly9zdWRva3UvLi9zcmMvY29yZS9kYXRhL1N1ZG9rdURhdGEudHMiLCJ3ZWJwYWNrOi8vc3Vkb2t1Ly4vc3JjL2NvcmUvZGF0YS9TdWRva3VQb3NzaWJsZVZhbHVlcy50cyIsIndlYnBhY2s6Ly9zdWRva3UvLi9zcmMvY29yZS9kYXRhL1N1ZG9rdVBvc3NpYmxlVmFsdWVzQ2VsbC50cyIsIndlYnBhY2s6Ly9zdWRva3UvLi9zcmMvY29yZS9lcnJvci9JbnZhbGlkU3Vkb2t1RXJyb3IudHMiLCJ3ZWJwYWNrOi8vc3Vkb2t1Ly4vc3JjL2NvcmUvZXJyb3IvVmFsaWRhdGlvblN1ZG9rdUVycm9yLnRzIiwid2VicGFjazovL3N1ZG9rdS8uL3NyYy9jb3JlL3NvbHZlci9TdWRva3VTb2x2ZXIudHMiLCJ3ZWJwYWNrOi8vc3Vkb2t1Ly4vc3JjL2NvcmUvdXRpbC9TdWRva3VQb3NzaWJsZVZhbHVlc0ZpbmRlci50cyIsIndlYnBhY2s6Ly9zdWRva3UvLi9zcmMvY29yZS92YWxpZGF0b3IvU3Vkb2t1VmFsaWRhdG9yLnRzIiwid2VicGFjazovL3N1ZG9rdS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zdWRva3Uvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zdWRva3Uvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3N1ZG9rdS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgU3Vkb2t1XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vY29yZS9TdWRva3VcIikpO1xud2luZG93LlN1ZG9rdSA9IFN1ZG9rdV8xLmRlZmF1bHQ7XG5leHBvcnRzLmRlZmF1bHQgPSBTdWRva3VfMS5kZWZhdWx0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgU3Vkb2t1RGF0YV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL2RhdGEvU3Vkb2t1RGF0YVwiKSk7XG52YXIgU3Vkb2t1U29sdmVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vc29sdmVyL1N1ZG9rdVNvbHZlclwiKSk7XG52YXIgU3Vkb2t1VmFsaWRhdG9yXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vdmFsaWRhdG9yL1N1ZG9rdVZhbGlkYXRvclwiKSk7XG52YXIgU3Vkb2t1ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN1ZG9rdShkYXRhKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgfVxuICAgIFN1ZG9rdS5mcm9tVGV4dCA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgIHRleHQgPSB0ZXh0XG4gICAgICAgICAgICAuc3BsaXQoXCIgXCIpXG4gICAgICAgICAgICAuam9pbignJylcbiAgICAgICAgICAgIC5zcGxpdChcIlxcclwiKVxuICAgICAgICAgICAgLmpvaW4oJycpXG4gICAgICAgICAgICAuc3BsaXQoXCJcXG5cIilcbiAgICAgICAgICAgIC5qb2luKCcnKVxuICAgICAgICAgICAgLnNwbGl0KCdcXHQnKVxuICAgICAgICAgICAgLmpvaW4oJycpO1xuICAgICAgICB2YXIgZGF0YSA9IFN1ZG9rdURhdGFfMS5kZWZhdWx0LmVtcHR5KCk7XG4gICAgICAgIHZhciBjZWxscyA9IGRhdGEuY2VsbHMoKTtcbiAgICAgICAgdmFyIHZhbHVlcyA9IHRleHQuc3BsaXQoXCJcIik7XG4gICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoICE9PSBjZWxscy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkV4cGVjdGVkIFwiLmNvbmNhdChjZWxscy5sZW5ndGgsIFwiIG51bWJlcnMgYnV0IGl0IHdhcyBcIikuY29uY2F0KHZhbHVlcy5sZW5ndGgpKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY2VsbHNbaV0udmFsdWUodmFsdWVzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFN1ZG9rdShkYXRhKTtcbiAgICB9O1xuICAgIFN1ZG9rdS5lbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdWRva3UoU3Vkb2t1RGF0YV8xLmRlZmF1bHQuZW1wdHkoKSk7XG4gICAgfTtcbiAgICBTdWRva3Uub2ZTaXplID0gZnVuY3Rpb24gKG51bU9mUm93cywgbnVtT2ZDb2xzKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3Vkb2t1KFN1ZG9rdURhdGFfMS5kZWZhdWx0Lm9mU2l6ZShudW1PZlJvd3MsIG51bU9mQ29scykpO1xuICAgIH07XG4gICAgU3Vkb2t1LnByb3RvdHlwZS5jZWxsID0gZnVuY3Rpb24gKHJvdywgY29sKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuY2VsbChyb3csIGNvbCk7XG4gICAgfTtcbiAgICBTdWRva3UucHJvdG90eXBlLmNlbGxzQnlDb2wgPSBmdW5jdGlvbiAoY29sKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuY2VsbHNCeUNvbChjb2wpO1xuICAgIH07XG4gICAgU3Vkb2t1LnByb3RvdHlwZS5jZWxsc0J5Um93ID0gZnVuY3Rpb24gKHJvdykge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmNlbGxzQnlSb3cocm93KTtcbiAgICB9O1xuICAgIFN1ZG9rdS5wcm90b3R5cGUuY2VsbHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuY2VsbHMoKTtcbiAgICB9O1xuICAgIFN1ZG9rdS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5kYXRhLmNsb25lKCk7XG4gICAgICAgIHJldHVybiBuZXcgU3Vkb2t1KGRhdGEpO1xuICAgIH07XG4gICAgU3Vkb2t1LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS50b1N0cmluZygpO1xuICAgIH07XG4gICAgU3Vkb2t1LnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5lcXVhbHMob3RoZXIuZGF0YSk7XG4gICAgfTtcbiAgICBTdWRva3UucHJvdG90eXBlLnZhbGlkYXRlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIFN1ZG9rdVZhbGlkYXRvcl8xLmRlZmF1bHQuZ2V0SW5zdGFuY2UoKS52YWxpZGF0ZSh0aGlzLmRhdGEsIG9wdGlvbnMpO1xuICAgIH07XG4gICAgU3Vkb2t1LnByb3RvdHlwZS5jZWxsc0J5U3F1YXJlID0gZnVuY3Rpb24gKHNxdWFyZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmNlbGxzQnlTcXVhcmUoc3F1YXJlKTtcbiAgICB9O1xuICAgIFN1ZG9rdS5wcm90b3R5cGUubnVtYmVyT2ZDb2xzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLm51bWJlck9mQ29scygpO1xuICAgIH07XG4gICAgU3Vkb2t1LnByb3RvdHlwZS5udW1iZXJPZlJvd3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEubnVtYmVyT2ZSb3dzKCk7XG4gICAgfTtcbiAgICBTdWRva3UucHJvdG90eXBlLm51bWJlck9mU3F1YXJlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5udW1iZXJPZlNxdWFyZXMoKTtcbiAgICB9O1xuICAgIFN1ZG9rdS5wcm90b3R5cGUuc29sdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBTdWRva3VTb2x2ZXJfMS5kZWZhdWx0LmdldEluc3RhbmNlKCkuc29sdmUodGhpcy5kYXRhKTtcbiAgICB9O1xuICAgIFN1ZG9rdS5wcm90b3R5cGUuZW1wdHlDZWxscyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5lbXB0eUNlbGxzKCk7XG4gICAgfTtcbiAgICByZXR1cm4gU3Vkb2t1O1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFN1ZG9rdTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFBvc2l0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBvc2l0aW9uKHJvdywgY29sKSB7XG4gICAgICAgIHRoaXMucm93ID0gcm93O1xuICAgICAgICB0aGlzLmNvbCA9IGNvbDtcbiAgICB9XG4gICAgUG9zaXRpb24ucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIChvdGhlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5yb3cgPT09IG90aGVyLnJvdyAmJlxuICAgICAgICAgICAgdGhpcy5jb2wgPT09IG90aGVyLmNvbDtcbiAgICB9O1xuICAgIHJldHVybiBQb3NpdGlvbjtcbn0oKSk7XG5leHBvcnRzLmRlZmF1bHQgPSBQb3NpdGlvbjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFBvc2l0aW9uXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vUG9zaXRpb25cIikpO1xudmFyIFN1ZG9rdUNlbGwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3Vkb2t1Q2VsbChyb3csIGNvbCwgc3F1YXJlLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9yb3cgPSByb3c7XG4gICAgICAgIHRoaXMuX2NvbCA9IGNvbDtcbiAgICAgICAgdGhpcy5fc3F1YXJlID0gc3F1YXJlO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICBTdWRva3VDZWxsLnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuaGFzVmFsdWUoKTtcbiAgICB9O1xuICAgIFN1ZG9rdUNlbGwucHJvdG90eXBlLnBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFBvc2l0aW9uXzEuZGVmYXVsdCh0aGlzLl9yb3csIHRoaXMuX2NvbCk7XG4gICAgfTtcbiAgICBTdWRva3VDZWxsLnByb3RvdHlwZS5oYXNTYW1lUG9zaXRpb24gPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sKCkgPT0gb3RoZXIuY29sKCkgJiZcbiAgICAgICAgICAgIHRoaXMucm93KCkgPT0gb3RoZXIucm93KCk7XG4gICAgfTtcbiAgICBTdWRva3VDZWxsLnByb3RvdHlwZS5jb2wgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2w7XG4gICAgfTtcbiAgICBTdWRva3VDZWxsLnByb3RvdHlwZS5yb3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb3c7XG4gICAgfTtcbiAgICBTdWRva3VDZWxsLnByb3RvdHlwZS5zcXVhcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcXVhcmU7XG4gICAgfTtcbiAgICBTdWRva3VDZWxsLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH07XG4gICAgU3Vkb2t1Q2VsbC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gXCI/XCI7XG4gICAgfTtcbiAgICBTdWRva3VDZWxsLnByb3RvdHlwZS5oYXNWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fdmFsdWUgJiYgU3Vkb2t1Q2VsbC5WQUxJRF9WQUxVRVMuaW5jbHVkZXModGhpcy5fdmFsdWUpO1xuICAgIH07XG4gICAgU3Vkb2t1Q2VsbC5WQUxJRF9WQUxVRVMgPSBbJzAnLCAnMScsICcyJywgJzMnLCAnNCcsICc1JywgJzYnLCAnNycsICc4JywgJzknXTtcbiAgICByZXR1cm4gU3Vkb2t1Q2VsbDtcbn0oKSk7XG5leHBvcnRzLmRlZmF1bHQgPSBTdWRva3VDZWxsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tLCBwYWNrKSB7XG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgU3Vkb2t1Q2VsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1N1ZG9rdUNlbGxcIikpO1xudmFyIFN1ZG9rdURhdGEgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3Vkb2t1RGF0YShjZWxscykge1xuICAgICAgICB0aGlzLl9jZWxscyA9IGNlbGxzO1xuICAgICAgICB0aGlzLl9jZWxsc0J5Q29sID0gdGhpcy5pbmRleENlbGxzQnlDb2wodGhpcy5fY2VsbHMpO1xuICAgICAgICB0aGlzLl9jZWxsc0J5Um93ID0gdGhpcy5pbmRleENlbGxzQnlSb3codGhpcy5fY2VsbHMpO1xuICAgICAgICB0aGlzLl9jZWxsc0J5U3F1YXJlID0gdGhpcy5pbmRleENlbGxzQnlTcXVhcmUodGhpcy5fY2VsbHMpO1xuICAgIH1cbiAgICBTdWRva3VEYXRhLm9mU2l6ZSA9IGZ1bmN0aW9uIChudW1PZlJvd3MsIG51bU9mQ29scykge1xuICAgICAgICB2YXIgY2VsbHMgPSB0aGlzLmNyZWF0ZUNlbGxzKG51bU9mUm93cywgbnVtT2ZDb2xzKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTdWRva3VEYXRhKGNlbGxzKTtcbiAgICB9O1xuICAgIFN1ZG9rdURhdGEuZW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBTdWRva3VEYXRhLm9mU2l6ZSg5LCA5KTtcbiAgICB9O1xuICAgIFN1ZG9rdURhdGEucHJvdG90eXBlLmluZGV4Q2VsbHNCeVNxdWFyZSA9IGZ1bmN0aW9uIChjZWxscykge1xuICAgICAgICB2YXIgc3F1YXJlcyA9IFtdO1xuICAgICAgICB2YXIgbnVtT2ZTcXVhcmVzID0gTWF0aC5zcXJ0KGNlbGxzLmxlbmd0aCk7XG4gICAgICAgIHZhciBudW1PZkNvbHNCeVNxdWFyZSA9IE1hdGguc3FydChudW1PZlNxdWFyZXMpO1xuICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICBzcXVhcmVzLnB1c2goY2VsbHMuZmlsdGVyKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLnNxdWFyZSgpID09PSBpOyB9KSk7XG4gICAgICAgIH07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtT2ZTcXVhcmVzOyBpKyspIHtcbiAgICAgICAgICAgIF9sb29wXzEoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBzcXVhcmVzXzEgPSBzcXVhcmVzOyBfaSA8IHNxdWFyZXNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBzcXVhcmUgPSBzcXVhcmVzXzFbX2ldO1xuICAgICAgICAgICAgc3F1YXJlLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29tcCA9IGEucm93KCkgLSBiLnJvdygpO1xuICAgICAgICAgICAgICAgIGlmIChjb21wID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGEuY29sKCkgLSBiLmNvbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcXVhcmVzO1xuICAgIH07XG4gICAgU3Vkb2t1RGF0YS5nZXRTcXVhcmVJbmRleCA9IGZ1bmN0aW9uIChyb3csIGNvbCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihyb3cgLyAzKSAqIDMgKyBNYXRoLmZsb29yKGNvbCAvIDMpO1xuICAgIH07XG4gICAgU3Vkb2t1RGF0YS5wcm90b3R5cGUuaW5kZXhDZWxsc0J5Q29sID0gZnVuY3Rpb24gKGNlbGxzKSB7XG4gICAgICAgIHZhciBjb2xzID0gW107XG4gICAgICAgIHZhciBfbG9vcF8yID0gZnVuY3Rpb24gKGNvbEluZGV4KSB7XG4gICAgICAgICAgICB2YXIgY29sID0gY2VsbHMuZmlsdGVyKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLmNvbCgpID09PSBjb2xJbmRleDsgfSk7XG4gICAgICAgICAgICBpZiAoY29sLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJicmVha1wiO1xuICAgICAgICAgICAgY29scy5wdXNoKGNvbCk7XG4gICAgICAgIH07XG4gICAgICAgIGZvciAodmFyIGNvbEluZGV4ID0gMDs7IGNvbEluZGV4KyspIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZV8xID0gX2xvb3BfMihjb2xJbmRleCk7XG4gICAgICAgICAgICBpZiAoc3RhdGVfMSA9PT0gXCJicmVha1wiKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xzO1xuICAgIH07XG4gICAgU3Vkb2t1RGF0YS5wcm90b3R5cGUuaW5kZXhDZWxsc0J5Um93ID0gZnVuY3Rpb24gKGNlbGxzKSB7XG4gICAgICAgIHZhciByb3dzID0gW107XG4gICAgICAgIHZhciBfbG9vcF8zID0gZnVuY3Rpb24gKHJvd0luZGV4KSB7XG4gICAgICAgICAgICB2YXIgcm93ID0gY2VsbHMuZmlsdGVyKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLnJvdygpID09PSByb3dJbmRleDsgfSk7XG4gICAgICAgICAgICBpZiAocm93Lmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJicmVha1wiO1xuICAgICAgICAgICAgcm93cy5wdXNoKHJvdyk7XG4gICAgICAgIH07XG4gICAgICAgIGZvciAodmFyIHJvd0luZGV4ID0gMDs7IHJvd0luZGV4KyspIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZV8yID0gX2xvb3BfMyhyb3dJbmRleCk7XG4gICAgICAgICAgICBpZiAoc3RhdGVfMiA9PT0gXCJicmVha1wiKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByb3dzO1xuICAgIH07XG4gICAgU3Vkb2t1RGF0YS5jcmVhdGVDZWxscyA9IGZ1bmN0aW9uIChudW1PZlJvd3MsIG51bU9mQ29scykge1xuICAgICAgICB2YXIgY2VsbHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgbnVtT2ZSb3dzOyByb3crKykge1xuICAgICAgICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgbnVtT2ZDb2xzOyBjb2wrKykge1xuICAgICAgICAgICAgICAgIHZhciBzcXVhcmUgPSBTdWRva3VEYXRhLmdldFNxdWFyZUluZGV4KHJvdywgY29sKTtcbiAgICAgICAgICAgICAgICB2YXIgY2VsbCA9IG5ldyBTdWRva3VDZWxsXzEuZGVmYXVsdChyb3csIGNvbCwgc3F1YXJlLCBcIj9cIik7XG4gICAgICAgICAgICAgICAgY2VsbHMucHVzaChjZWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2VsbHM7XG4gICAgfTtcbiAgICBTdWRva3VEYXRhLnByb3RvdHlwZS5jZWxsID0gZnVuY3Rpb24gKHJvdywgY29sKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jZWxsc0J5Um93W3Jvd11bY29sXTtcbiAgICB9O1xuICAgIFN1ZG9rdURhdGEucHJvdG90eXBlLmNlbGxzQnlDb2wgPSBmdW5jdGlvbiAoY29sKSB7XG4gICAgICAgIHJldHVybiBfX3NwcmVhZEFycmF5KFtdLCB0aGlzLl9jZWxsc0J5Q29sW2NvbF0sIHRydWUpO1xuICAgIH07XG4gICAgU3Vkb2t1RGF0YS5wcm90b3R5cGUuY2VsbHNCeVJvdyA9IGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgcmV0dXJuIF9fc3ByZWFkQXJyYXkoW10sIHRoaXMuX2NlbGxzQnlSb3dbcm93XSwgdHJ1ZSk7XG4gICAgfTtcbiAgICBTdWRva3VEYXRhLnByb3RvdHlwZS5jZWxscyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fc3ByZWFkQXJyYXkoW10sIHRoaXMuX2NlbGxzLCB0cnVlKTtcbiAgICB9O1xuICAgIFN1ZG9rdURhdGEucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2VsbHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuY2VsbHMoKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBzcmNDZWxsID0gX2FbX2ldO1xuICAgICAgICAgICAgdmFyIG5ld0NlbGwgPSBuZXcgU3Vkb2t1Q2VsbF8xLmRlZmF1bHQoc3JjQ2VsbC5yb3coKSwgc3JjQ2VsbC5jb2woKSwgc3JjQ2VsbC5zcXVhcmUoKSwgc3JjQ2VsbC52YWx1ZSgpKTtcbiAgICAgICAgICAgIGNlbGxzLnB1c2gobmV3Q2VsbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBTdWRva3VEYXRhKGNlbGxzKTtcbiAgICB9O1xuICAgIFN1ZG9rdURhdGEucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcm93cyA9IFtdO1xuICAgICAgICB2YXIgcm93ID0gXCJcIjtcbiAgICAgICAgdmFyIG51bUJ5Um93ID0gTWF0aC5zcXJ0KHRoaXMuX2NlbGxzLmxlbmd0aCk7XG4gICAgICAgIHZhciBudW1CeUNvbCA9IE1hdGguc3FydChudW1CeVJvdyk7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLmNlbGxzKCk7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2VsbCA9IF9hW19pXTtcbiAgICAgICAgICAgIHJvdyArPSBjZWxsLnZhbHVlKCk7XG4gICAgICAgICAgICBpZiAoKChjZWxsLmNvbCgpICsgMSkgJSBudW1CeUNvbCkgPT0gMCkge1xuICAgICAgICAgICAgICAgIHJvdyArPSBcIiBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgoKGNlbGwuY29sKCkgKyAxKSAlIG51bUJ5Um93KSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgcm93cy5wdXNoKHJvdy50cmltKCkpO1xuICAgICAgICAgICAgICAgIHJvdyA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKCgoY2VsbC5yb3coKSArIDEpICUgbnVtQnlDb2wpID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcm93cy5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcm93cy5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIFwiXCIuY29uY2F0KGEsIFwiXFxyXFxuXCIpLmNvbmNhdChiKTsgfSkudHJpbSgpO1xuICAgIH07XG4gICAgU3Vkb2t1RGF0YS5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKCkgPT09IG90aGVyLnRvU3RyaW5nKCk7XG4gICAgfTtcbiAgICBTdWRva3VEYXRhLnByb3RvdHlwZS5jZWxsc0J5U3F1YXJlID0gZnVuY3Rpb24gKHNxdWFyZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2VsbHNCeVNxdWFyZVtzcXVhcmVdO1xuICAgIH07XG4gICAgU3Vkb2t1RGF0YS5wcm90b3R5cGUubnVtYmVyT2ZDb2xzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuX2NlbGxzLmxlbmd0aCk7XG4gICAgfTtcbiAgICBTdWRva3VEYXRhLnByb3RvdHlwZS5udW1iZXJPZlJvd3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5fY2VsbHMubGVuZ3RoKTtcbiAgICB9O1xuICAgIFN1ZG9rdURhdGEucHJvdG90eXBlLm51bWJlck9mU3F1YXJlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLl9jZWxscy5sZW5ndGgpO1xuICAgIH07XG4gICAgU3Vkb2t1RGF0YS5wcm90b3R5cGUuZW1wdHlDZWxscyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2VsbHMoKS5maWx0ZXIoZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMuaXNFbXB0eSgpOyB9KTtcbiAgICB9O1xuICAgIHJldHVybiBTdWRva3VEYXRhO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFN1ZG9rdURhdGE7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20sIHBhY2spIHtcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBTdWRva3VQb3NzaWJsZVZhbHVlc0NlbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9TdWRva3VQb3NzaWJsZVZhbHVlc0NlbGxcIikpO1xudmFyIFN1ZG9rdVBvc3NpYmxlVmFsdWVzID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN1ZG9rdVBvc3NpYmxlVmFsdWVzKGRhdGEpIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuX2FsbFZhbHVlcyA9IFN1ZG9rdVBvc3NpYmxlVmFsdWVzLmNyZWF0ZUFsbFZhbHVlcyh0aGlzLl9kYXRhLmNlbGxzKCkubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5fY2VsbHMgPSB0aGlzLmNyZWF0ZUNlbGxzKHRoaXMuX2RhdGEuY2VsbHMoKSk7XG4gICAgICAgIHRoaXMuX2NlbGxzQnlSb3cgPSB0aGlzLmluZGV4Q2VsbHNCeVJvdyh0aGlzLl9jZWxscyk7XG4gICAgfVxuICAgIFN1ZG9rdVBvc3NpYmxlVmFsdWVzLm9mID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdWRva3VQb3NzaWJsZVZhbHVlcyhkYXRhKTtcbiAgICB9O1xuICAgIFN1ZG9rdVBvc3NpYmxlVmFsdWVzLnByb3RvdHlwZS5jcmVhdGVDZWxscyA9IGZ1bmN0aW9uIChjZWxscykge1xuICAgICAgICB2YXIgc3BDZWxscyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGNlbGxzXzEgPSBjZWxsczsgX2kgPCBjZWxsc18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGNlbGwgPSBjZWxsc18xW19pXTtcbiAgICAgICAgICAgIHZhciBzcENlbGwgPSBuZXcgU3Vkb2t1UG9zc2libGVWYWx1ZXNDZWxsXzEuZGVmYXVsdChjZWxsKTtcbiAgICAgICAgICAgIHNwQ2VsbHMucHVzaChzcENlbGwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcENlbGxzO1xuICAgIH07XG4gICAgU3Vkb2t1UG9zc2libGVWYWx1ZXMucHJvdG90eXBlLmluZGV4Q2VsbHNCeVJvdyA9IGZ1bmN0aW9uIChjZWxscykge1xuICAgICAgICB2YXIgY2VsbHNCeVJvdyA9IFtdO1xuICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICB2YXIgY2VsbHNfMiA9IHRoaXNfMS5fY2VsbHMuZmlsdGVyKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLnJvdygpID09PSBpOyB9KTtcbiAgICAgICAgICAgIGNlbGxzQnlSb3cucHVzaChjZWxsc18yKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHRoaXNfMSA9IHRoaXM7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5udW1iZXJPZlJvd3MoKTsgaSsrKSB7XG4gICAgICAgICAgICBfbG9vcF8xKGkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjZWxsc0J5Um93O1xuICAgIH07XG4gICAgU3Vkb2t1UG9zc2libGVWYWx1ZXMuY3JlYXRlQWxsVmFsdWVzID0gZnVuY3Rpb24gKG51bU9mQ2VsbHMpIHtcbiAgICAgICAgdmFyIG1heFZhbHVlID0gTWF0aC5zcXJ0KG51bU9mQ2VsbHMpO1xuICAgICAgICB2YXIgYWxsVmFsdWVzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IG1heFZhbHVlOyBpKyspIHtcbiAgICAgICAgICAgIGFsbFZhbHVlcy5wdXNoKGkgKyBcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWxsVmFsdWVzO1xuICAgIH07XG4gICAgU3Vkb2t1UG9zc2libGVWYWx1ZXMucHJvdG90eXBlLmRhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgIH07XG4gICAgU3Vkb2t1UG9zc2libGVWYWx1ZXMucHJvdG90eXBlLmZpbGxFbXB0eUNlbGxzV2l0aEFsbFZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFsbFZhbHVlcyA9IHRoaXMuYWxsVmFsdWVzKCk7XG4gICAgICAgIHRoaXNcbiAgICAgICAgICAgIC5jZWxscygpXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLmlzRW1wdHkoKTsgfSlcbiAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLnBvc3NpYmxlVmFsdWVzKGFsbFZhbHVlcyk7IH0pO1xuICAgIH07XG4gICAgU3Vkb2t1UG9zc2libGVWYWx1ZXMucHJvdG90eXBlLm51bWJlck9mUm93cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGEubnVtYmVyT2ZSb3dzKCk7XG4gICAgfTtcbiAgICBTdWRva3VQb3NzaWJsZVZhbHVlcy5wcm90b3R5cGUubnVtYmVyT2ZDb2xzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YS5udW1iZXJPZkNvbHMoKTtcbiAgICB9O1xuICAgIFN1ZG9rdVBvc3NpYmxlVmFsdWVzLnByb3RvdHlwZS5hbGxWYWx1ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX3NwcmVhZEFycmF5KFtdLCB0aGlzLl9hbGxWYWx1ZXMsIHRydWUpO1xuICAgIH07XG4gICAgU3Vkb2t1UG9zc2libGVWYWx1ZXMucHJvdG90eXBlLmNlbGwgPSBmdW5jdGlvbiAocm93LCBjb2wpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbGxzQnlSb3dbcm93XVtjb2xdO1xuICAgIH07XG4gICAgU3Vkb2t1UG9zc2libGVWYWx1ZXMucHJvdG90eXBlLmNlbGxzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19zcHJlYWRBcnJheShbXSwgdGhpcy5fY2VsbHMsIHRydWUpO1xuICAgIH07XG4gICAgU3Vkb2t1UG9zc2libGVWYWx1ZXMucHJvdG90eXBlLmVtcHR5Q2VsbHNXaXRoT25lUG9zc2libGVWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbGxzLmZpbHRlcihmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5pc0VtcHR5KCkgJiYgYy5wb3NzaWJsZVZhbHVlcygpLmxlbmd0aCA9PSAxOyB9KTtcbiAgICB9O1xuICAgIFN1ZG9rdVBvc3NpYmxlVmFsdWVzLnByb3RvdHlwZS5lbXB0eUNlbGxzV2l0aFplcm9Qb3NzaWJsZVZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbGxzLmZpbHRlcihmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5pc0VtcHR5KCkgJiYgYy5wb3NzaWJsZVZhbHVlcygpLmxlbmd0aCA9PSAwOyB9KTtcbiAgICB9O1xuICAgIHJldHVybiBTdWRva3VQb3NzaWJsZVZhbHVlcztcbn0oKSk7XG5leHBvcnRzLmRlZmF1bHQgPSBTdWRva3VQb3NzaWJsZVZhbHVlcztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSwgcGFjaykge1xuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFN1ZG9rdVBvc3NpYmxlVmFsdWVzQ2VsbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTdWRva3VQb3NzaWJsZVZhbHVlc0NlbGwoY2VsbCkge1xuICAgICAgICB0aGlzLl9jZWxsID0gY2VsbDtcbiAgICAgICAgdGhpcy5fcG9zc2libGVWYWx1ZXMgPSBbXTtcbiAgICB9XG4gICAgU3Vkb2t1UG9zc2libGVWYWx1ZXNDZWxsLnByb3RvdHlwZS5oYXNWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbGwuaGFzVmFsdWUoKTtcbiAgICB9O1xuICAgIFN1ZG9rdVBvc3NpYmxlVmFsdWVzQ2VsbC5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbGwuaXNFbXB0eSgpO1xuICAgIH07XG4gICAgU3Vkb2t1UG9zc2libGVWYWx1ZXNDZWxsLnByb3RvdHlwZS5jb2wgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jZWxsLmNvbCgpO1xuICAgIH07XG4gICAgU3Vkb2t1UG9zc2libGVWYWx1ZXNDZWxsLnByb3RvdHlwZS5yb3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jZWxsLnJvdygpO1xuICAgIH07XG4gICAgU3Vkb2t1UG9zc2libGVWYWx1ZXNDZWxsLnByb3RvdHlwZS5jZWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2VsbDtcbiAgICB9O1xuICAgIFN1ZG9rdVBvc3NpYmxlVmFsdWVzQ2VsbC5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jZWxsLnZhbHVlKCk7XG4gICAgfTtcbiAgICBTdWRva3VQb3NzaWJsZVZhbHVlc0NlbGwucHJvdG90eXBlLnBvc3NpYmxlVmFsdWVzID0gZnVuY3Rpb24gKG5ld1Bvc3NpYmxlVmFsdWVzKSB7XG4gICAgICAgIGlmIChuZXdQb3NzaWJsZVZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy5fcG9zc2libGVWYWx1ZXMgPSBuZXdQb3NzaWJsZVZhbHVlcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcG9zc2libGVWYWx1ZXM7XG4gICAgfTtcbiAgICBTdWRva3VQb3NzaWJsZVZhbHVlc0NlbGwucHJvdG90eXBlLmFkZFBvc3NpYmxlVmFsdWUgPSBmdW5jdGlvbiAocG9zc2libGVWYWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMuX3Bvc3NpYmxlVmFsdWVzLmluY2x1ZGVzKHBvc3NpYmxlVmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLl9wb3NzaWJsZVZhbHVlcyA9IF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShbXSwgdGhpcy5fcG9zc2libGVWYWx1ZXMsIHRydWUpLCBbcG9zc2libGVWYWx1ZV0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vkb2t1UG9zc2libGVWYWx1ZXNDZWxsLnByb3RvdHlwZS5yZW1vdmVQb3NzaWJsZVZhbHVlID0gZnVuY3Rpb24gKHBvc3NpYmxlVmFsdWUpIHtcbiAgICAgICAgdGhpcy5fcG9zc2libGVWYWx1ZXMgPSB0aGlzLl9wb3NzaWJsZVZhbHVlcy5maWx0ZXIoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHYgIT09IHBvc3NpYmxlVmFsdWU7IH0pO1xuICAgIH07XG4gICAgU3Vkb2t1UG9zc2libGVWYWx1ZXNDZWxsLnByb3RvdHlwZS5jbGVhclBvc3NpYmxlVmFsdWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9wb3NzaWJsZVZhbHVlcyA9IFtdO1xuICAgIH07XG4gICAgcmV0dXJuIFN1ZG9rdVBvc3NpYmxlVmFsdWVzQ2VsbDtcbn0oKSk7XG5leHBvcnRzLmRlZmF1bHQgPSBTdWRva3VQb3NzaWJsZVZhbHVlc0NlbGw7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgSW52YWxpZFN1ZG9rdUVycm9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhJbnZhbGlkU3Vkb2t1RXJyb3IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSW52YWxpZFN1ZG9rdUVycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgbWVzc2FnZSkgfHwgdGhpcztcbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKF90aGlzLCBJbnZhbGlkU3Vkb2t1RXJyb3IucHJvdG90eXBlKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gSW52YWxpZFN1ZG9rdUVycm9yO1xufShFcnJvcikpO1xuZXhwb3J0cy5kZWZhdWx0ID0gSW52YWxpZFN1ZG9rdUVycm9yO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFZhbGlkYXRpb25TdWRva3VFcnJvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVmFsaWRhdGlvblN1ZG9rdUVycm9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFZhbGlkYXRpb25TdWRva3VFcnJvcih2YWxpZGF0aW9uKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIFZhbGlkYXRpb25TdWRva3VFcnJvci5idWlsZE1lc3NhZ2UodmFsaWRhdGlvbikpIHx8IHRoaXM7XG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihfdGhpcywgVmFsaWRhdGlvblN1ZG9rdUVycm9yLnByb3RvdHlwZSk7XG4gICAgICAgIF90aGlzLnZhbGlkYXRpb24gPSB2YWxpZGF0aW9uO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFZhbGlkYXRpb25TdWRva3VFcnJvci5idWlsZE1lc3NhZ2UgPSBmdW5jdGlvbiAodmFsaWRhdGlvbikge1xuICAgICAgICB2YXIgYVBvcyA9IHZhbGlkYXRpb24udmFsaWRhdGlvbnNbMF0uYVBvcztcbiAgICAgICAgdmFyIGJQb3MgPSB2YWxpZGF0aW9uLnZhbGlkYXRpb25zWzBdLmJQb3M7XG4gICAgICAgIHJldHVybiBcIkludmFsaWQgc3Vkb2t1OiAocm93PVwiLmNvbmNhdChhUG9zLnJvdywgXCI7Y29sPVwiKS5jb25jYXQoYVBvcy5jb2wsIFwiKSBhbmQgKHJvdz1cIikuY29uY2F0KGJQb3Mucm93LCBcIjtjb2w9XCIpLmNvbmNhdChiUG9zLmNvbCwgXCIpXCIpO1xuICAgIH07XG4gICAgcmV0dXJuIFZhbGlkYXRpb25TdWRva3VFcnJvcjtcbn0oRXJyb3IpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFZhbGlkYXRpb25TdWRva3VFcnJvcjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEludmFsaWRTdWRva3VFcnJvcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9lcnJvci9JbnZhbGlkU3Vkb2t1RXJyb3JcIikpO1xudmFyIFZhbGlkYXRpb25TdWRva3VFcnJvcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9lcnJvci9WYWxpZGF0aW9uU3Vkb2t1RXJyb3JcIikpO1xudmFyIFN1ZG9rdVBvc3NpYmxlVmFsdWVzRmluZGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL3V0aWwvU3Vkb2t1UG9zc2libGVWYWx1ZXNGaW5kZXJcIikpO1xudmFyIFN1ZG9rdVZhbGlkYXRvcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi92YWxpZGF0b3IvU3Vkb2t1VmFsaWRhdG9yXCIpKTtcbnZhciBTdWRva3VTb2x2ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3Vkb2t1U29sdmVyKCkge1xuICAgIH1cbiAgICBTdWRva3VTb2x2ZXIuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBTdWRva3VTb2x2ZXIuaW5zdGFuY2U7XG4gICAgfTtcbiAgICBTdWRva3VTb2x2ZXIucHJvdG90eXBlLnNvbHZlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIHNvbHV0aW9uID0ge307XG4gICAgICAgIHRoaXMudHJ5U29sdmUoc29sdXRpb24sIGRhdGEpO1xuICAgICAgICByZXR1cm4gc29sdXRpb247XG4gICAgfTtcbiAgICBTdWRva3VTb2x2ZXIucHJvdG90eXBlLnRyeVNvbHZlID0gZnVuY3Rpb24gKHNvbHV0aW9uLCBkYXRhKSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVTdWRva3VEYXRhKGRhdGEpO1xuICAgICAgICB3aGlsZSAoZGF0YS5lbXB0eUNlbGxzKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIHBvc3NpYmxlVmFsdWVzID0gdGhpcy5maW5kUG9zc2libGVWYWx1ZXMoZGF0YSk7XG4gICAgICAgICAgICBpZiAocG9zc2libGVWYWx1ZXMuZW1wdHlDZWxsc1dpdGhaZXJvUG9zc2libGVWYWx1ZXMoKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aHJvd0VtcHR5Y2VsbHNXaXRoWmVyb1Bvc3NpYmxlVmFsdWVzKHBvc3NpYmxlVmFsdWVzLmVtcHR5Q2VsbHNXaXRoWmVyb1Bvc3NpYmxlVmFsdWVzKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocG9zc2libGVWYWx1ZXMuZW1wdHlDZWxsc1dpdGhPbmVQb3NzaWJsZVZhbHVlKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsbENlbGxzV2l0aE9uZVBvc3NpYmxlVmFsdWUoZGF0YSwgcG9zc2libGVWYWx1ZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWxsTmV4dEVtcHR5Q2VsbEFuZFRyeVNvbHZlKHNvbHV0aW9uLCBkYXRhLCBwb3NzaWJsZVZhbHVlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRlU3Vkb2t1RGF0YShkYXRhKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vkb2t1U29sdmVyLnByb3RvdHlwZS50aHJvd0VtcHR5Y2VsbHNXaXRoWmVyb1Bvc3NpYmxlVmFsdWVzID0gZnVuY3Rpb24gKGVtcHR5Q2VsbHNXaXRoWmVyb1Bvc3NpYmxlVmFsdWVzKSB7XG4gICAgICAgIHZhciBmaXJzdENlbGwgPSBlbXB0eUNlbGxzV2l0aFplcm9Qb3NzaWJsZVZhbHVlc1swXTtcbiAgICAgICAgdGhyb3cgbmV3IEludmFsaWRTdWRva3VFcnJvcl8xLmRlZmF1bHQoXCJObyBwb3NzaWJsZSB2YWx1ZSBmb3I6IChyb3c9XCIuY29uY2F0KGZpcnN0Q2VsbC5yb3csIFwiO2NvbD1cIikuY29uY2F0KGZpcnN0Q2VsbC5jb2wsIFwiKVwiKSk7XG4gICAgfTtcbiAgICBTdWRva3VTb2x2ZXIucHJvdG90eXBlLnZhbGlkYXRlU3Vkb2t1RGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciB2YWxpZGF0aW9uUmVzcG9uc2UgPSBTdWRva3VWYWxpZGF0b3JfMS5kZWZhdWx0LmdldEluc3RhbmNlKCkudmFsaWRhdGUoZGF0YSk7XG4gICAgICAgIGlmICghdmFsaWRhdGlvblJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVmFsaWRhdGlvblN1ZG9rdUVycm9yXzEuZGVmYXVsdCh2YWxpZGF0aW9uUmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWRva3VTb2x2ZXIucHJvdG90eXBlLmZpbGxOZXh0RW1wdHlDZWxsQW5kVHJ5U29sdmUgPSBmdW5jdGlvbiAoc29sdXRpb24sIGRhdGEsIHBvc3NpYmxlVmFsdWVzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCBub3QgaW1wbGVtZW50ZWQuXCIpO1xuICAgIH07XG4gICAgU3Vkb2t1U29sdmVyLnByb3RvdHlwZS5maWxsQ2VsbHNXaXRoT25lUG9zc2libGVWYWx1ZSA9IGZ1bmN0aW9uIChkYXRhLCBwb3NzaWJsZVZhbHVlcykge1xuICAgICAgICBwb3NzaWJsZVZhbHVlc1xuICAgICAgICAgICAgLmVtcHR5Q2VsbHNXaXRoT25lUG9zc2libGVWYWx1ZSgpXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5jZWxsKCkudmFsdWUoYy5wb3NzaWJsZVZhbHVlcygpWzBdKTsgfSk7XG4gICAgfTtcbiAgICBTdWRva3VTb2x2ZXIucHJvdG90eXBlLmZpbmRQb3NzaWJsZVZhbHVlcyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBTdWRva3VQb3NzaWJsZVZhbHVlc0ZpbmRlcl8xLmRlZmF1bHQuZ2V0SW5zdGFuY2UoKS5maW5kKGRhdGEpO1xuICAgIH07XG4gICAgU3Vkb2t1U29sdmVyLmluc3RhbmNlID0gbmV3IFN1ZG9rdVNvbHZlcigpO1xuICAgIHJldHVybiBTdWRva3VTb2x2ZXI7XG59KCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gU3Vkb2t1U29sdmVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgU3Vkb2t1UG9zc2libGVWYWx1ZXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vZGF0YS9TdWRva3VQb3NzaWJsZVZhbHVlc1wiKSk7XG52YXIgU3Vkb2t1UG9zc2libGVWYWx1ZXNGaW5kZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3Vkb2t1UG9zc2libGVWYWx1ZXNGaW5kZXIoKSB7XG4gICAgfVxuICAgIFN1ZG9rdVBvc3NpYmxlVmFsdWVzRmluZGVyLmdldEluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICB9O1xuICAgIFN1ZG9rdVBvc3NpYmxlVmFsdWVzRmluZGVyLnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIHBvc3NpYmxlVmFsdWVzID0gU3Vkb2t1UG9zc2libGVWYWx1ZXNfMS5kZWZhdWx0Lm9mKGRhdGEpO1xuICAgICAgICBwb3NzaWJsZVZhbHVlcy5maWxsRW1wdHlDZWxsc1dpdGhBbGxWYWx1ZXMoKTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IGRhdGEuY2VsbHMoKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBjZWxsID0gX2FbX2ldO1xuICAgICAgICAgICAgaWYgKGNlbGwuaGFzVmFsdWUoKSkge1xuICAgICAgICAgICAgICAgIHZhciBjZWxsc0J5Um93ID0gZGF0YS5jZWxsc0J5Um93KGNlbGwucm93KCkpO1xuICAgICAgICAgICAgICAgIHZhciBjZWxsc0J5Q29sID0gZGF0YS5jZWxsc0J5Q29sKGNlbGwuY29sKCkpO1xuICAgICAgICAgICAgICAgIHZhciBjZWxsc0J5U3F1YXJlID0gZGF0YS5jZWxsc0J5U3F1YXJlKGNlbGwuc3F1YXJlKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlUG9zc2libGVWYWx1ZUJ5KHBvc3NpYmxlVmFsdWVzLCBjZWxsc0J5Um93LCBjZWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVBvc3NpYmxlVmFsdWVCeShwb3NzaWJsZVZhbHVlcywgY2VsbHNCeUNvbCwgY2VsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVQb3NzaWJsZVZhbHVlQnkocG9zc2libGVWYWx1ZXMsIGNlbGxzQnlTcXVhcmUsIGNlbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwb3NzaWJsZVZhbHVlcztcbiAgICB9O1xuICAgIFN1ZG9rdVBvc3NpYmxlVmFsdWVzRmluZGVyLnByb3RvdHlwZS5yZW1vdmVQb3NzaWJsZVZhbHVlQnkgPSBmdW5jdGlvbiAocG9zc2libGVWYWx1ZXMsIGNlbGxzLCBjZWxsKSB7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgY2VsbHNfMSA9IGNlbGxzOyBfaSA8IGNlbGxzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgaXRfMSA9IGNlbGxzXzFbX2ldO1xuICAgICAgICAgICAgaWYgKCFpdF8xLmhhc1NhbWVQb3NpdGlvbihjZWxsKSAmJiBpdF8xLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgICAgIHBvc3NpYmxlVmFsdWVzLmNlbGwoaXRfMS5yb3coKSwgaXRfMS5jb2woKSkucmVtb3ZlUG9zc2libGVWYWx1ZShjZWxsLnZhbHVlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWRva3VQb3NzaWJsZVZhbHVlc0ZpbmRlci5pbnN0YW5jZSA9IG5ldyBTdWRva3VQb3NzaWJsZVZhbHVlc0ZpbmRlcigpO1xuICAgIHJldHVybiBTdWRva3VQb3NzaWJsZVZhbHVlc0ZpbmRlcjtcbn0oKSk7XG5leHBvcnRzLmRlZmF1bHQgPSBTdWRva3VQb3NzaWJsZVZhbHVlc0ZpbmRlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFN1ZG9rdVZhbGlkYXRvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTdWRva3VWYWxpZGF0b3IoKSB7XG4gICAgfVxuICAgIFN1ZG9rdVZhbGlkYXRvci5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFN1ZG9rdVZhbGlkYXRvci5pbnN0YW5jZTtcbiAgICB9O1xuICAgIFN1ZG9rdVZhbGlkYXRvci5wcm90b3R5cGUudmFsaWRhdGUgPSBmdW5jdGlvbiAoZGF0YSwgb3B0aW9ucykge1xuICAgICAgICB2YXIgdmFsaWRhdGlvbnMgPSBbXTtcbiAgICAgICAgdmFyIG51bUNlbGxzQnlSb3cgPSBNYXRoLnNxcnQoZGF0YS5jZWxscygpLmxlbmd0aCk7XG4gICAgICAgIHZhciBtYXhOdW1iZXJPZlZhbGlkYXRpb25zID0gKG9wdGlvbnMgJiYgb3B0aW9ucy5tYXhOdW1iZXJPZlZhbGlkYXRpb25zKSA/IG9wdGlvbnMubWF4TnVtYmVyT2ZWYWxpZGF0aW9ucyA6IE51bWJlci5NQVhfVkFMVUU7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtQ2VsbHNCeVJvdzsgaSsrKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9ucy5wdXNoLmFwcGx5KHZhbGlkYXRpb25zLCB0aGlzLnZhbGlkYXRlQ2VsbHMoZGF0YS5jZWxsc0J5Um93KGkpLCBtYXhOdW1iZXJPZlZhbGlkYXRpb25zKSk7XG4gICAgICAgICAgICBpZiAodmFsaWRhdGlvbnMubGVuZ3RoID49IG1heE51bWJlck9mVmFsaWRhdGlvbnMpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB2YWxpZGF0aW9ucy5wdXNoLmFwcGx5KHZhbGlkYXRpb25zLCB0aGlzLnZhbGlkYXRlQ2VsbHMoZGF0YS5jZWxsc0J5Q29sKGkpLCBtYXhOdW1iZXJPZlZhbGlkYXRpb25zKSk7XG4gICAgICAgICAgICBpZiAodmFsaWRhdGlvbnMubGVuZ3RoID49IG1heE51bWJlck9mVmFsaWRhdGlvbnMpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB2YWxpZGF0aW9ucy5wdXNoLmFwcGx5KHZhbGlkYXRpb25zLCB0aGlzLnZhbGlkYXRlQ2VsbHMoZGF0YS5jZWxsc0J5U3F1YXJlKGkpLCBtYXhOdW1iZXJPZlZhbGlkYXRpb25zKSk7XG4gICAgICAgICAgICBpZiAodmFsaWRhdGlvbnMubGVuZ3RoID49IG1heE51bWJlck9mVmFsaWRhdGlvbnMpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgb2s6IHZhbGlkYXRpb25zLmxlbmd0aCA9PT0gMCwgdmFsaWRhdGlvbnM6IHZhbGlkYXRpb25zIH07XG4gICAgfTtcbiAgICBTdWRva3VWYWxpZGF0b3IucHJvdG90eXBlLnZhbGlkYXRlQ2VsbHMgPSBmdW5jdGlvbiAoY2VsbHMsIG1heE51bWJlck9mVmFsaWRhdGlvbnMpIHtcbiAgICAgICAgdmFyIHZhbGlkYXRpb25zID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSBpICsgMTsgaiA8IGNlbGxzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGEgPSBjZWxsc1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgYiA9IGNlbGxzW2pdO1xuICAgICAgICAgICAgICAgIGlmIChhLmhhc1ZhbHVlKCkgJiYgYS52YWx1ZSgpID09IGIudmFsdWUoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFQb3M6IGEucG9zaXRpb24oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJQb3M6IGIucG9zaXRpb24oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBhLnZhbHVlKClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWxpZGF0aW9ucztcbiAgICB9O1xuICAgIFN1ZG9rdVZhbGlkYXRvci5pbnN0YW5jZSA9IG5ldyBTdWRva3VWYWxpZGF0b3IoKTtcbiAgICByZXR1cm4gU3Vkb2t1VmFsaWRhdG9yO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFN1ZG9rdVZhbGlkYXRvcjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=