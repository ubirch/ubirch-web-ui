/// <reference types="Cypress" />
context('login', () => {
    beforeEach(() => {
    cy.visit('/');
    })

    it('should open the login page', () => {
        cy.get('#kc-page-title').should('contain.text', 'Log In' )
    })

    it('should have the login button' , () => {
        cy.get('#kc-login').should('be.enabled', 'true');
    })

    it('should login and redirect to /home given the right credentials', () => {
        cy.get('#username').type('paul.lengert@ubirch.com');
        cy.get('#password').type('Paul-Ubirch1998')
        cy.get('#kc-login').click();
        cy.url().should('equal', 'https://console.dev.ubirch.com/home')
    })

    it('should not login given wrong credentials', () => {
        cy.get('#username').type('fail');
        cy.get('#password').type('fail')
        cy.get('#kc-login').click();
        cy.get('.kc-feedback-text').should('contain.text', 'Invalid username or password.')
    })

})
