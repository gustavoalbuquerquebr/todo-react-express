import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

const logger = createLogger({
  collapsed: true,
});

const initialState = {
  todos: [],
  isEditing: {
    toggleValue: false,
    id: "",
  },
  completed: [],
};

function todosReducer(state = initialState.todos, action) {
  switch (action.type) {
    case "SET_TODOS":
      return [...action.todos];
    case "ADD_TODO":
      return [...state, action.todo];
    case "REMOVE_TODO":
      return state.filter(todo => todo._id !== action.id);
    case "UPDATE_TODO":
      return state.map(todo => todo._id === action.id ? { _id: todo._id, task: action.input } : todo);
    default:
      return state;
  }
}

function isEditingReducer(state = initialState.isEditing, action) {
  switch (action.type) {
    case "TOGGLE_EDIT":
      return { toggleValue: action.toggleValue, id: action.id };
    default:
      return state;
  }
}

function completedReducer(state = initialState.completed, action) {
  switch (action.type) {
    case "MARK_COMPLETED":
      return [...state, action.id];
    case "UNMARK_COMPLETED":
      return state.filter(id => id !== action.id);
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  todos: todosReducer,
  isEditing: isEditingReducer,
  completed: completedReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;