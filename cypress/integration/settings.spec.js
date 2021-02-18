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
});
