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
      <div className="container mt-5">
        <h1>Todo List with React Hooks</h1>
      </div>
      <div className="container mt-5">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            onChange={inputChangeHandler}
            value={todoName}
            placeholder="Todo"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <div className="input-group-append">
            <button
              className="btn btn-info"
              type="button"
              id="button-addon2"
              onClick={todoAddHandler}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <ul className="list-group">
          {todoList.map((todo, index) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={index}
            >
              <span>{todo.name}</span>
              <div className=" float-right">
                <button className="btn">
                  <i className="fas fa-pencil-alt mr-3" />
                </button>
                <button className="btn">
                  <i className="fas fa-trash-alt" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Todo;
