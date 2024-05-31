describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });


  /*
  Assert the visibility of the issue detail view modal (this step can also be added to the beforeEach block).
  Delete the issue by clicking the delete button and confirming the deletion.
  Assert that the deletion confirmation dialogue is not visible.
  Assert that the issue is deleted and no longer displayed on the Jira board.
  */
  it("Should delete issue successfully and validate no confirmation left", () => {
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('[data-testid="modal:confirm"]').within(() => {
      cy.get("button").contains("Delete issue").should("be.visible").click();
      cy.get('[data-testid="modal:confirm"]').should("not.exist");
      cy.get('[data-testid="modal:issue-details"]').should("not.exist");
    });
  });


  it.only("Should cancel deletion process successfully and validate", () => {
    let firstTitle = cy.get('[placeholder="Short summary"]');
    //console.log(title);

    // Click the Delete Issue button
    cy.get('[data-testid="icon:trash"]').click();

    // Cancel the deletion in the confirmation pop-up.
    cy.get('[data-testid="modal:confirm"]').within(() => {
      cy.contains("button", "Cancel").should("be.visible").click();
    });

    // Assert that the deletion confirmation dialogue is not visible.
    cy.get('[data-testid="modal:confirm"]').should("not.exist");

    // Assert that the issue is not deleted and is still displayed on the Jira board.
    cy.get('[data-testid="modal:issue-details"]').should("be.visible")
    /*
    .within(() => {
      cy.get('[placeholder="Short summary"]').should(title);
    });
    */

    // Close the issue detail modal
    cy.get('[data-testid="icon:close"]').first().should("be.visible").click();

    // Assert that the issue is still displayed on the Jira board
    //cy.get('[data-testid="board-list:backlog"]').should("be.visible");
    cy.get('[data-testid="board-list:backlog"]')
      .should('be.visible')
      /*
      .within(() => {
        // Assert that this list contains 5 issues
        cy.get('[data-testid="list-issue"]')
          .first()
          .find('p')
          .contains(firstTitle)
      });
      */

    cy.get('[data-testid="list-issue"]').first().should("be.visible");
  });

});
