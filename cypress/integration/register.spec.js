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
        cy.log("entering password1");
        cy.get(`[data-test-id=${ELEMENT.password1}]`).type(shortPassword);
        cy.log("entering password2");
        cy.get(`[data-test-id=${ELEMENT.password2}]`).type(shortPassword);
        cy.log("clicking registering button");
        cy.get(`[data-test-id=${ELEMENT.registerButton}]`).click();
        cy.get(".MuiFormHelperText-root").should(
          "contain",
          shortPasswordErrorMessage
        );
      }
    );
  });
  it("This happens when you enter incorrect email", () => {
    cy.fixture("unicornTestRegister").then(
      ({ main_url, incorrectEmail, password, incorrectEmailErrorMessage }) => {
        cy.log("Register page");
        cy.visit(main_url);
        cy.log("entering email");
        cy.get(`[data-test-id=${ELEMENT.registerEmail}]`).type(incorrectEmail);
        cy.get(`[data-test-id=${ELEMENT.password1}]`).type(password);
        cy.log("entering password2");
        cy.get(`[data-test-id=${ELEMENT.password2}]`).type(password);
        cy.log("clicking logging button");
        cy.get(`[data-test-id=${ELEMENT.registerButton}]`).click();
        cy.get(".MuiFormHelperText-root").should(
          "contain",
          incorrectEmailErrorMessage
        );
      }
    );
  });
  it("This happens when you enter without email", () => {
    cy.fixture("unicornTestRegister").then(
      ({ main_url, password, withoutEmailErrorMessage }) => {
        cy.log("Register page");
        cy.visit(main_url);
        cy.log("entering email");
        cy.get(`[data-test-id=${ELEMENT.registerEmail}]`);
        cy.get(`[data-test-id=${ELEMENT.password1}]`).type(password);
        cy.log("entering password2");
        cy.get(`[data-test-id=${ELEMENT.password2}]`).type(password);
        cy.log("clicking logging button");
        cy.get(`[data-test-id=${ELEMENT.registerButton}]`).click();
        cy.get(".MuiFormHelperText-root").should(
          "contain",
          withoutEmailErrorMessage
        );
      }
    );
  });
  it("This happens when you enter without password1", () => {
    cy.fixture("unicornTestRegister").then(
      ({ main_url, password, withoutPasswordErrorMessage, email }) => {
        cy.log("Register page");
        cy.visit(main_url);
        cy.log("entering email");
        cy.get(`[data-test-id=${ELEMENT.registerEmail}]`).type(email);
        cy.get(`[data-test-id=${ELEMENT.password1}]`);
        cy.log("entering password2");
        cy.get(`[data-test-id=${ELEMENT.password2}]`).type(password);
        cy.log("clicking logging button");
        cy.get(`[data-test-id=${ELEMENT.registerButton}]`).click();
        cy.get(".MuiFormHelperText-root").should(
          "contain",
          withoutPasswordErrorMessage
        );
      }
    );
  });
  it("This happens when you enter without password2", () => {
    cy.fixture("unicornTestRegister").then(
      ({ main_url, password, repeatPasswordErrorMessage, email }) => {
        cy.log("Register page");
        cy.visit(main_url);
        cy.log("entering email");
        cy.get(`[data-test-id=${ELEMENT.registerEmail}]`).type(email);
        cy.get(`[data-test-id=${ELEMENT.password1}]`).type(password);
        cy.log("entering password2");
        cy.get(`[data-test-id=${ELEMENT.password2}]`);
        cy.log("clicking logging button");
        cy.get(`[data-test-id=${ELEMENT.registerButton}]`).click();
        cy.get(".MuiFormHelperText-root").should(
          "contain",
          repeatPasswordErrorMessage
        );
      }
    );
  });
});
