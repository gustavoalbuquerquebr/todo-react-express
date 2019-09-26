import React from "react";

import TodoList from "./TodoList";
import AddTodo from "./AddTodo";

import { connect } from "react-redux";
import { setTodos, removeTodo, updateTodo, addTodo } from "../redux/actions";

function Container(props) {
  const fetchTodos = async () => {
    const response = await fetch("/api/todos");
    const todos = await response.json();
    return todos;
  };

  React.useEffect(() => {
    const getTodos = async () => {
      const todos = await fetchTodos();
      props.dispatch(setTodos(todos));
    }

    getTodos();
  }, []);

  const handleTodoDelete = (id) => {
    props.dispatch(async (dispatch) => {
      await fetch(`/api/todos/${id}`, { method: "DELETE" });
      dispatch(removeTodo(id));
    });
  };

  const handleEditSubmit = (id, input) => {
    props.dispatch(async (dispatch) => {
    const updatedTodo = JSON.stringify({ task: input });
    await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: updatedTodo,
    });

    dispatch(updateTodo(id, input));
    });
  }

  const handleAddSubmit = (input) => {
    props.dispatch(async (dispatch) => {

    const newTodo = JSON.stringify({ task: input });

    const response = await fetch("/api/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: newTodo,
    });
    const todo = await response.json();
    delete todo.__v;
    
    dispatch(addTodo(todo));
    });
  };
  
  return (
    <main>
      <TodoList todos={props.todos} handleTodoDelete={handleTodoDelete} handleEditSubmit={handleEditSubmit} />
      <AddTodo handleSubmit={handleAddSubmit} />
    </main>
  );
}

const mapStateToProps = (state, props) => ({ todos: state.todos });

const connectedContainer = connect(mapStateToProps)(Container);

export default connectedContainer;