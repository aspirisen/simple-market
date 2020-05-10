import React from "react";
import { Login } from "client/routes/Login";

export interface ApplicationProps {
  location?: string;
}

export const Application = (_: ApplicationProps) => {
  return (
    <div>
      <Login />
    </div>
  );
};
