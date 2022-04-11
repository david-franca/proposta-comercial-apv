/* eslint-disable */
describe("Navigation", () => {
  it("should navigate to the login page", () => {
    cy.visit("/login");

    cy.get('input[id="email"]').type("david@teste.com{end}");
    cy.get('input[id="password"]').type("12345678");
    cy.get("button").click();

    cy.location("pathname").should("include", "/master/dashboard");

    cy.get('[id="settings"]').click();
    cy.get('[id="chakra-modal-configuration-drawer"]').should("be.visible");
    cy.get('button[id="logout"]').click();

    cy.location("pathname").should("include", "/login");
  });
});

export {};
