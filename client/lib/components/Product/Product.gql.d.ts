/** This file is generated by webpack, do not edit it. */
import * as Types from "../../../typings/api";

export type ChangeItemsQuantityMutationVariables = {
  productId: Types.Scalars["String"];
  quantity: Types.Scalars["Float"];
};

export type ChangeItemsQuantityMutation = { __typename?: "Mutation" } & {
  changeItemsQuantity: { __typename?: "Cart" } & Pick<
    Types.Cart,
    "id" | "totalCount" | "totalPrice"
  > & {
      items: Array<
        { __typename?: "Item" } & Pick<Types.Item, "quantity"> & {
            product: { __typename?: "Product" } & Pick<Types.Product, "id">;
          }
      >;
    };
};

export const ChangeItemsQuantity: import("graphql").DocumentNode;
