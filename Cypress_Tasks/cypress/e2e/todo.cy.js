//Crear una tarea
describe('Gestión de tareas - Crear una tarea', () => {
  const baseUrl = 'https://todomvc.com/examples/react/#/';

  it('Debe permitir crear una tarea', () => {
    cy.visit(baseUrl); // Visita la página web
    cy.get('.new-todo') // Selecciona el campo de entrada de texto
      .type('Mi primera tarea{enter}'); // Escribe la tarea y presiona Enter
    cy.get('.todo-list li') // Verifica que se añadió la tarea
      .should('have.length', 1)
      .and('contain', 'Mi primera tarea');
  });
});

//Marcar una tarea como completada
it('Debe permitir marcar una tarea como completada', () => {
  cy.visit(baseUrl);
  cy.get('.new-todo').type('Tarea completada{enter}');
  cy.get('.todo-list li .toggle') // Botón de marcar tarea
    .click();
  cy.get('.todo-list li') // Verifica que la tarea está completada
    .should('have.class', 'completed');
});

//Desmarcar una tarea completada
it('Debe permitir desmarcar una tarea completada', () => {
  cy.visit(baseUrl);
  cy.get('.new-todo').type('Tarea desmarcada{enter}');
  cy.get('.todo-list li .toggle').click(); // Marca como completada
  cy.get('.todo-list li .toggle').click(); // Desmarca la tarea
  cy.get('.todo-list li').should('not.have.class', 'completed'); // Verifica
});

//Editar una tarea
it('Debe permitir editar una tarea', () => {
  cy.visit(baseUrl);
  cy.get('.new-todo').type('Tarea para editar{enter}');
  cy.get('.todo-list li label').dblclick(); // Doble clic para editar
  cy.get('.todo-list li .edit')
    .clear() // Limpia el campo de texto
    .type('Tarea editada{enter}'); // Escribe el nuevo texto
  cy.get('.todo-list li').should('contain', 'Tarea editada'); // Verifica
});

//Borrar una tarea
it('Debe permitir borrar una tarea', () => {
  cy.visit(baseUrl);
  cy.get('.new-todo').type('Tarea para borrar{enter}');
  cy.get('.todo-list li .destroy') // Botón de borrar tarea
    .invoke('show') // Muestra el botón oculto
    .click();
  cy.get('.todo-list li').should('have.length', 0); // Verifica que no hay tareas
});

//Filtrar tareas
it('Debe permitir filtrar tareas por estado', () => {
  cy.visit(baseUrl);
  cy.get('.new-todo').type('Tarea activa{enter}');
  cy.get('.new-todo').type('Tarea completada{enter}');
  cy.get('.todo-list li .toggle').last().click(); // Marca la última como completada
  cy.contains('Completed').click(); // Filtra por completadas
  cy.get('.todo-list li').should('have.length', 1).and('contain', 'Tarea completada');
  cy.contains('Active').click(); // Filtra por activas
  cy.get('.todo-list li').should('have.length', 1).and('contain', 'Tarea activa');
  cy.contains('All').click(); // Muestra todas
  cy.get('.todo-list li').should('have.length', 2);
});
