const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  entry: [
    path.resolve(__dirname, "../src/script.ts"),
    // path.resolve(__dirname, "../src/index.ejs"),
  ],
  output: {
    hashFunction: "xxhash64",
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
  },
  devtool: "source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, "../static") }],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
      minify: true,
    }),
    new MiniCSSExtractPlugin({
      filename: isDevelopment ? "[name].css" : "[name].[hash].css",
      chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css",
    }),
  ],
  resolve: {
    extensions: [".ts", ".ejs", ".js", ".json"],
  },
  module: {
    rules: [
      // HTML
      {
        test: /\.(html)$/,
        use: [
          {
            loader: "html-loader",
            options: { sources: false },
          },
        ],
      },

      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },

      // TS
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },

      //  STYLES
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },

      // Images
      {
        test: /\.(jpg|png|gif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[hash][ext]",
        },
      },

      // Fonts
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[hash][ext]",
        },
      },
    ],
  },
};
