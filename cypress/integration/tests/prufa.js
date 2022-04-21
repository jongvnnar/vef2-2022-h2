const URL = "http://localhost:3000";
// const URL = "https://vef2-2022-h2.vercel.app"

describe('Hompage', () => {
  it('Visits the homepage', () => {
    expect(true).to.equal(true)
    cy.visit(URL);
  });

  it('should navigate to the Menu page', () => {
    // Start from the index page
    cy.visit(URL)

    cy.get('.Header_navigationMenu__7GG9I > :nth-child(1) > div').click()

    // The new url should include "/about"
    cy.url().should('include', '/menu')

    // The new page should contain an h1 with "About page"
    cy.get('h1').contains('Menu')
  })

  it('should navigate to the Cart page', () => {
    // Start from the index page
    cy.visit(URL)

    cy.get('.Header_navigationMenu__7GG9I > :nth-child(2) > div').click()

    // The new url should include "/about"
    cy.url().should('include', '/cart')

    // The new page should contain an h1 with "Your cart"
    cy.get('h1').contains('Your cart')
  })
})
