describe("TodoMVC - Lista de Tareas", () => {
  // Configuración inicial antes de cada prueba
  beforeEach(() => {
    // Visita la página de la aplicación
    cy.visit("https://todomvc.com/examples/react/#/");

    // Agrega dos tareas de ejemplo
    cy.get(".new-todo").type("Comprar pan{enter}");
    cy.get(".new-todo").type("Hacer ejercicio{enter}");
  });

  // Ejercicio 1: Crear una tarea
  it("Debe mostrar todas las tareas", () => {
    // Verificar que hay dos tareas en la lista
    cy.get(".todo-list li").should("have.length", 2);

    // Mostrar todas las tareas
    cy.contains("All").click();

    // Asegurarse de que las dos tareas están visibles
    cy.get(".todo-list li").should("have.length", 2);
  });

  // Ejercicio 2: Marcar una tarea como completada
  it("Debe marcar una tarea como completada", () => {
    // Marca la primera tarea como completada
    cy.get(".todo-list li").first().find(".toggle").click();

    // Verifica que la tarea completada tiene la clase "completed"
    cy.get(".todo-list li").first().should("have.class", "completed");
  });

  // Ejercicio 3: Desmarcar una tarea completada
  it("Debe desmarcar una tarea completada", () => {
    // Marca la primera tarea como completada y luego la desmarca
    cy.get(".todo-list li").first().find(".toggle").click();
    cy.get(".todo-list li").first().find(".toggle").click();

    // Verifica que la tarea ya no tiene la clase "completed"
    cy.get(".todo-list li").first().should("not.have.class", "completed");
  });

  // Ejercicio 4: Editar una tarea
  it("Debe editar el nombre de una tarea", () => {
    // Hacer doble clic en la primera tarea para editarla
    cy.get(".todo-list li").first().dblclick();

    // Editar el nombre de la tarea
    cy.get(".todo-list li")
      .first()
      .find(".edit")
      .clear()
      .type("Comprar leche{enter}");

    // Verificar que la tarea ha sido actualizada
    cy.get(".todo-list li").first().should("contain.text", "Comprar leche");
  });

  // Ejercicio 5: Borrar una tarea
  it("Debe eliminar una tarea completada", () => {
    // Marca la primera tarea como completada
    cy.get(".todo-list li").first().find(".toggle").click();

    // Filtrar las tareas completadas
    cy.contains("Completed").click();

    // Eliminar la tarea completada
    cy.get(".todo-list li").first().find(".destroy").click({ force: true });

    // Verificar que no hay tareas completadas
    cy.get(".todo-list li").should("have.length", 0);
  });

  // Ejercicio 6: Filtrar tareas
  it("Debe filtrar las tareas activas y completadas", () => {
    // Marca la primera tarea como completada
    cy.get(".todo-list li").first().find(".toggle").click();

    // Filtrar las tareas activas
    cy.contains("Active").click();

    // Verificar que hay una tarea activa
    cy.get(".todo-list li").should("have.length", 1);
    cy.get(".todo-list li").first().should("contain.text", "Hacer ejercicio");

    // Filtrar las tareas completadas
    cy.contains("Completed").click();

    // Verificar que hay una tarea completada
    cy.get(".todo-list li").should("have.length", 1);
    cy.get(".todo-list li").first().should("contain.text", "Comprar pan");
  });
});
