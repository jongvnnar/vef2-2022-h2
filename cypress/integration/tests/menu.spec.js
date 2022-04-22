describe('Menu', () => {
  it('should show menu item', () => {
    cy.visit('/menu');
    cy.get('.MenuItemCard_card__kdijn').should('be.visible');
    cy.get('.Menu_container__6cT12 :nth-child(1)').click();
    cy.url().should('include', '/menu/');
  });
});
