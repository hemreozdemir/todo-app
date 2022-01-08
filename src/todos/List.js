import React, { useEffect } from "react";

import ListItem from "./ListItem";

const List = ({ allTodos, handleChangeTodoChecked, handleRemoveTodo }) => {
    useEffect(() => {
        console.log("1234567890*");
    }, [allTodos]);
    return (
        <React.Fragment>
            {allTodos &&
                allTodos.map((todo) => {
                    return (
                        <ListItem
                            key={todo.id}
                            id={todo.id}
                            checked={todo.checked}
                            todoText={todo.text}
                            handleChangeTodoChecked={handleChangeTodoChecked}
                            handleRemoveTodo={handleRemoveTodo}
                        />
                    );
                })}
        </React.Fragment>
    );
};

export default List;
