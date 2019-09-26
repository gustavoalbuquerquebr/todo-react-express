import React from "react";

function AddTodo(props) {
  const [input, setInput] = React.useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit(input);
    setInput("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={input} onChange={handleChange} />
      <input type="submit" value="Add" />
    </form>
  );
}

export default AddTodo;