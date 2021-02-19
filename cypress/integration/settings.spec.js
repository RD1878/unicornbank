/// <reference types="cypress" />

import { ELEMENT } from "../../src/constants";

describe("Settings page", () => {
  it("This happens when you enter correct data", () => {
    cy.fixture("unicornTestSettings").then(
      ({
        main_url,
        password,
        newPassword,
        textCurrentPasswordField,
        textNewPasswordField,
        textRepeatPasswordField,
      }) => {
        cy.log("Settings page");
        cy.visit(main_url);
        cy.log("entering current password");
        cy.get(`[data-test-id=${ELEMENT.currentPassword}]`)
          .should("have.text", textCurrentPasswordField)
          .type(password);
        cy.log("entering new password");
        cy.get(`[data-test-id=${ELEMENT.newPassword}]`)
          .should("have.text", textNewPasswordField)
          .type(newPassword);
        cy.log("entering repeat new password");
        cy.get(`[data-test-id=${ELEMENT.repeatNewPassword}]`)
          .should("have.text", textRepeatPasswordField)
          .type(newPassword);
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
        textCurrentPasswordField,
        textNewPasswordField,
        textRepeatPasswordField,
      }) => {
        cy.log("Settings page");
        cy.visit(main_url);
        cy.log("entering current password");
        cy.get(`[data-test-id=${ELEMENT.currentPassword}]`)
          .should("have.text", textCurrentPasswordField)
          .type(shortPassword);
        cy.log("entering new password");
        cy.get(`[data-test-id=${ELEMENT.newPassword}]`)
          .should("have.text", textNewPasswordField)
          .type(newPassword);
        cy.log("entering repeat new password");
        cy.get(`[data-test-id=${ELEMENT.repeatNewPassword}]`)
          .should("have.text", textRepeatPasswordField)
          .type(newPassword);
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
      ({
        main_url,
        withoutPasswordErrorMessage,
        password,
        newPassword,
        textCurrentPasswordField,
        textNewPasswordField,
        textRepeatPasswordField,
      }) => {
        cy.log("Settings page");
        cy.visit(main_url);
        cy.log("entering current password");
        cy.get(`[data-test-id=${ELEMENT.currentPassword}]`)
          .should("have.text", textCurrentPasswordField)
          .type(password);
        cy.log("entering new password");
        cy.get(`[data-test-id=${ELEMENT.newPassword}]`).should(
          "have.text",
          textNewPasswordField
        );
        cy.log("entering repeat new password");
        cy.get(`[data-test-id=${ELEMENT.repeatNewPassword}]`)
          .should("have.text", textRepeatPasswordField)
          .type(newPassword);
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
      ({
        main_url,
        repeatPasswordErrorMessage,
        password,
        newPassword,
        textCurrentPasswordField,
        textNewPasswordField,
        textRepeatPasswordField,
      }) => {
        cy.log("Settings page");
        cy.visit(main_url);
        cy.log("entering current password");
        cy.get(`[data-test-id=${ELEMENT.currentPassword}]`)
          .should("have.text", textCurrentPasswordField)
          .type(password);
        cy.log("entering new password");
        cy.get(`[data-test-id=${ELEMENT.newPassword}]`)
          .should("have.text", textNewPasswordField)
          .type(newPassword);
        cy.log("entering repeat new password");
        cy.get(`[data-test-id=${ELEMENT.repeatNewPassword}]`).should(
          "have.text",
          textRepeatPasswordField
        );
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
        textCurrentPasswordField,
        textNewPasswordField,
        textRepeatPasswordField,
      }) => {
        cy.log("Settings page");
        cy.visit(main_url);
        cy.log("entering current password");
        cy.get(`[data-test-id=${ELEMENT.currentPassword}]`)
          .should("have.text", textCurrentPasswordField)
          .type(password);
        cy.log("entering new password");
        cy.get(`[data-test-id=${ELEMENT.newPassword}]`)
          .should("have.text", textNewPasswordField)
          .type(shortPassword);
        cy.log("entering repeat new password");
        cy.get(`[data-test-id=${ELEMENT.repeatNewPassword}]`)
          .should("have.text", textRepeatPasswordField)
          .type(newPassword);
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
        textCurrentPasswordField,
        textNewPasswordField,
        textRepeatPasswordField,
      }) => {
        cy.log("Settings page");
        cy.visit(main_url);
        cy.log("entering current password");
        cy.get(`[data-test-id=${ELEMENT.currentPassword}]`)
          .should("have.text", textCurrentPasswordField)
          .type(password);
        cy.log("entering new password");
        cy.get(`[data-test-id=${ELEMENT.newPassword}]`)
          .should("have.text", textNewPasswordField)
          .type(newPassword);
        cy.log("entering repeat new password");
        cy.get(`[data-test-id=${ELEMENT.repeatNewPassword}]`)
          .should("have.text", textRepeatPasswordField)
          .type(shortPassword);
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
