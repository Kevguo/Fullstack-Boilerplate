import Webpack from "webpack";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";

const devMode = process.env.NODE_ENV !== "production";

const settings = {
  entry: ["babel-polyfill", "./src/index.jsx"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin("dist", {}),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./src/index.html",
      filename: "index.html"
    })
  ],
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  devServer: {
    contentBase: "./dist",
    hot: true,
    proxy: {
      "/api": "http://localhost:5000"
    },
    stats: "errors-only"
  }
};

export default settings;
