// cypress/integration/end_to_end_tests.spec.js

describe('End-to-End Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200'); // Update with the correct URL of your Vue.js app
    });

    it('Should display the login modal correctly', () => {


        // Click the dropdown button
        cy.get('#dropdownNavbarLink').click();

        // Click the "Connexion" link
        cy.contains('Inscription').click();

        // Assert that the login modal is now visible
        cy.get('.signup-modal').should('be.visible');

        // Assert that the modal contains the correct elements
        cy.get('.signup-header').contains('Inscrivez vous à Festicar');
        cy.get('.custom-input').should('have.length', 5); // Assert that there are 2 input fields for email and password
        cy.get('.buttons').contains('S\'inscrire');
        cy.get('.facebook-button').contains('Continuer avec');
    });

    it('Should be able to close the signup modal', () => {
        // Click the dropdown button
        cy.get('#dropdownNavbarLink').click();

        // Click the "S'inscrire" link
        cy.contains("Inscription").click();

        // Click the close button
        cy.get('.close-button').click();

        // Assert that the signup modal is now hidden
        cy.get('.signup-modal').should('not.exist');
    });

    // Add more test cases as needed
});
