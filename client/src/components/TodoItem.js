import React from "react";
import { connect } from "react-redux";
import { toggleEdit, toggleCompleted } from "../redux/actions";

// NOTE: Redux was made to control isEditing and isCompleted only for demonstration proposals. Usually, local states (states that aren't used by more the one component) are stored in the React state instead of Redux's.

function TodoItem(props) {
  const [input, setInput] = React.useState(props.task);
  const isCompleted = props.completed.includes(props.id);

  const handleClick = () => {
    props.dispatch(toggleCompleted(isCompleted, props.id));
  }

  const handleToggle = () => {
    props.dispatch(toggleEdit(true, props.id));
  }

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit(props.id, input);
    props.dispatch(toggleEdit(false, ""));
  }

  const handleDelete = () => {
    props.handleDelete(props.id);
  }

  const spanStyle = {
    textDecoration: isCompleted ? "line-through" : "none",
  };
  
  return (
    <li>
      {(props.id !== props.isEditing.id || !props.isEditing) && (
        <>
          <span style={spanStyle} onClick={handleClick}>{props.task}</span>
          <button onClick={handleToggle}>E</button>
          <button onClick={handleDelete}>X</button>
        </>
      )}
      {props.id === props.isEditing.id && props.isEditing && (
        <form onSubmit={handleSubmit}>
          <input type="text" value={input} onChange={handleChange} />
          <input type="submit" />
        </form>
      )}
    </li>
  );
}

const mapStateToProps = (state, props) => ({ isEditing: state.isEditing, completed: state.completed });

const connectedTodoItem = connect(mapStateToProps)(TodoItem);

export default connectedTodoItem;