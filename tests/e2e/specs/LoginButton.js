// https://docs.cypress.io/api/introduction/api.html
// TODO: rename these loginButton* variables to something clearer
// TODO: move data-cy attributes to shared constants

describe('The Login Box', {
  baseUrl: Cypress.env('BASE_URL')
}, () => {
  it('Is shows default text', () => {
    cy.visit('/')
    const loginButton = cy.get('[data-cy="login-button__button--logged-out"]')
    // TODO: can this text come from the translations file?
    loginButton.should('have.text', 'Log in')
  })
  it('Updates button text on login', () => {
    cy.visit('/')
    const loginButtonLoggedOut = cy.get('[data-cy="login-button__button--logged-out"]')
    loginButtonLoggedOut.click()
    const loginButtonLoggedIn = cy.get('[data-cy="login-button__button--logged-in"]')
    loginButtonLoggedIn.should('have.text', 'someone@crossref.org')
  })
  it('Updates button text on logout', () => {
    cy.visit('/')
    const loginButtonLoggedOut = cy.get('[data-cy="login-button__button--logged-out"]')
    loginButtonLoggedOut.click()
    const loginButtonLoggedIn = cy.get('[data-cy="login-button__button--logged-in"]')
    loginButtonLoggedIn.click()
    cy.get('[data-cy="login-button__menu--logged-in"] .v-list-item').should('have.length', 1).click()
    cy.get('[data-cy="login-button__button--logged-out"]').should('have.text', 'Log in')
  })
})
