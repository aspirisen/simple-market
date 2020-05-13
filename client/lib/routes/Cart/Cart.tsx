import React from "react";
import styled from "styled-components";
import { Segment, Form, Button, Header, Icon } from "semantic-ui-react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import { Page } from "client/components/Page";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ProductsList, ProductsListProps } from "client/components/Product";
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

  const list = React.useMemo(() => {
    if (!data || data.cart.totalCount === 0) {
      return null;
    }

    const inCartQuantityMap: ProductsListProps["quantityMap"] = {};
    const products: ProductsListProps["products"] = [];

    data.cart.items.forEach((i) => {
      inCartQuantityMap[i.product.id] = i.quantity;
      products.push(i.product);
    });

    return { products, inCartQuantityMap };
  }, [data]);

  const isFormDisabled = !deliveryDate || !address;

  return (
    <Page isLoading={loading}>
      <Segment.Group>
        <Segment placeholder>
          {list ? (
            <ProductsList
              quantityMap={list.inCartQuantityMap}
              products={list.products}
            />
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
                  selected={deliveryDate}
                  onChange={setDeliveryDate}
                  showTimeSelect
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="d MMMM, yyyy, HH:mm"
                  timeFormat="HH:mm"
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
