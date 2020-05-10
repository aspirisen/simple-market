import path from "path";
import express from "express";
import { Application } from "server/core/Application";
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
    const layout = await ssr.createLayout(
      req.url,
      html,
      app.graphql.schemaLink
    );
    res.status(200);
    res.end(layout);
  });

  const port = process.env.PORT || 3000;

  app.exp.listen(port, () => {
    console.info(`Server is running on http://localhost:${port}`);
  });
})();
