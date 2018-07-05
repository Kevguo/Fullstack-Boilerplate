import Webpack from "webpack";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";

const devMode = process.env.NODE_ENV !== "production";

const settings = {
  entry: ["babel-polyfill", "./src/frontend/index.jsx"],
  output: {
    path: path.resolve(__dirname, "build"),
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
        test: /\.css$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin("build", {}),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./src/www/index.html",
      title: "graphql_demo",
      filename: "index.html",
      favicon: "./src/img/favicon.ico"
    })
  ],
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  devServer: {
    contentBase: path.resolve("src/www"),
    hot: true,
    proxy: {
      "/graphql": "http://localhost:5050"
    },
    stats: "errors-only"
  }
};

export default settings;
