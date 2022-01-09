import React, { useState } from "react";

import { Input, Button, Form, FormGroup } from "reactstrap";

const AddTodo = ({ handleSubmitTodo }) => {
    const [todoText, setTodoText] = useState("");

    const onChangeTodoText = (e) => {
        setTodoText(e.target.value);
    };

    const onSubmitTodo = () => {
        handleSubmitTodo(todoText);
        setTodoText("");
    };

    return (
        <React.Fragment>
            <Form
                className="todo-input-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmitTodo();
                }}
            >
                <FormGroup className="d-flex">
                    <Button type="submit">Add</Button>
                    <Input
                        className="todo-input"
                        id="todo-input"
                        type="textarea"
                        placeholder="What needs to be done ?"
                        value={todoText}
                        onChange={onChangeTodoText}
                    />
                </FormGroup>
            </Form>
        </React.Fragment>
    );
};

export default AddTodo;
