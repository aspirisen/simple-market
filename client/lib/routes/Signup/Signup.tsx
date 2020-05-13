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
import { loc } from "client/utils/loc";

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
              data-testid={loc.auth.name}
            />

            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="E-mail address"
              name="email"
              data-testid={loc.auth.email}
            />

            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              data-testid={loc.auth.pass}
            />

            <Button
              type="submit"
              color="teal"
              fluid
              size="large"
              data-testid={loc.auth.submit}
            >
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
