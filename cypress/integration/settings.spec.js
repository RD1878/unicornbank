/// <reference types="cypress" />

import { ELEMENT } from "../../src/constants";

describe("Settings page", () => {
  it("This happens when you enter correct data", () => {
    cy.fixture("unicornTestSettings").then(
      ({ main_url, password, newPassword }) => {
        cy.log("Settings page");
        cy.visit(main_url);
        cy.log("entering current password");
        cy.get(`[data-test-id=${ELEMENT.currentPassword}]`).type(password);
        cy.log("entering new password");
        cy.get(`[data-test-id=${ELEMENT.newPassword}]`).type(newPassword);
        cy.log("entering repeat new password");
        cy.get(`[data-test-id=${ELEMENT.repeatNewPassword}]`).type(newPassword);
        cy.log("clicking save button");
        cy.get(`[data-test-id=${ELEMENT.saveChangesButton}]`).click();
      }
    );
  });
  it("This happens when you enter short current password", () => {
    cy.fixture("unicornTestSettings").then(
      ({
        main_url,
        shortCurrentPasswordErrorMessage,
        shortPassword,
        newPassword,
      }) => {
        cy.log("Settings page");
        cy.visit(main_url);
        cy.log("entering current password");
        cy.get(`[data-test-id=${ELEMENT.currentPassword}]`).type(shortPassword);
        cy.log("entering new password");
        cy.get(`[data-test-id=${ELEMENT.newPassword}]`).type(newPassword);
        cy.log("entering repeat new password");
        cy.get(`[data-test-id=${ELEMENT.repeatNewPassword}]`).type(newPassword);
        cy.log("clicking save button");
        cy.get(`[data-test-id=${ELEMENT.saveChangesButton}]`).click();
        cy.get(".MuiFormHelperText-root").should(
          "contain",
          shortCurrentPasswordErrorMessage
        );
      }
    );
  });
  it("This happens when you enter short new password1", () => {
    cy.fixture("unicornTestSettings").then(
      ({ main_url, withoutPasswordErrorMessage, password, newPassword }) => {
        cy.log("Settings page");
        cy.visit(main_url);
        cy.log("entering current password");
        cy.get(`[data-test-id=${ELEMENT.currentPassword}]`).type(password);
        cy.log("entering new password");
        cy.get(`[data-test-id=${ELEMENT.newPassword}]`);
        cy.log("entering repeat new password");
        cy.get(`[data-test-id=${ELEMENT.repeatNewPassword}]`).type(newPassword);
        cy.log("clicking save button");
        cy.get(`[data-test-id=${ELEMENT.saveChangesButton}]`).click();
        cy.get(".MuiFormHelperText-root").should(
          "contain",
          withoutPasswordErrorMessage
        );
      }
    );
  });
  it("This happens when you enter without new password2", () => {
    cy.fixture("unicornTestSettings").then(
      ({ main_url, repeatPasswordErrorMessage, password, newPassword }) => {
        cy.log("Settings page");
        cy.visit(main_url);
        cy.log("entering current password");
        cy.get(`[data-test-id=${ELEMENT.currentPassword}]`).type(password);
        cy.log("entering new password");
        cy.get(`[data-test-id=${ELEMENT.newPassword}]`).type(newPassword);
        cy.log("entering repeat new password");
        cy.get(`[data-test-id=${ELEMENT.repeatNewPassword}]`);
        cy.log("clicking save button");
        cy.get(`[data-test-id=${ELEMENT.saveChangesButton}]`).click();
        cy.get(".MuiFormHelperText-root").should(
          "contain",
          repeatPasswordErrorMessage
        );
      }
    );
  });
  it("This happens when you enter short new password1", () => {
    cy.fixture("unicornTestSettings").then(
      ({
        main_url,
        shortPasswordErrorMessage,
        password,
        newPassword,
        shortPassword,
      }) => {
        cy.log("Settings page");
        cy.visit(main_url);
        cy.log("entering current password");
        cy.get(`[data-test-id=${ELEMENT.currentPassword}]`).type(password);
        cy.log("entering new password");
        cy.get(`[data-test-id=${ELEMENT.newPassword}]`).type(shortPassword);
        cy.log("entering repeat new password");
        cy.get(`[data-test-id=${ELEMENT.repeatNewPassword}]`).type(newPassword);
        cy.log("clicking save button");
        cy.get(`[data-test-id=${ELEMENT.saveChangesButton}]`).click();
        cy.get(".MuiFormHelperText-root").should(
          "contain",
          shortPasswordErrorMessage
        );
      }
    );
  });
  it("This happens when you enter short new password2", () => {
    cy.fixture("unicornTestSettings").then(
      ({
        main_url,
        shortPasswordErrorMessage,
        password,
        newPassword,
        shortPassword,
      }) => {
        cy.log("Settings page");
        cy.visit(main_url);
        cy.log("entering current password");
        cy.get(`[data-test-id=${ELEMENT.currentPassword}]`).type(password);
        cy.log("entering new password");
        cy.get(`[data-test-id=${ELEMENT.newPassword}]`).type(newPassword);
        cy.log("entering repeat new password");
        cy.get(`[data-test-id=${ELEMENT.repeatNewPassword}]`).type(
          shortPassword
        );
        cy.log("clicking save button");
        cy.get(`[data-test-id=${ELEMENT.saveChangesButton}]`).click();
        cy.get(".MuiFormHelperText-root").should(
          "contain",
          shortPasswordErrorMessage
        );
      }
    );
  });
});
