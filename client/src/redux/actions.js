export function setTodos(todos) {
  return { type: "SET_TODOS", todos };
}

export function removeTodo(id) {
  return { type: "REMOVE_TODO", id };
}

export function updateTodo(id, input) {
  return { type: "UPDATE_TODO", id, input };
}

export function addTodo(todo) {
  return { type: "ADD_TODO", todo };
}