import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

export const Signup = () => {
  return (
    <Grid centered padded verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" color="teal" textAlign="center">
          Sign up
        </Header>
        <Form size="large" action="/signup" method="post">
          <Segment>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Name"
              name="name"
            />

            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="E-mail address"
              name="email"
            />

            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
            />

            <Button type="submit" color="teal" fluid size="large">
              Sign up
            </Button>
          </Segment>
        </Form>

        <Message>
          Have account?
          <span> </span>
          <Link to="/login">Log In</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};
