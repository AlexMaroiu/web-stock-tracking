describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:3000');

    cy.get('[data-cy="search-stock"]').click();
    cy.get('[data-cy="search-stock"]').type('META{enter}');

    cy.get('#tabpanel-0 > div > div > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(1)').contains('Meta Platforms, Inc.');

    cy.get('#stock-check').check();

    cy.get('[data-cy="menu-icon"]').click();
    cy.get('[data-cy="Compare"]').click();

    cy.contains('META');

    cy.get('[data-cy="empty-list-btn"]').click();

    cy.get('[data-cy="menu-icon"]').click();
    cy.get('[data-cy="Home"]').click();

    cy.get('#stock-check').should('not.be.checked');
  })
})