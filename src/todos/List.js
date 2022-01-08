import React, { useState, useEffect } from "react";

// ** Componenets
import AddTodo from "./AddTodo";
import ListItem from "./ListItem";

// ** 3rd party components
import { Card, CardBody, Input } from "reactstrap";

// ** Style
import "../css/todo.css";

// ** Store
import { saveTodos, getTodos } from "../data/LocaleDataSource";

const TodoList = () => {
    const [allTodos, setAllTodos] = useState([]);

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

    return (
        <div className="todo-container">
            <Card className="todo-card">
                <CardBody className="todo-card-body">
                    <AddTodo handleSubmitTodo={handleSubmitTodo} />
                    {allTodos &&
                        allTodos.map((todo) => {
                            return (
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
                            );
                        })}
                </CardBody>
            </Card>
        </div>
    );
};

export default TodoList;
