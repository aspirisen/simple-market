import path from "path";
import express from "express";
import { Application } from "server/core/Application";
import { SchemaLink } from "apollo-link-schema";
import { Context } from "server/core/GraphQL";
import * as ssr from "./public/ssr";
import html from "./public/index.html";

(async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  const app = new Application({ url: process.env.MONGODB_URI });

  app.exp.use(
    express.static(path.resolve(__dirname, "./public"), { index: false })
  );

  app.populate(async (req, res) => {
    const context: Context = { user: req.user! };
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
