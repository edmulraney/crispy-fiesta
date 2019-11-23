module.exports = {
  output: {
    library: 'plugin-lib',
    libraryTarget: 'umd',
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
}
