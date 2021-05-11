//#region Variables
const path = require('path')
const nodeExternals = require('webpack-node-externals')
//#endregion

//#region Module
module.exports = {
	entry: path.join(__dirname, "src/server/", "server.js"),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js'
  },
  target: 'node',
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}
//#endregion