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

export const Login = () => {
  return (
    <Grid centered padded verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" color="teal" textAlign="center">
          Log in
        </Header>
        <Form size="large" action="/login" method="post">
          <Segment>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              name="username"
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
              Login
            </Button>
          </Segment>
        </Form>

        <Message>
          New to us?
          <span> </span>
          <Link to="/signup">Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};
