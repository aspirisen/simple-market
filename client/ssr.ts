import * as React from "react";
import { ApolloClient, InMemoryCache } from "apollo-boost";
import { renderToStringWithData } from "@apollo/react-ssr";
import { ServerStyleSheet } from "styled-components";
import SchemaLink from "apollo-link-schema";
import { Application } from "./lib/core/Application";

export async function createLayout(
  location: string,
  html: string,
  schemaLink: SchemaLink
) {
  let layout = html;

  try {
    const client = new ApolloClient({
      ssrMode: true,
      ssrForceFetchDelay: 500,
      link: schemaLink,
      cache: new InMemoryCache(),
    });

    const sheet = new ServerStyleSheet();

    const AppWithStyles = sheet.collectStyles(
      React.createElement(Application, { location })
    );

    const content = await renderToStringWithData(AppWithStyles);
    const gqlData = client.extract();
    const styleTags = sheet.getStyleTags();

    const cache = JSON.stringify(gqlData);

    const output = [
      `<script>window.APOLLO_STATE = ${cache};</script>`,
      `<div id="app">${content}`,
    ].join("");

    layout = html
      .replace('<div id="app">', output)
      .replace("</head>", `${styleTags}</head>`);

    return layout;
  } catch (e) {
    console.log(e);
    return layout;
  }
}
