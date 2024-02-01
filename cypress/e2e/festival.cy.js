// cypress/integration/festival_view.spec.js

describe('Festival View', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/festival/11250'); // Assuming '/festival/123' is the URL to view a specific festival
    });

    it('Should display festival details correctly', () => {
        // Assert festival name
        cy.get('.festival-name').should('have.text', 'JERK OFF');

        // Assert festival dates
        cy.get('.festival-details').contains('Date ').should('contain', '13 Sep - 23 Sep');

        // Assert festival location
        cy.get('.festival-details').contains('Lieu ').should('contain', 'PARIS 01, Paris');

        // Assert festival domain
        cy.get('.festival-details').contains('Domaine').should('contain', 'Pluridisciplinaire Spectacle vivant');

        // Click the "J'y vais" button
        cy.get('.attend-button').click();

        // Check if the current url is http://localhost:4200/covoiturage/11250
        cy.url().should('include', '/covoiturage/11250');
        
    });

    it('Should display related festivals correctly', () => {
        // Assert that there are at least 4 related festivals displayed
        cy.get('.grid').find('a').should('have.length.gte', 4);

        // Assert each related festival card contains festival name, dates, and location
        cy.get('.grid a').each(($el) => {
            cy.wrap($el).within(() => {
                cy.get('h3').should('be.visible');
                cy.get('h3').should('have.css', 'color', 'rgb(255, 255, 255)'); // Assert color is white
                cy.get('.text-gray-300').should('be.visible');
            });
        });
    });

    // Add more test cases as needed
});
