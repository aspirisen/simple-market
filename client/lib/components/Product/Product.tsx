import React from "react";
import * as t from "api-types";
import { Button, Card, Image } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import {
  AddToCart,
  AddToCartMutation,
  AddToCartMutationVariables,
  RemoveFromCart,
  RemoveFromCartMutation,
  RemoveFromCartMutationVariables,
} from "./Product.gql";

export interface ProductProps {
  product: t.Product;
  isInCart: boolean;
}

export const Product = (props: ProductProps) => {
  const [addToCart] = useMutation<
    AddToCartMutation,
    AddToCartMutationVariables
  >(AddToCart);

  const [removeFromCart] = useMutation<
    RemoveFromCartMutation,
    RemoveFromCartMutationVariables
  >(RemoveFromCart);

  return (
    <Card>
      <Image src={props.product.imageUrl} />

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
        {props.isInCart ? (
          <Button
            basic
            color="red"
            fluid
            onClick={() =>
              removeFromCart({ variables: { productId: props.product.id } })
            }
          >
            Remove from cart
          </Button>
        ) : (
          <Button
            basic
            color="green"
            fluid
            onClick={() =>
              addToCart({ variables: { productId: props.product.id } })
            }
          >
            Add to cart
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};
