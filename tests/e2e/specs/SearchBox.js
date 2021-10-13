// https://docs.cypress.io/api/introduction/api.html

describe('The Search Box', {
  baseUrl: Cypress.env('BASE_URL')
}, () => {
  it('Is collapsed by default', () => {
    cy.visit('/')
    const searchBoxInput = cy.get('[data-cy="search-box__input"]')
    const searchBoxInputControl = searchBoxInput.parents('.v-input__control')
    searchBoxInputControl.should('have.css', 'width', '45px')
  })
  it('Is expanded on click', () => {
    cy.visit('/')
    const searchBoxInput = cy.get('[data-cy="search-box__input"]')
    const searchBoxInputControl = searchBoxInput.parents('.v-input__control')
    searchBoxInputControl.click().should('have.css', 'width', '200px')
  })
  it('Is focussed on click', () => {
    cy.visit('/')
    const searchBoxInput = cy.get('[data-cy="search-box__input"]')
    const searchBoxInputControl = searchBoxInput.parents('.v-input__control')
    searchBoxInputControl.click()
    searchBoxInputControl.find('input').should('have.focus')
  })
  it('It collapses on click outside', () => {
    cy.visit('/')
    const searchBoxInput = cy.get('[data-cy="search-box__input"]')
    const searchBoxInputControl = searchBoxInput.parents('.v-input__control')
    searchBoxInputControl.click().should('have.css', 'width', '200px')
    const body = cy.get('body')
    body.click(0, 0).wait(500)
    // have to search for the target element again - possibly because it's been re-rendered and thus is
    // a new element
    cy.get('[data-cy="search-box__input"]').parents('.v-input__control').should('have.css', 'width', '45px')
  })
  it('Has the search icon', () => {
    cy.visit('/')
    const searchBoxInput = cy.get('[data-cy="search-box__input"]')
    const searchBoxInputControl = searchBoxInput.parents('.v-input__control')
    searchBoxInputControl.find('.v-input__prepend-inner i.mdi-magnify').should('be.visible')
  })
})
