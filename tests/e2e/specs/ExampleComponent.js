// https://docs.cypress.io/api/introduction/api.html

const toggleSwitchSel = '[data-cy="example-component__toggle-switch"]'
const vInputSlotSel = '.v-input__slot'
const vLabelSel = '.v-label'
const toggleCountTextSel = '[data-cy="example-component__toggle-switch--toggle-count-text"]'

describe('The Search Box', {
  baseUrl: Cypress.env('BASE_URL')
}, () => {
  it('Is inactive default', () => {
    cy.visit('/')
    const toggleSwitch = cy.get(toggleSwitchSel)
    toggleSwitch.parents(vInputSlotSel).find(vLabelSel).should('contain.text', 'inactive')
  })
  it('Updates text when active', async () => {
    cy.visit('/')
    const toggleSwitch = cy.get(toggleSwitchSel)
    const vInputSlot = toggleSwitch.parents(vInputSlotSel)
    vInputSlot.click()
    vInputSlot.find('.v-label').should('have.text', 'State: active')
    cy.get(toggleCountTextSel).should('have.text', 'Toggled 1 times')
  })
})
