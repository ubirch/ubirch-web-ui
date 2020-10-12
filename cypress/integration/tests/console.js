/// <reference types="Cypress" />
context('console', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('#username').type('paul.lengert@ubirch.com');
        cy.get('#password').type('Paul-Ubirch1998')
        cy.get('#kc-login').click();
    })

    /*it('should init on home screen', () => {
       cy.url().should('equal', 'https://console.dev.ubirch.com/home')
    })*/// inpu hahahahaha

    it('should navigate by clicking menue items', () => {
        cy.get('ion-menu').find('ion-content').find('ion-list').contains('Home').click()
        cy.url().should('equal', 'https://console.dev.ubirch.com/home')

        cy.get('ion-menu').find('ion-content').find('ion-list').contains('Things').click()
        cy.url().should('equal', 'https://console.dev.ubirch.com/devices/list')

        cy.get('ion-menu').find('ion-content').find('ion-list').contains('Verification').click()
        cy.url().should('equal', 'https://console.dev.ubirch.com/verification/graph')

        cy.get('ion-menu').find('ion-content').find('ion-list').contains('Account Profile').click()
        cy.url().should('equal', 'https://console.dev.ubirch.com/account-profile')

        cy.get('ion-menu').find('ion-content').find('ion-list').contains('Logout').click()
        cy.url().should('equal', 'https://console.dev.ubirch.com/logout')
    })
})
