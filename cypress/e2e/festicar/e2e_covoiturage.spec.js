// cypress/integration/end_to_end_tests.spec.js

describe('End-to-End Tests', () => {
    beforeEach(() => {
      cy.visit('/'); // Assuming your Vue.js app is served at the root URL
    });
  
    it('Should display destination title correctly', () => {
      cy.get('.title').should('contain', 'Destination');
    });
  
    it('Should interact with location input', () => {
      cy.get('.location input')
        .type('Paris')
        .should('have.value', 'Paris');
    });
  
    it('Should select vehicle type from dropdown', () => {
      cy.get('.domain select')
        .select('Car') // Assuming 'Car' is one of the options
        .should('have.value', 'Car');
    });
  
    it('Should add item to cart when clicking "Add to Cart"', () => {
      // Simulate selecting an option from dropdown first (optional)
      cy.get('.domain select').select('Car');
  
      // Click "Add to Cart" button
      cy.get('.addToCart').click();
  
      // Assert that an item is added to the cart (you need to adjust this assertion based on your application behavior)
      cy.get('.cart-item').should('exist');
    });
  
    // Add more test cases as needed
  });
  