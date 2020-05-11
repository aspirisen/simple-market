import express from "express";
import { Container } from "typedi";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { GraphQLSchema } from "graphql";
import * as controllers from "../controllers";

export interface Context {
  user: Express.User;
}
export class GraphQL {
  public schema!: GraphQLSchema;

  constructor(private exp: express.Express) {}

  public async populate() {
    this.schema = await buildSchema({
      resolvers: Object.values(controllers),
      emitSchemaFile: "schema.graphql",
      container: Container,
    });

    const server = new ApolloServer({
      schema: this.schema,
      tracing: true,
      introspection: true,
      context: (data) => {
        if (!data.req.user) {
          throw new Error("User not defined in request");
        }

        const context: Context = { user: data.req.user };
        return context;
      },
      playground: {
        settings: {
          "request.credentials": "include",
        },
      },
    });

    server.applyMiddleware({
      app: this.exp,
    });
  }
}
