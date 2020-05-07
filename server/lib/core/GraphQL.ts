import express from "express";
import { Container } from "typedi";
import { ApolloServer } from "apollo-server-express";
import { SchemaLink } from "apollo-link-schema";
import { buildSchema } from "type-graphql";
import { GraphQLSchema } from "graphql";
import * as controllers from "../controllers";

export class GraphQL {
  private schema!: GraphQLSchema;

  public schemaLink!: SchemaLink;

  constructor(private exp: express.Express) {}

  public async populate() {
    this.schema = await buildSchema({
      resolvers: Object.values(controllers),
      emitSchemaFile: "schema.graphql",
      container: Container,
    });

    this.schemaLink = new SchemaLink({ schema: this.schema });

    const server = new ApolloServer({
      schema: this.schema,
      tracing: true,
      introspection: true,
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
