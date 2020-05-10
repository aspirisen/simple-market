import * as path from "path";
import * as webpack from "webpack";
import NodemonPlugin from "nodemon-webpack-plugin";
import nodeExternals from "webpack-node-externals";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

export function createConfig() {
  const isProduction = process.env.NODE_ENV === "production";
  console.log(`Server isProduction: ${isProduction}`);

  const config: webpack.Configuration = {
    mode: isProduction ? "production" : "development",
    context: path.resolve(__dirname, "server"),
    entry: {
      server: isProduction ? "./bootstrap.prod" : "./bootstrap.dev",
    },

    target: "node",

    node: {
      __dirname: false,
      __filename: false,
    },

    externals: [nodeExternals(), "./public/ssr"],

    output: {
      path: path.resolve("./dist"),
      publicPath: "/",
      filename: "[name].js",
      libraryTarget: "commonjs",
    },

    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
      plugins: [new TsconfigPathsPlugin({})],
      alias: {
        "./public/index.html": path.resolve(
          __dirname,
          "dist/public/index.html"
        ),
      },
    },

    devtool: "nosources-source-map",

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "ts-loader",
        },
        {
          test: /\.(html)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "raw-loader",
        },
      ],
    },

    optimization: {
      minimize: false,
    },

    plugins: [],
  };

  if (!isProduction) {
    config.plugins?.push(new NodemonPlugin({ nodeArgs: ["--inspect"] }));
  }

  return config;
}

export default createConfig;
