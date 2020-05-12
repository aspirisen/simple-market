import React from "react";
import styled from "styled-components";
import { Segment, Card, Form, Button, Header, Icon } from "semantic-ui-react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import { Page } from "client/components/Page";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Product } from "client/components/Product";
import {
  LoadCart,
  LoadCartQuery,
  LoadCartQueryVariables,
  ConfirmCart,
  ConfirmCartMutation,
  ConfirmCartMutationVariables,
} from "./Cart.gql";

export const Cart = () => {
  const { data, loading } = useQuery<LoadCartQuery, LoadCartQueryVariables>(
    LoadCart
  );

  const [confirmCart] = useMutation<
    ConfirmCartMutation,
    ConfirmCartMutationVariables
  >(ConfirmCart);

  const [deliveryDate, setDeliveryDate] = React.useState<Date | null>(null);
  const [address, setAddress] = React.useState("");

  const isFormDisabled = !deliveryDate || !address;

  const onSubmit = React.useCallback(() => {
    if (!deliveryDate || !address) {
      return;
    }

    confirmCart({
      variables: {
        data: { deliveryDate: deliveryDate.toISOString(), address },
      },
    });
  }, [deliveryDate, address]);

  return (
    <Page isLoading={loading}>
      <Segment.Group horizontal>
        <Segment placeholder>
          {data?.cart.items.length ? (
            <Card.Group stackable>
              {data.cart.items.map((i) => (
                <Product
                  key={i.product.id}
                  product={i.product}
                  inCartQuantity={i.quantity}
                />
              ))}
            </Card.Group>
          ) : (
            <Header icon>
              <Icon name="file pdf outline" />
              No products in cart
            </Header>
          )}
        </Segment>

        {Boolean(data?.cart.items.length) && (
          <Segment>
            <Form onSubmit={onSubmit}>
              <Form.Field>
                <label>Delivery date</label>
                <DeliveryDate
                  value={deliveryDate?.toUTCString()}
                  onChange={setDeliveryDate}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  locale="en-GB"
                />
              </Form.Field>
              <Form.Field>
                <label>Address</label>
                <input
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.currentTarget.value)}
                />
              </Form.Field>
              <Button type="submit" disabled={isFormDisabled}>
                Buy
              </Button>
            </Form>
          </Segment>
        )}
      </Segment.Group>
    </Page>
  );
};

const DeliveryDate = styled((props: ReactDatePickerProps) => (
  <DatePicker {...props} className="" wrapperClassName={props.className} />
))`
  width: 100%;
`;
