import React from "react";
import { BrowserRouter, StaticRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";
import { createGlobalStyle } from "styled-components";
import { Routes } from "client/routes/Routes";

export interface ApplicationProps {
  client: ApolloClient<unknown>;
  location: string;
  ssr: true;
}

export const Application = (props: ApplicationProps | {}) => {
  const client = React.useMemo(() => {
    if ("client" in props) {
      return props.client;
    }

    return new ApolloClient({
      connectToDevTools: true,
      link: createHttpLink({
        uri: "/graphql",
        fetch: (url: string, options: any) =>
          fetch(url, {
            method: "post",
            body: options?.body,
            credentials: "include",
          }),
      }),

      cache: new InMemoryCache({}).restore(window.APOLLO_STATE),
    });
  }, []);

  return (
    <ApolloProvider client={client}>
      <GlobalStyle />

      {"ssr" in props ? (
        <StaticRouter location={props.location}>
          <Routes />
        </StaticRouter>
      ) : (
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      )}
    </ApolloProvider>
  );
};

const GlobalStyle = createGlobalStyle`
  #app {
    height: 100%;
  }
`;
