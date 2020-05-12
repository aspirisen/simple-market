import React from "react";
import styled from "styled-components";
import { Form } from "semantic-ui-react";

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
          onClick={() => props.onChange(props.value - 1)}
        />

        <IncrementInput fluid value={props.value} readonly />

        <Form.Button
          icon="plus"
          onClick={() => props.onChange(props.value + 1)}
        />
      </Form.Group>
    </Form>
  );
};

const IncrementInput = styled(Form.Input)`
  flex: 1 !important;
`;
