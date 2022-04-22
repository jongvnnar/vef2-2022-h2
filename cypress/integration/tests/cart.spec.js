const URL = "http://localhost:3001";
// const URL = "https://vef2-2022-h2.vercel.app"

describe('Cart', () => {
  it('should update cart label in header when added to cart', () => {
    cy.clearLocalStorage();

    cy.visit(`/menu/1`);

    cy.get('.Header_cartStatus__jTYjK').should('not.exist');

    cy.contains('Add to Cart').click().wait(500);

    cy.get('.Header_cartStatus__jTYjK').should('exist');
    cy.get('.Header_cartStatus__jTYjK > p').contains('1');
  });

  it('should update cart label in header when added to cart from item card', () => {
    cy.clearLocalStorage();

    cy.visit(`${URL}/menu/`);

    cy.get('.Header_cartStatus__jTYjK').should('not.exist');

    cy.contains('Add to Cart').click().first().wait(500);

    cy.get('.Header_cartStatus__jTYjK').should('exist');
    cy.get('.Header_cartStatus__jTYjK > p').contains('1');
  });

  it('keeps cart state between pages and increments it', () => {
    cy.clearLocalStorage();

    cy.visit(`${URL}/menu/1`);

    cy.get('.Header_cartStatus__jTYjK').should('not.exist');

    cy.contains('Add to Cart').click().wait(500);

    cy.get('.Header_cartStatus__jTYjK').should('exist');
    cy.get('.Header_cartStatus__jTYjK > p').contains('1');

    cy.visit(`${URL}/menu/2`);

    cy.get('.Header_cartStatus__jTYjK').should('exist');
    cy.get('.Header_cartStatus__jTYjK > p').contains('1');

    cy.contains('Add to Cart').click().wait(500);

    cy.get('.Header_cartStatus__jTYjK').should('exist');
    cy.get('.Header_cartStatus__jTYjK > p').contains('2');
  });

  it('lists all cart items in cart page can change quantity', () => {
    cy.clearLocalStorage();

    cy.visit(`${URL}/menu/1`);

    cy.get('.Header_cartStatus__jTYjK').should('not.exist');

    cy.contains('Add to Cart').click().wait(500);

    cy.get('.Header_cartStatus__jTYjK').should('exist');
    cy.get('.Header_cartStatus__jTYjK > p').contains('1');

    cy.visit(`${URL}/menu/2`);

    cy.get('.Header_cartStatus__jTYjK').should('exist');

    cy.get('input').type(2);
    cy.contains('Add to Cart').click().wait(500);

    cy.get('.Header_cartStatus__jTYjK').should('exist');
    cy.get('.Header_cartStatus__jTYjK > p').contains('2');

    cy.visit(`${URL}/cart`);

    cy.get(':nth-child(4) > :nth-child(4) > .CartLineDetails_quantity__lKnm1 > p').should('have.text', '1');
    cy.get(':nth-child(5) > :nth-child(4) > .CartLineDetails_quantity__lKnm1 > p').should('have.text', '12');

    cy.get(':nth-child(4) > :nth-child(4) > .CartLineDetails_quantity__lKnm1 > :nth-child(3)').click().wait(500);

    cy.get(':nth-child(4) > :nth-child(4) > .CartLineDetails_quantity__lKnm1 > p').should('have.text', '2');

    cy.visit(URL);
  });
})
