describe('Pruebas E2E - Billetera Virtual', () => {
  it('Debería cargar la aplicación y mostrar la navegación', () => {
    cy.visit('/');
    
    cy.contains('Inicio', { timeout: 10000 }).should('be.visible');
    cy.contains('Perfil').should('be.visible');
  });
});