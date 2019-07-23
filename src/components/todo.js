import React, { useState, useEffect } from "react";
import axios from "axios";
import { link } from "fs";
const Todo = props => {
  const [todoName, setTodoName] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    axios
      .get("https://hooks-test-project.firebaseio.com/todos.json")
      .then(result => {
        console.log(result);
        const todoData = result.data;
        const todos = [];
        for (const key in todoData) {
          todos.push({ id: key, name: todoData[key].name });
        }
        setTodoList(todos);
      });
  });

  const inputChangeHandler = e => {
    setTodoName(e.target.value);
  };

  const todoAddHandler = () => {
    setTodoList(todoList.concat(todoName));
    axios
      .post("https://hooks-test-project.firebaseio.com/todos.json", {
        name: todoName
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={todoName}
      />
      <button type="submit" onClick={todoAddHandler}>
        Add
      </button>
      <ul>
        {todoList.map((todo, index) => (
          <li key={index}>{todo.name}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Todo;
