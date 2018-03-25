const path = require('path')
const dir = __dirname
const dirBuild = path.resolve(__dirname, 'build')

module.exports = {
  entry: {
    'index': path.resolve(dir, 'index.js')
  },
  output: {
    path: dirBuild,
    filename: 'response.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: dir
      }
    ]
  },
  plugins: [
  ],
  // Create Sourcemaps for the bundle
  devtool: 'source-map',
  devServer: {
    contentBase: dirBuild
  }
}
