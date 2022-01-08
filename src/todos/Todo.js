import React, { useState, useEffect } from "react";

// ** Componenets
import List from "./List";
import AddTodo from "./AddTodo";
import ListItem from "./ListItem";

// ** 3rd party components
import { Card, CardBody, Input } from "reactstrap";

// ** Style
import "../css/todo.css";

// ** Store
import { saveTodos, getTodos } from "../data/LocaleDataSource";

const Todo = () => {
    const [allTodos, setAllTodos] = useState([]);

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
        console.log("allTodosTemp", allTodosTemp);

        setAllTodos([...allTodosTemp]);
        // setAllTodos((prev) => {
        //     let removedIndex;
        //     let prevTemp = prev;
        //     console.log("prev", prev);
        //     prev.forEach((element, index) => {
        //         if (element.id === id) {
        //             removedIndex = index;
        //         }
        //     });
        //     // saveTodos(JSON.stringify(prev));
        //     return prevTemp;
        // });

        // saveTodos(JSON.stringify(allTodosTemp));
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

export default Todo;
