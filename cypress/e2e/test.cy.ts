describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4173/profile')
    cy.contains('name')
  })
})