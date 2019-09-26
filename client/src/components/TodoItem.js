import React from "react";

function TodoItem(props) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [input, setInput] = React.useState(props.task);

  const handleClick = () => {
    this.setState({
      isCompleted: !this.state.isCompleted
    });
    setIsCompleted(!isCompleted);
  }

  const handleToggle = () => {
    setIsEditing(!isEditing);
  }

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit(props.id, input);
    setIsEditing(false);
  }

  const handleDelete = () => {
    props.handleDelete(props.id);
  }

  const spanStyle = {
    textDecoration: isCompleted ? "line-through" : "none",
  };

  return (
    <li>
      {!isEditing && (
        <>
          <span style={spanStyle} onClick={handleClick}>{props.task}</span>
          <button onClick={handleToggle}>E</button>
          <button onClick={handleDelete}>X</button>
        </>
      )}
      {isEditing && (
        <form onSubmit={handleSubmit}>
          <input type="text" value={input} onChange={handleChange} />
          <input type="submit" />
        </form>
      )}
    </li>
  );
}

export default TodoItem;