import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleComplete, deleteTodo, setFilter } from "./todoSlice";

const Todo = () => {
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");
  const todos = useSelector((state) => state.todos.todos);
  const filter = useSelector((state) => state.todos.filter);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo({ text, deadline }));
      setText("");
      setDeadline("");
    }
  };

  const getDeadlineColor = (deadline) => {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - currentDate;
    const oneDay = 24 * 60 * 60 * 1000;
    if (timeDiff < 0) return "red";
    else if (timeDiff > oneDay) return "green";
    else return "orange";
  };

  const getTodosToShow = () => {
    if (filter === "completed") return todos.filter((todo) => todo.completed);
    if (filter === "active") return todos.filter((todo) => !todo.completed);
    return todos;
  };

  const groupByDate = (todos) => {
    return todos.reduce((acc, todo) => {
      const date = new Date(todo.deadline).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(todo);
      return acc;
    }, {});
  };

  const groupedTodos = groupByDate(getTodosToShow());

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.heading}>My Todo List</h1>

        <div style={styles.form}>
          <input
            type="text"
            placeholder="New task"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={styles.input}
          />
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleAddTodo} style={{ ...styles.button, backgroundColor: "#4caf50" }}>
            Add Task
          </button>
        </div>

        <div style={styles.filters}>
          <button onClick={() => dispatch(setFilter("all"))} style={{ ...styles.button, backgroundColor: "#2196f3" }}>
            All
          </button>
          <button onClick={() => dispatch(setFilter("active"))} style={{ ...styles.button, backgroundColor: "#ff9800" }}>
            Active
          </button>
          <button onClick={() => dispatch(setFilter("completed"))} style={{ ...styles.button, backgroundColor: "#9c27b0" }}>
            Completed
          </button>
        </div>

        <div style={styles.todoList}>
          {Object.entries(groupedTodos).map(([date, todos]) => (
            <div key={date} style={styles.dateGroup}>
              <h3>{date}</h3>
              <ul style={styles.ul}>
                {todos.map((todo) => (
                  <li key={todo.id} style={styles.li}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => dispatch(toggleComplete(todo.id))}
                    />
                    <span
                      style={{
                        textDecoration: todo.completed ? "line-through" : "none",
                        marginLeft: "8px",
                      }}
                    >
                      {todo.text}
                    </span>
                    {!todo.completed && todo.deadline && (
                      <span style={{ color: getDeadlineColor(todo.deadline), marginLeft: "10px" }}>
                        {new Date(todo.deadline).toLocaleString()}
                      </span>
                    )}
                    {todo.completed && todo.completedDate && (
                      <span style={{ color: "gray", marginLeft: "10px" }}>
                        Completed on: {new Date(todo.completedDate).toLocaleString()}
                      </span>
                    )}
                    <button
                      onClick={() => dispatch(deleteTodo(todo.id))}
                      style={{ ...styles.button, backgroundColor: "#f44336", marginLeft: "10px" }}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: "#e0f7fa",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "30px",
  },
  container: {
    width: "100%",
    maxWidth: "600px",
    padding: "20px",
    color: "#003366",
  },
  heading: {
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  filters: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    justifyContent: "center",
  },
  todoList: {
    marginTop: "20px",
  },
  dateGroup: {
    marginBottom: "20px",
  },
  ul: {
    listStyle: "none",
    paddingLeft: 0,
  },
  li: {
    backgroundColor: "#ffffff",
    padding: "10px",
    marginBottom: "8px",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
};

export default Todo;
