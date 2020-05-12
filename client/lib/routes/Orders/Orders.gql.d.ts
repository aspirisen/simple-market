/** This file is generated by webpack, do not edit it. */
import * as Types from "../../../typings/api";

export type LoadOrdersQueryVariables = {};

export type LoadOrdersQuery = { __typename?: "Query" } & {
  orders: Array<
    { __typename?: "Order" } & Pick<
      Types.Order,
      "id" | "totalCount" | "totalPrice" | "address" | "deliveryDate"
    > & {
        items: Array<
          { __typename?: "Item" } & Pick<Types.Item, "quantity"> & {
              product: { __typename?: "Product" } & Pick<
                Types.Product,
                "id" | "name" | "price" | "kind" | "imageUrl" | "specialOffer"
              >;
            }
        >;
      }
  >;
};

export const LoadOrders: import("graphql").DocumentNode;
