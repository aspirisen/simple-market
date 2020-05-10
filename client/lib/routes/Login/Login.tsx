import React from "react";

export const Login = () => {
  const [clicked, setClicked] = React.useState(false);

  if (clicked === false) {
    return <button onClick={() => setClicked(true)}>Click</button>;
  } else {
    return <h1>One</h1>;
  }
};
