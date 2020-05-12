import React from "react";
import * as t from "api-types";
import { Page } from "client/components/Page";
import { useQuery } from "@apollo/react-hooks";
import { Header, Segment } from "semantic-ui-react";
import { ProductsList, ProductsListProps } from "client/components/Product";
import {
  LoadOrders,
  LoadOrdersQuery,
  LoadOrdersQueryVariables,
} from "./Orders.gql";

export const Orders = () => {
  const { data, loading } = useQuery<LoadOrdersQuery, LoadOrdersQueryVariables>(
    LoadOrders
  );

  const createList = (items: t.Item[]) => {
    if (!data) {
      return null;
    }

    const quantityMap: ProductsListProps["quantityMap"] = {};
    const products: ProductsListProps["products"] = [];

    items.forEach((i) => {
      quantityMap[i.product.id] = i.quantity;
      products.push(i.product);
    });

    return { products, quantityMap };
  };

  return (
    <Page isLoading={loading}>
      {data?.orders.map((o) => {
        const list = createList(o.items);

        return (
          <>
            <Header as="h5" attached="top">
              {o.address}
            </Header>
            <Segment attached>
              <ProductsList
                products={list?.products}
                quantityMap={list?.quantityMap}
                readonly
              />
            </Segment>
          </>
        );
      })}
    </Page>
  );
};
