// purchase.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="cypress" />

context('Purchase Test', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Add items to cart and purchase it', () => {

    cy.get('[data-cy=add-to-cart-2]').click();
    cy.get('[data-cy=add-to-cart-3]').click();

    cy.get('[data-cy=badge-count]').should('have.text', '2');
    cy.get('[data-cy=cart-button]').click();
    cy.get('[data-cy=purchase-button]').click();
    cy.get('[data-cy=badge-count]').should('have.text', '0');

  })

})
