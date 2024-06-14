describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    const commentArea = 'textarea[placeholder="Add a comment..."]';
    const issueComment = '[data-testid="issue-comment"]';

    // Sprint 2 ASSIGNMENT 1: MODIFY TESTS FOR COVERING COMMENTS FUNCTIONALITY: ADD/UPDATE/DELETE
    // refactored 3 operations into one method
    it.only('Should create, edit and remove a comment successfully', () => {
        const comment = 'TEST_COMMENT';
        const editedComment = 'TEST_COMMENT_EDITED';

        // Add a comment
        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...').click();
            cy.get(commentArea).type(comment);
            cy.contains('button', 'Save').click().should('not.exist');
            cy.contains('Add a comment...').should('exist');
            cy.get(issueComment).should('contain', comment);
        });

        // Edit the comment
        getIssueDetailsModal().within(() => {
            cy.get(issueComment)
                .first()
                .contains('Edit')
                .click()
                .should('not.exist');
            cy.get('textarea[placeholder="Add a comment..."]')
                .clear()
                .type(editedComment);
            cy.contains('button', 'Save').click().should('not.exist');
            cy.get(issueComment)
                .should('contain', 'Edit')
                .and('contain', editedComment);
        });

        // Remove the comment
        getIssueDetailsModal()
            .find(issueComment)
            .contains('Delete')
            .click();

        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete comment')
            .click()
            .should('not.exist');

        cy.get(issueComment)
            .should('contain', 'An old silent pond...');
    });
});
