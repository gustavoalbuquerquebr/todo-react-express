import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

const logger = createLogger({
  collapsed: true,
});

function reducer(state = { todos: [] }, action) {
  switch (action.type) {
    case "SET_TODOS":
      return {
        ...state,
        todos: action.todos,
      };
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos].concat([action.todo]),
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== action.id ),
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map(todo => todo._id === action.id ? { _id: todo._id, task: action.input } : todo),
      };
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;