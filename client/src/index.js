import React from 'react';
import ReactDOM from 'react-dom';

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

function TodoList(props) {

  const [todos, setTodos] = React.useState([]);

  const fetchTodos = async () => {
    const response = await fetch("/api/todos");
    const todos = await response.json();
    setTodos(todos);
  };

  React.useEffect(() => {
    fetchTodos();
  }, []);

  const handleEditSubmit = async (id, input) => {
    const updatedTodo = JSON.stringify({ task: input });
    await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: updatedTodo,
    });

    fetchTodos();
  }

  const handleDelete = async (id) => {
    const response = await fetch(`/api/todos/${id}`, { method: "DELETE" });
    const json = await response.json();
    json.success && fetchTodos();
  }

  const handleAddSubmit = (input) => {
    const newTodo = JSON.stringify({ task: input });

    fetch("/api/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: newTodo,
    });

    fetchTodos();
  }

  const todosUI = todos.map(todo => (
    <TodoItem key={todo._id} id={todo._id} task={todo.task} handleSubmit={handleEditSubmit} handleDelete={handleDelete} />
  ));

  return (
    <main>
      <h1>Todo List</h1>
      <ul>
        {todosUI}
      </ul>
      <AddTodo handleSubmit={handleAddSubmit} />
    </main>
  );
}

ReactDOM.render(<TodoList />, document.getElementById('root'));