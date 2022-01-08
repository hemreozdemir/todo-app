import React, { useState } from "react";
import { Input, FormGroup, Form, Button } from "reactstrap";

const ListItem = ({
    id,
    checked,
    todoText,
    handleChangeTodoChecked,
    handleRemoveTodo
}) => {
    const [todoChecked, setTodoChecked] = useState(checked);
    const onChangeTodoChecked = (e) => {
        setTodoChecked(e.target.checked);
        handleChangeTodoChecked(id, e.target.checked);
    };

    const onRemoveTodo = (id) => {
        handleRemoveTodo(id);
    };

    return (
        <React.Fragment>
            <Form>
                <FormGroup className="d-flex align-items-center">
                    <Input
                        className="todo-checkbox"
                        type="checkbox"
                        onChange={onChangeTodoChecked}
                        checked={todoChecked}
                    />

                    <Input
                        className="todo-read-input"
                        id="todo-read-input"
                        type="textarea"
                        readOnly
                        value={todoText}
                    />

                    <Button
                        type="button"
                        className="remove-todo-button"
                        color="danger"
                        onClick={() => onRemoveTodo(id)}
                    >
                        Remove
                    </Button>
                </FormGroup>
            </Form>
        </React.Fragment>
    );
};

export default ListItem;
