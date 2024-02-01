// cypress/integration/end_to_end_tests.spec.js

describe('End-to-End Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4200'); // Update with the correct URL of your Vue.js app
    });
  
    it('Should display the login modal correctly', () => {
  
      
      // Click the dropdown button
      cy.get('#dropdownNavbarLink').click();

      // Click the "Connexion" link
      cy.contains('Connexion').click();
  
      // Assert that the login modal is now visible
      cy.get('.signup-modal').should('be.visible');
  
      // Assert that the modal contains the correct elements
      cy.get('.signup-header').contains('Bonjour !');
      cy.get('.custom-input').should('have.length', 2); // Assert that there are 2 input fields for email and password
      cy.get('.buttons').contains('Connexion');
      cy.get('.facebook-button').contains('Continuer avec');
    });
  
    it('Should be able to close the login modal', () => {
      // Open the login modal first
      // Click the dropdown button
      cy.get('#dropdownNavbarLink').click();

      // Click the "Connexion" link
      cy.contains('Connexion').click();
  
      // Click the close button
      cy.get('.close-button').click();
  
      // Assert that the login modal is now hidden
      cy.get('.signup-modal').should('not.exist');
    });
  
    // Add more test cases as needed
  });
  