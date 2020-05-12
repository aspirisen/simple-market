/** This file is generated by webpack, do not edit it. */
import * as Types from "../../../client/typings/api";

export type LoadDataQueryVariables = {};

export type LoadDataQuery = { __typename?: "Query" } & {
  currentUser: { __typename?: "User" } & Pick<Types.User, "name">;
  cart: { __typename?: "Cart" } & Pick<Types.Cart, "id" | "totalPrice">;
};

export const LoadData: import("graphql").DocumentNode;
