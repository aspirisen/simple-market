import React from "react";
import * as t from "api-types";
import { Button, Card, Image } from "semantic-ui-react";

export interface ProductProps {
  product: t.Product;
}

export const Product = (props: ProductProps) => {
  return (
    <Card>
      <Image src={props.product.imageUrl} wrapped ui={false} />

      <Card.Content>
        <Card.Header>{props.product.name}</Card.Header>
        <Card.Meta>{props.product.kind}</Card.Meta>
        <Card.Description>
          <strong>Price: </strong>
          {props.product.price}
          <span>$</span>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button basic color="green" fluid>
          Add to cart
        </Button>
      </Card.Content>
    </Card>
  );
};
