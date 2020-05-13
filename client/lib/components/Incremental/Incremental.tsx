import React from "react";
import styled from "styled-components";
import { Form } from "semantic-ui-react";
import { loc } from "client/utils/loc";

export interface IncrementalProps {
  onChange: (nextValue: number) => void;
  value: number;
}

export const Incremental = (props: IncrementalProps) => {
  return (
    <Form>
      <Form.Group>
        <Form.Button
          icon="minus"
          data-testid={loc.components.incremental.minus}
          onClick={() => props.onChange(props.value - 1)}
        />

        <IncrementInput
          fluid
          value={props.value}
          readOnly
          data-testid={loc.components.incremental.value}
        />

        <Form.Button
          icon="plus"
          data-testid={loc.components.incremental.plus}
          onClick={() => props.onChange(props.value + 1)}
        />
      </Form.Group>
    </Form>
  );
};

const IncrementInput = styled(Form.Input)`
  flex: 1 !important;
`;
