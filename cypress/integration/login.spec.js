/// <reference types="cypress" />

import { ELEMENT } from "../../src/constants";

describe("Login page ", () => {
  it("This happens when you enter short passwords", () => {
    cy.fixture("unicornTestLogin").then(({ main_url, email, password }) => {
      cy.log("Login page");
      cy.visit(main_url);
      cy.log("entering email");
      cy.get(`[data-test-id=${ELEMENT.loginEmail}]`).type(email);
      cy.log("entering password");
      cy.get(`[data-test-id=${ELEMENT.password}]`).type(password);
      cy.log("clicking logging button");
      cy.get(`[data-test-id=${ELEMENT.loginButton}]`).click();
    });
  });
  it("This happens when you enter short password", () => {
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
  it("This happens when you enter incorrect email", () => {
    cy.fixture("unicornTestLogin").then(
      ({ main_url, incorrectEmail, password, incorrectEmailErrorMessage }) => {
        cy.log("Login page");
        cy.visit(main_url);
        cy.log("entering email");
        cy.get(`[data-test-id=${ELEMENT.loginEmail}]`).type(incorrectEmail);
        cy.log("entering password");
        cy.get(`[data-test-id=${ELEMENT.password}]`).type(password);
        cy.log("clicking logging button");
        cy.get(`[data-test-id=${ELEMENT.loginButton}]`).click();
        cy.get(".MuiFormHelperText-root").should(
          "contain",
          incorrectEmailErrorMessage
        );
      }
    );
  });
  it("This happens when you enter without email", () => {
    cy.fixture("unicornTestLogin").then(
      ({ main_url, password, withoutEmailErrorMessage }) => {
        cy.log("Login page");
        cy.visit(main_url);
        cy.log("entering email");
        cy.get(`[data-test-id=${ELEMENT.loginEmail}]`);
        cy.log("entering password");
        cy.get(`[data-test-id=${ELEMENT.password}]`).type(password);
        cy.log("clicking logging button");
        cy.get(`[data-test-id=${ELEMENT.loginButton}]`).click();
        cy.get(".MuiFormHelperText-root").should(
          "contain",
          withoutEmailErrorMessage
        );
      }
    );
  });
  it("This happens when you enter without password", () => {
    cy.fixture("unicornTestLogin").then(
      ({ main_url, email, withoutPasswordErrorMessage }) => {
        cy.log("Login page");
        cy.visit(main_url);
        cy.log("entering email");
        cy.get(`[data-test-id=${ELEMENT.loginEmail}]`).type(email);
        cy.log("entering password");
        cy.get(`[data-test-id=${ELEMENT.password}]`);
        cy.log("clicking logging button");
        cy.get(`[data-test-id=${ELEMENT.loginButton}]`).click();
        cy.get(".MuiFormHelperText-root").should(
          "contain",
          withoutPasswordErrorMessage
        );
      }
    );
  });
});
