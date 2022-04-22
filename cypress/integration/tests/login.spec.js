const { copyFileSync } = require('fs');

const username = Cypress.env('username');
const password = Cypress.env('password');
describe('Login', () => {
  context('unauthenticated', () => {
    it('Shows login page if visiting admin', () => {
      cy.visit(`/admin`);
      cy.get('input[name=username]').should('be.visible');
      cy.get('input[name=password]').should('be.visible');
      cy.get('button').contains('Sign In');
    });
    it('Shows login page if visiting admin/orders', () => {
      cy.visit(`/admin/orders`);
      cy.get('input[name=username]').should('be.visible');
      cy.get('input[name=password]').should('be.visible');
      cy.get('button').contains('Sign In');
    });
    it('shows login page if visiting admin/1', () => {
      cy.visit(`/admin/1`);
      cy.get('input[name=username]').should('be.visible');
      cy.get('input[name=password]').should('be.visible');
      cy.get('button').contains('Sign In').should('be.visible');
    });
  });
  context('Auth process', () => {
    it('Can log in', () => {
      cy.visit(`/admin`);
      cy.get('input[name=username]').type(username);
      cy.get('input[name=password]').type(password);
      cy.get('button').contains('Sign In').click();
      //anti-pattern en fann ekki betri leið
      cy.wait(1000);
      cy.get('h1').contains('Administration Dashboard').should('be.visible');
    });
    it('Does not log in unauthed user', () => {
      cy.visit('/admin');
      cy.get('input[name=username]').type(username);
      cy.get('input[name=password]').type('-');
      cy.get('button').contains('Sign In').click();
      cy.wait(1000);
      cy.get('h1').contains('Administration Dashboard').should('not.exist');
    });
  });
});
