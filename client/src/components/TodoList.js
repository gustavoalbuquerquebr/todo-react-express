import React from "react";

import TodoItem from "./TodoItem";

function TodoList(props) {

  const handleEditSubmit = async (id, input) => {
    props.handleEditSubmit(id, input);
  };

  const handleDelete = async (id) => {
    props.handleTodoDelete(id);
  };
  console.log(props.todos.todos);
  return (
    <>
      <h1>Todo List</h1>
      <ul>
        {props.todos.map(todo => (
          <TodoItem 
            key={todo._id}
            id={todo._id}
            task={todo.task}
            handleSubmit={handleEditSubmit}
            handleDelete={handleDelete} />
        ))}
      </ul>
    </>
  );
}

export default TodoList;