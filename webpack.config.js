const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: __dirname,
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/index.tsx",
  output: {
    path: `${__dirname}/dist`,
    filename: "bundle.js",
  },
  devServer: {
    inline: true,
    progress: true,
    contentBase: `${__dirname}/dist`,
    watchContentBase: true,
    host: '0.0.0.0',
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".mjs", ".js", "jsx", ".ts", ".tsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
};
