// cypress/integration/todolist.spec.ts

describe('ToDo List Component', () => {
  beforeEach(() => {
    cy.visit('/'); // Adjust the URL if needed
  });

  it('should display the ToDo list with correct initial data', () => {
    cy.get('.ant-table-row').should('have.length', 10); // Check if there are 20 ToDo items initially
  });

  it('should allow editing a ToDo item', () => {
    cy.get('.editable-row-operations a:contains("Edit")').first().click(); // Click on the Edit button of the first item
    cy.get('.editable-row input').type('{selectall}').type('Updated ToDo'); // Type and update the ToDo item
    cy.get('.editable-row-operations a:contains("Save")').click(); // Click on the Save button
    cy.contains('.ant-table-cell', 'Updated ToDo').should('exist'); // Check if the ToDo item is updated
  });

  it('should allow canceling editing of a ToDo item', () => {
    cy.get('.editable-row-operations a:contains("edit")').first().click(); // Click on the Edit button of the first item
    cy.get('.editable-row input').type('{selectall}').type('Updated ToDo'); // Type and update the ToDo item
    cy.get('.editable-row-operations a:contains("Cancel")').click(); // Click on the Cancel button
    cy.contains('.ant-table-cell', 'Updated ToDo').should('not.exist'); // Check if the ToDo item is not updated
  });

  it('should allow deleting a ToDo item', () => {
    cy.get('.ant-table-row').should('have.length', 20); // Check if there are 20 ToDo items initially
    cy.get('.editable-row-operations a:contains("Delete")').first().click(); // Click on the Delete button of the first item
    cy.get('.ant-popconfirm-confirm').click(); // Confirm deletion
    cy.get('.ant-table-row').should('have.length', 19); // Check if the ToDo item is deleted
  });
});
