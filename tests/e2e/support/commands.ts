// from https://stackoverflow.com/questions/58593525/how-to-trigger-a-click-outside-event
Cypress.Commands.add('clickOutside', function (): Chainable<any> {
  return cy.get('body').click(0, 0) // 0,0 here are the x and y coordinates
})
