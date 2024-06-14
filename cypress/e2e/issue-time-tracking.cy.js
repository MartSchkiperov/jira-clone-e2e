describe('Time tracking entering, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    const estimationField = 'input[placeholder="Number"]'
    const estimationValue = '.sc-rBLzX.irwmBe'

    // ASSIGNMENT 2: ADD AUTOMATION TESTS FOR TIME TRACKING FUNCTIONALITY
    it('Should enter, edit and delete estimation time', () => {
        const estimation = '8';
        const newEstimation = '16';

        getIssueDetailsModal().within(() => {
            // Adding estimation.
            cy.get(estimationField).clear().type(estimation).should('have.value', estimation);
            cy.get(estimationValue).should('contain', estimation);

            // Editing the estimation.
            cy.get(estimationField).clear().type(newEstimation).should('have.value', newEstimation);
            cy.get(estimationValue).should('contain', newEstimation);

            //Removing the estimation.
            cy.get(estimationField).clear().should('not.have.value')
            cy.get(estimationValue).should('not.have.value');
        });
    });
});