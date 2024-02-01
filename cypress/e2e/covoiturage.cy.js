// cypress/integration/end_to_end_tests.spec.js

describe('End-to-End Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/covoiturage/11250'); // Assuming your Vue.js app is served at the root URL
  });

  it('Should display destination title correctly', () => {
    cy.get('.title').should('contain', 'Destination JERK OFF');
  });

  it('Should interact with location input', () => {
    cy.get('.location input')
      .type('Paris')
      .should('have.value', 'Paris');
  });

  it('Should select vehicle type from dropdown', () => {
    cy.get('.domain select')
      .select('SUV') // Assuming 'Car' is one of the options
      .should('have.value', 'SUV');
  });

  it('Should select an arret from the dropdown', () => {
    cy.get('.col-span-10').first().within(() => {
      // Interact with the select element
      cy.get('select').select('Prairie');

      // Assert that the selected value matches the expected value
      cy.get('select').should('have.value', 'Prairie');
    });
  });

  it('Should not have the counter increment when clicking on the + button (reached max)', () => {
    cy.get('.max-w-xs').first().within(() => { // Assuming '.col-span-6' is the correct selector for the container
      // Click the + button 3 times
      cy.get('#increment-button').first().click();

      // Assert that the counter value is 1
      cy.get('#counter-input').should('have.value', '1'); // Assuming the initial value is 1 and nb places dispo is 1 (can't increment)
    });
  });

  it('Should have the counter increment when clicking on the + button (not reached max)', () => {
    cy.get('.max-w-xs').eq(1).within(() => { // Assuming '.col-span-6' is the correct selector for the container
      // Click the + button 3 times
      cy.get('#increment-button').first().click();
      cy.get('#increment-button').first().click();

      // Assert that the counter value is 3
      cy.get('#counter-input').should('have.value', '3'); // Assuming the initial value is 1 and nb places dispo is 3 (can increment)
    });
  });


  // Add more test cases as needed
});
