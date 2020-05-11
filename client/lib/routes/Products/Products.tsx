import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Card } from "semantic-ui-react";
import { Page } from "client/components/Page";
import { Product } from "client/components/Product";
import {
  LoadData,
  LoadDataQuery,
  LoadDataQueryVariables,
} from "./Products.gql";

export const Products = () => {
  const { data, loading } = useQuery<LoadDataQuery, LoadDataQueryVariables>(
    LoadData
  );

  return (
    <Page isLoading={loading}>
      <Card.Group stackable>
        {data?.products.map((p) => (
          <Product key={p.id} product={p} />
        ))}
      </Card.Group>
    </Page>
  );
};
