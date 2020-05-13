import React from "react";
import {
  Menu,
  Icon,
  Dropdown,
  Segment,
  Loader,
  Dimmer,
  Label,
} from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { loc } from "client/utils/loc";
import {
  LoadPageData,
  LoadPageDataQuery,
  LoadPageDataQueryVariables,
} from "./Page.gql";

export interface PageProps {
  isLoading: boolean;
}

export function Page(props: React.PropsWithChildren<PageProps>) {
  const { data, loading } = useQuery<
    LoadPageDataQuery,
    LoadPageDataQueryVariables
  >(LoadPageData);

  return (
    <>
      <Menu stackable>
        <Dropdown item text={`Hello, ${data?.currentUser.name}`}>
          <Dropdown.Menu>
            <Dropdown.Item as={NavLink} to="/orders">
              Orders
            </Dropdown.Item>
            <Dropdown.Item as="a" href="/logout">
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Item as={NavLink} to="/products">
          <Icon name="unordered list" />
          <span> </span>
          Products
        </Menu.Item>

        <Menu.Item as={NavLink} to="/cart">
          <Icon name="cart" />
          <span> </span>
          Cart
          <PriceLabel color="teal" $visible={Boolean(data?.cart.totalPrice)}>
            <span data-testid={loc.components.page.totalPrice}>
              {data?.cart.totalPrice}
            </span>
            <span>$</span>
          </PriceLabel>
        </Menu.Item>
      </Menu>

      <Segment basic>
        <Dimmer active={props.isLoading && !loading}>
          <Loader />
        </Dimmer>

        {props.children}
      </Segment>

      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
    </>
  );
}

const PriceLabel = styled(Label)<{ $visible: boolean }>`
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};
`;
