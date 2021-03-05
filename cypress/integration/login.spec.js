/// <reference types="cypress" />

import { ELEMENT } from "../../src/constants";

describe("Login page ", () => {
  it("It let user in with short password", () => {
    cy.fixture("unicornTestLogin").then(
      ({ main_url, email, shortPassword, shortPasswordErrorMessage }) => {
        cy.log("Login page");
        cy.visit(main_url);
        cy.log("entering email");
        cy.get(`[data-test-id=${ELEMENT.loginEmail}]`).type(email);
        cy.log("entering password");
        cy.get(`[data-test-id=${ELEMENT.password}]`).type(shortPassword);
        cy.log("clicking logging button");
        cy.get(`[data-test-id=${ELEMENT.loginButton}]`).click();
        cy.get(".MuiFormHelperText-root").should(
          "contain",
          shortPasswordErrorMessage
        );
      }
    );
  });
});
