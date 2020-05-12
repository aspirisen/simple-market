import React from "react";
import {
  Input,
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
import { LoadData, LoadDataQuery, LoadDataQueryVariables } from "./Page.gql";

export interface PageProps {
  isLoading: boolean;
}

export function Page(props: React.PropsWithChildren<PageProps>) {
  const { data, loading } = useQuery<LoadDataQuery, LoadDataQueryVariables>(
    LoadData
  );

  return (
    <>
      <Menu>
        <Dropdown item icon="user" text={`Hello, ${data?.currentUser.name}`}>
          <Dropdown.Menu>
            <Dropdown.Item as="a" href="/logout">
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Item as={NavLink} to="/cart">
          <Icon name="cart" />
          <span> </span>
          Cart
          <PriceLabel color="teal" $visible={Boolean(data?.cart.totalPrice)}>
            {data?.cart.totalPrice}
            <span>$</span>
          </PriceLabel>
        </Menu.Item>

        <Menu.Item position="right">
          <Input
            className="icon"
            icon="search"
            iconPosition="left"
            placeholder="Search..."
            transparent
          />
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
