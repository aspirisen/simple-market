import fs from "fs";
import path from "path";
import importFresh from "import-fresh";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import { SchemaLink } from "apollo-link-schema";
import { Application } from "server/core/Application";
import { Context } from "server/core/GraphQL";
import { createConfig } from "../webpack.client.config";

(async () => {
  const app = new Application({
    url: "mongodb://localhost:27017/",
    dbName: "simple-market",
  });

  const config = createConfig({
    dirname: path.resolve(__dirname, "../"),
    addHmrMiddleware: true,
  });

  const compiler = webpack(config);

  const middleware = webpackDevMiddleware(compiler, {
    publicPath: "/",
    index: false,
    writeToDisk: true,
  });

  const hotMiddleware = webpackHotMiddleware(compiler);
  await new Promise((resolve) => middleware.waitUntilValid(resolve));

  app.exp.use(middleware);
  app.exp.use(hotMiddleware);

  await app.populate(async (req, res) => {
    const html = fs
      .readFileSync(path.resolve(__dirname, "./public/index.html"))
      .toString();

    const context: Context = { user: req.user! };

    const ssr = importFresh("./public/ssr") as typeof import("./public/ssr");
    const schemaLink = new SchemaLink({ schema: app.graphql.schema, context });

    const layout = await ssr.createLayout(req.url, html, schemaLink);

    res.status(200);
    res.end(layout);
  });

  const port = process.env.PORT || 3000;

  app.exp.listen(port, () => {
    console.info(`Server is running on http://localhost:${port}`);
  });
})();
