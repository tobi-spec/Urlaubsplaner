describe('e2e tests', () => {
  it('login in', () => {
    cy.visit('localhost:3000/login')
    cy.contains('Holiday Handler')
    cy.contains('Login')
    cy.contains('Username')
    cy.contains('Password')
  })
})
