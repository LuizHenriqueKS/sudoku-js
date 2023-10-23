//webpack.config.js
const path = require('path');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: "./src/app.ts",
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "sudoku.js" // <--- Will be compiled to this single file
  },
  devServer: {
    static: path.join(__dirname, "public"),
    compress: true,
    port: 4000,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  }
};