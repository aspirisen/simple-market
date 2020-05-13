import { loc } from "../../client/lib/utils/loc";
import { login } from "../support/commands";

describe("Products", () => {
  beforeEach(() => {
    login();
  });

  it("should add product", (done) => {
    cy.visit("/products");

    cy.get(
      `${loc.components.product.container}:first-child ${loc.components.product.addToCart}`
    ).click();

    cy.get(
      `${loc.components.product.container}:first-child ${loc.components.product.price}`
    )
      .invoke("text")
      .then((price) =>
        cy
          .get(loc.components.page.totalPrice)
          .invoke("text")
          .then((totalPrice) => {
            expect(price).to.eq(totalPrice);
            done();
          })
      );
  });
});
