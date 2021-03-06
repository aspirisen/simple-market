import React from "react";
import styled from "styled-components";
import * as t from "api-types";
import { Button, Card, Image } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { loc } from "client/utils/loc";
import {
  ChangeItemsQuantity,
  ChangeItemsQuantityMutation,
  ChangeItemsQuantityMutationVariables,
} from "./Product.gql";
import { Incremental } from "../Incremental";

export interface ProductProps {
  product: t.Product;
  inCartQuantity?: number;
  readonly?: boolean;
}

export const Product = (props: ProductProps) => {
  const [changeItemsQuantity] = useMutation<
    ChangeItemsQuantityMutation,
    ChangeItemsQuantityMutationVariables
  >(ChangeItemsQuantity);

  return (
    <Card data-testid={loc.components.product.container}>
      <Image src={props.product.imageUrl} />

      <Card.Content>
        <Card.Header>{props.product.name}</Card.Header>
        <Card.Meta data-testid={loc.components.product.kind}>
          {props.product.kind}
        </Card.Meta>
        {props.product.specialOffer && (
          <Card.Meta>{props.product.specialOffer}</Card.Meta>
        )}
        <Card.Description>
          <strong>Price: </strong>
          <span data-testid={loc.components.product.price}>
            {props.product.price}
          </span>
          <span>$</span>
        </Card.Description>

        {props.readonly && (
          <Card.Description>
            <strong>Quantity: </strong>
            {props.inCartQuantity}
          </Card.Description>
        )}
      </Card.Content>

      {!props.readonly && (
        <Actions extra>
          {props.inCartQuantity === undefined || props.inCartQuantity === 0 ? (
            <Button
              basic
              color="green"
              fluid
              data-testid={loc.components.product.addToCart}
              onClick={() =>
                changeItemsQuantity({
                  variables: { productId: props.product.id, quantity: 1 },
                })
              }
            >
              Add to cart
            </Button>
          ) : (
            <Incremental
              onChange={(quantity) =>
                changeItemsQuantity({
                  variables: { productId: props.product.id, quantity },
                })
              }
              value={props.inCartQuantity}
            />
          )}
        </Actions>
      )}
    </Card>
  );
};

const Actions = styled(Card.Content)`
  height: 60px;
`;
