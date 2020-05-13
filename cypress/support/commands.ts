import { loc } from "../../client/lib/utils/loc";
import creds from "../fixtures/creds.json";

export const login = () => {
  cy.visit("/login");

  cy.get(loc.auth.email).type(creds.email);
  cy.get(loc.auth.pass).type(creds.password);
  cy.get(loc.auth.submit).click();
};
