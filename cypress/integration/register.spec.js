/// <reference types="cypress" />

import { ELEMENT } from "../../src/constants";

describe("Register page ", () => {
  it("This happens when you enter correct data", () => {
    cy.fixture("unicornTestRegister").then(({ main_url, email, password }) => {
      cy.log("Register page");
      cy.visit(main_url);
      cy.log("entering email");
      cy.get(`[data-test-id=${ELEMENT.registerEmail}]`).type(email);
      cy.log("entering password1");
      cy.get(`[data-test-id=${ELEMENT.password1}]`).type(password);
      cy.log("entering password2");
      cy.get(`[data-test-id=${ELEMENT.password2}]`).type(password);
      cy.log("clicking registering button");
      cy.get(`[data-test-id=${ELEMENT.registerButton}]`).click();
    });
  });
  it("This happens when you enter short passwords", () => {
    cy.fixture("unicornTestRegister").then(
      ({ main_url, email, shortPassword, shortPasswordErrorMessage }) => {
        cy.log("Register page");
        cy.visit(main_url);
        cy.log("entering email");
        cy.get(`[data-test-id=${ELEMENT.registerEmail}]`).type(email);
        cy.log("entering shortPassword1");
        cy.get(`[data-test-id=${ELEMENT.password1}]`).type(shortPassword);
        cy.log("entering password2");
        cy.get(`[data-test-id=${ELEMENT.password2}]`).type(shortPassword);
        cy.get(".MuiFormHelperText-root").should(
          "contain",
          shortPasswordErrorMessage
        );
        cy.log("clicking registering button");
        cy.get(`[data-test-id=${ELEMENT.registerButton}]`).click();
      }
    );
  });
});
