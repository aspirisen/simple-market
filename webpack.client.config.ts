import * as path from "path";
import * as webpack from "webpack";
import "webpack-dev-server";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import template from "html-webpack-template";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

export interface ClientWebpackOptions {
  dirname?: string;
  addHmrMiddleware?: boolean;
}

export function createConfig(options: ClientWebpackOptions = {}) {
  const dirname = options.dirname || __dirname;
  const isProduction = process.env.NODE_ENV === "production";
  console.log(`Client isProduction: ${isProduction}`);

  const entry = {
    ssr: "./ssr",
    client: [isProduction ? "./bootstrap.prod" : "./bootstrap.dev"],
  };

  const config: webpack.Configuration = {
    mode: isProduction ? "production" : "development",
    context: path.resolve(dirname, "client"),

    entry,

    optimization: {
      usedExports: true,
      providedExports: true,
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: (v) => v.name !== "ssr",
            name: "vendors",
            enforce: true,
          },
        },
      },
    },

    output: {
      path: path.resolve(dirname, "dist/public"),
      publicPath: "/",
      filename: (c) =>
        c.chunk.name === "ssr" ? "[name].js" : "[name].[hash].js",
      chunkFilename: "[name].[hash].js",
      libraryTarget: "umd",
      globalObject: "this",
    },

    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
      alias: {
        "react-dom": isProduction ? "react-dom" : "@hot-loader/react-dom",
      },
      plugins: [
        new TsconfigPathsPlugin({
          baseUrl: dirname,
          configFile: path.join(dirname, "tsconfig.json"),
        }),
      ],
    },

    devtool: isProduction ? "nosources-source-map" : "#eval",

    devServer: {
      contentBase: path.join(__dirname, "dist/public"),
      disableHostCheck: true,
      historyApiFallback: true,
      hot: !isProduction,
      port: 3000,
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "ts-loader",
          options: {
            compilerOptions: {
              target: "ES5",
            },
          },
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: "graphql-tag/loader",
        },
        {
          test: /\.css$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            "css-loader",
          ],
        },
        {
          test: /\.(ttf|eot|svg|woff|woff2|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader",
          options: {
            name: "assets/[name].[hash].[ext]",
          },
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin({}),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
        ignoreOrder: false,
      }),
      new HtmlWebpackPlugin({
        template,
        title: "Simple Market",
        meta: {
          viewport: "width=device-width, initial-scale=1",
        },
        appMountId: "app",
        minify: true,
        inject: true,
        lang: "ru-RU",
        excludeChunks: ["ssr"],
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      }),
    ],
  };

  if (options.addHmrMiddleware) {
    entry.client = ["webpack-hot-middleware/client?overlay=false"].concat(
      entry.client
    );
  }

  if (!isProduction) {
    config.plugins?.push(new webpack.HotModuleReplacementPlugin({}));
  }

  return config;
}

export default createConfig;
