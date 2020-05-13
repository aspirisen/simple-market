import creds from "../fixtures/creds.json";
import { loc } from "../../client/lib/utils/loc";

describe("Create user", () => {
  it("should create user", () => {
    cy.visit("/signup");

    cy.get(loc.auth.name).type(creds.name);
    cy.get(loc.auth.email).type(creds.email);
    cy.get(loc.auth.pass).type(creds.password);
    cy.get(loc.auth.submit).click();
  });
});
