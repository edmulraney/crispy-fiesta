module.exports = {
  output: {
    // library: 'dashboard',
    // libraryTarget: 'umd',
    // jsonpScriptType: 'module',
    publicPath: '//localhost:8081/',
  },
  externals: {
    react: 'react',
    'react-redux': 'react-redux',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devServer: {
    port: 8081,
    hot: true,
    writeToDisk: true,
    liveReload: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
}
