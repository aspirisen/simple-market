import React from "react";
import * as t from "api-types";
import { Card } from "semantic-ui-react";
import { Product } from "./Product";

export interface ProductsListProps {
  products?: t.Product[];
  quantityMap?: Record<string, number>;
  readonly?: boolean;
}

export const ProductsList = (props: ProductsListProps) => {
  return (
    <Card.Group stackable>
      {props?.products?.map((p) => (
        <Product
          key={p.id}
          product={p}
          inCartQuantity={props.quantityMap?.[p.id]}
          readonly={props.readonly}
        />
      ))}
    </Card.Group>
  );
};
