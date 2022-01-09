import React, { useState, useEffect } from "react";

// ** Componenets
import AddTodo from "./AddTodo";
import ListItem from "./ListItem";
import FilterTodos from "./FilterTodos";

// ** 3rd party components
import { Card, CardBody, Input } from "reactstrap";

// ** Style
import "../css/todo.css";

// ** Store
import { saveTodos, getTodos } from "../data/LocaleDataSource";

const TodoList = () => {
    const [allTodos, setAllTodos] = useState([]);
    const [showActives, setShowActives] = useState(false);
    const [showCompleted, setShowCompleted] = useState(false);

    useEffect(() => {
        if (JSON.parse(getTodos())) {
            setAllTodos(JSON.parse(getTodos()));
        }
    }, []);

    useEffect(() => {
        saveTodos(JSON.stringify(allTodos));
        console.log("todo listesi değişti");
    }, [allTodos]);

    const handleSubmitTodo = (todoText) => {
        let todoId = allTodos.length === 0 ? 0 : allTodos.at(-1).id + 1;
        const newTodo = {
            id: todoId,
            checked: false,
            text: todoText
        };
        setAllTodos((prev) => [...prev, newTodo]);
    };

    const handleChangeTodoChecked = (id, checked) => {
        let allTodosTemp = allTodos;
        allTodosTemp.forEach((element, index) => {
            if (element.id === id) {
                allTodosTemp[index].checked = checked;
            }
        });
        console.log("handleChangeTodoChecked");
        setAllTodos(allTodosTemp);
        saveTodos(JSON.stringify(allTodosTemp));
    };

    const handleRemoveTodo = (id) => {
        let allTodosTemp = allTodos;
        allTodosTemp.forEach((element, index) => {
            if (element.id === id) {
                allTodosTemp.splice(index, 1);
            }
        });
        setAllTodos([...allTodosTemp]);
    };

    const handleShowActive = (status) => {
        setShowActives(status);
    };

    const handleShowCompleted = (status) => {
        setShowCompleted(status);
    };

    return (
        <div className="todo-container">
            <Card className="todo-card">
                <CardBody className="todo-card-body">
                    <AddTodo handleSubmitTodo={handleSubmitTodo} />
                    {allTodos && (showCompleted || showActives)
                        ? allTodos.map(
                              (todo) =>
                                  (showCompleted
                                      ? todo.checked
                                      : !todo.checked) && (
                                      <ListItem
                                          key={todo.id}
                                          id={todo.id}
                                          checked={todo.checked}
                                          todoText={todo.text}
                                          handleChangeTodoChecked={
                                              handleChangeTodoChecked
                                          }
                                          handleRemoveTodo={handleRemoveTodo}
                                      />
                                  )
                          )
                        : allTodos.map((todo) => (
                              <ListItem
                                  key={todo.id}
                                  id={todo.id}
                                  checked={todo.checked}
                                  todoText={todo.text}
                                  handleChangeTodoChecked={
                                      handleChangeTodoChecked
                                  }
                                  handleRemoveTodo={handleRemoveTodo}
                              />
                          ))}
                    <FilterTodos
                        handleShowActive={handleShowActive}
                        handleShowCompleted={handleShowCompleted}
                    />
                </CardBody>
            </Card>
        </div>
    );
};

export default TodoList;
