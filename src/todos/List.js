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
import Header from "./Header/Header";

const TodoList = () => {
    const [allTodos, setAllTodos] = useState([]);
    const [showActives, setShowActives] = useState(false);
    const [showCompleted, setShowCompleted] = useState(false);
    const [searchedKeyword, setSearchedKeyword] = useState("");
    const [searchedTodos, setSearchedTodos] = useState([]);

    useEffect(() => {
        if (JSON.parse(getTodos())) {
            setAllTodos(JSON.parse(getTodos()));
        }
    }, []);

    useEffect(() => {
        saveTodos(JSON.stringify(allTodos)); //saves changes with local storage
        console.log("todo listesi değişti");
    }, [allTodos]);

    // ** adds new todo
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
        setAllTodos([...allTodosTemp]);
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

    const searchTodo = (searched) => {
        let searchedTodosTemp = allTodos.filter((todo) =>
            todo.text.toLowerCase().includes(searched.toLowerCase())
        );
        setSearchedTodos(searchedTodosTemp);
    };

    const handleOnChangeSearch = (searched) => {
        setSearchedKeyword(searched);
        if (searched) {
            searchTodo(searched);
        }
    };

    return (
        <div className="todo-container">
            <Header handleOnChangeSearch={handleOnChangeSearch} />
            <Card className="todo-card">
                <CardBody className="todo-card-body">
                    <AddTodo handleSubmitTodo={handleSubmitTodo} />
                    {allTodos && searchedKeyword.length > 1
                        ? searchedTodos.map(
                              (todo) =>
                                  (showCompleted
                                      ? todo.checked
                                      : showActives
                                      ? !todo.checked
                                      : true) && (
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
                        : allTodos.map(
                              (todo) =>
                                  (showCompleted
                                      ? todo.checked
                                      : showActives
                                      ? !todo.checked
                                      : true) && (
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
                          )}
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
