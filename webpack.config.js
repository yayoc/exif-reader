const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const webpack = require("webpack");

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new CopyWebpackPlugin([
      { from: "./manifest.json", to: "manifest.json" },
      { from: "./sw.js", to: "sw.js" },
      { from: "./images", to: "images" },
    ])
  ],
  mode: process.env.NODE_ENV,
};
