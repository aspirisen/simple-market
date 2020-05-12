/** This file is generated by webpack, do not edit it. */
import * as Types from "../../../typings/api";

export type LoadCartQueryVariables = {};

export type LoadCartQuery = { __typename?: "Query" } & {
  cart: { __typename?: "Cart" } & Pick<
    Types.Cart,
    "id" | "totalCount" | "totalPrice"
  > & {
      items: Array<
        { __typename?: "Item" } & Pick<Types.Item, "quantity"> & {
            product: { __typename?: "Product" } & Pick<
              Types.Product,
              "id" | "name" | "price" | "kind" | "imageUrl"
            >;
          }
      >;
    };
};

export type ConfirmCartMutationVariables = {
  data: Types.ConfirmCart;
};

export type ConfirmCartMutation = { __typename?: "Mutation" } & {
  clearCart: { __typename?: "Cart" } & Pick<
    Types.Cart,
    "id" | "totalCount" | "totalPrice"
  > & {
      items: Array<
        { __typename?: "Item" } & {
          product: { __typename?: "Product" } & Pick<Types.Product, "id">;
        }
      >;
    };
  confirmCart: { __typename?: "Order" } & Pick<Types.Order, "id">;
};

export const LoadCart: import("graphql").DocumentNode;
export const ConfirmCart: import("graphql").DocumentNode;