import React from "react";
import styled from "styled-components";
import * as t from "api-types";
import { Button, Card, Image } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import {
  ChangeItemsQuantity,
  ChangeItemsQuantityMutation,
  ChangeItemsQuantityMutationVariables,
} from "./Product.gql";
import { Incremental } from "../Incremental";

export interface ProductProps {
  product: t.Product;
  inCartQuantity?: number;
}

export const Product = (props: ProductProps) => {
  const [changeItemsQuantity] = useMutation<
    ChangeItemsQuantityMutation,
    ChangeItemsQuantityMutationVariables
  >(ChangeItemsQuantity);

  return (
    <Card>
      <Image src={props.product.imageUrl} />

      <Card.Content>
        <Card.Header>{props.product.name}</Card.Header>
        <Card.Meta>{props.product.kind}</Card.Meta>
        {props.product.specialOffer && (
          <Card.Meta>{props.product.specialOffer}</Card.Meta>
        )}
        <Card.Description>
          <strong>Price: </strong>
          {props.product.price}
          <span>$</span>
        </Card.Description>
      </Card.Content>
      <Actions extra>
        {props.inCartQuantity === undefined || props.inCartQuantity === 0 ? (
          <Button
            basic
            color="green"
            fluid
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
    </Card>
  );
};

const Actions = styled(Card.Content)`
  height: 60px;
`;
