import "reflect-metadata";
import express from "express";
import * as React from "react";
import { ApolloClient, InMemoryCache } from "apollo-boost";
import { renderToStringWithData } from "@apollo/react-ssr";
import { ServerStyleSheet } from "styled-components";
import { DB, DbConfig } from "./DB";
import { GraphQL } from "./GraphQL";

export class Application {
  public exp = express();

  private db = new DB(this.dbConfig);

  private graphql = new GraphQL(this.exp);

  public constructor(private dbConfig: DbConfig) {}

  public async populate() {
    await this.db.populate();
    await this.graphql.populate();
  }

  public async serverSideRendering(
    _: express.Request,
    res: express.Response,
    html: string,
    ssr: typeof import("./public/ssr")
  ) {
    const client = new ApolloClient({
      ssrMode: true,
      ssrForceFetchDelay: 500,
      link: this.graphql.schemaLink,
      cache: new InMemoryCache(),
    });

    const sheet = new ServerStyleSheet();

    const AppWithStyles = sheet.collectStyles(
      React.createElement(ssr.Application)
    );

    const content = await renderToStringWithData(AppWithStyles);
    const gqlData = client.extract();
    const styleTags = sheet.getStyleTags();

    const cache = JSON.stringify(gqlData);

    const output = [
      `<script>window.APOLLO_STATE = ${cache};</script>`,
      `<div id="app">${content}`,
    ].join("");

    const layout = html
      .replace('<div id="app">', output)
      .replace("</head>", `${styleTags}</head>`);

    res.status(200);
    res.end(layout);
  }
}
