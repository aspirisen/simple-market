/** This file is generated by webpack, do not edit it. */
import * as Types from "../../../client/typings/api";

export type LoadDataQueryVariables = {};

export type LoadDataQuery = { __typename?: "Query" } & {
  products: Array<
    { __typename?: "Product" } & Pick<
      Types.Product,
      "id" | "name" | "price" | "kind" | "imageUrl"
    >
  >;
};

export const LoadData: import("graphql").DocumentNode;
