import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Page } from "client/components/Page";
import { ProductsList } from "client/components/Product";
import {
  LoadProductsData,
  LoadProductsDataQuery,
  LoadProductsDataQueryVariables,
} from "./Products.gql";

export const Products = () => {
  const { data, loading } = useQuery<
    LoadProductsDataQuery,
    LoadProductsDataQueryVariables
  >(LoadProductsData);

  const inCartQuantityMap = React.useMemo(() => {
    const result: Record<string, number> = {};

    data?.cart.items.forEach((i) => {
      result[i.product.id] = i.quantity;
    });

    return result;
  }, [data]);

  return (
    <Page isLoading={loading}>
      <ProductsList products={data?.products} quantityMap={inCartQuantityMap} />
    </Page>
  );
};
