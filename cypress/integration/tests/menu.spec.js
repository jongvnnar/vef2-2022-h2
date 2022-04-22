describe('Menu', () => {
  it('should show menu item', () => {
    cy.visit('/menu');
    cy.get('.MenuItemCard_card__kdijn').should('be.visible');
    cy.get(
      ':nth-child(1) > .MenuItemCard_card__kdijn > a > :nth-child(1) > [style="box-sizing:border-box;display:inline-block;overflow:hidden;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:relative;max-width:100%"] > .MenuItemCard_image__yOcr5'
    ).click();
    cy.url().should('include', '/menu/');
  });
  it('should search', () => {
    cy.visit('/menu');
    cy.get('#search').type('Beef');
    cy.get('form > .Button_button__LjnpS').click();
    cy.url().should('include', 'search=Beef');
  });
});
