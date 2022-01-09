import React, { useState, useEffect } from "react";

// ** 3rd party components
import { Input, InputGroup, Button } from "reactstrap";

const FilterTodos = ({ handleShowActive, handleShowCompleted }) => {
    const [showActive, setShowActive] = useState(false);
    const [showCompleted, setShowCompleted] = useState(false);

    useEffect(() => {
        handleShowActive(showActive);
    }, [showActive]);

    useEffect(() => {
        handleShowCompleted(showCompleted);
    }, [showCompleted]);

    const toggleShowButtons = (showActiveButton) => {
        if (showActiveButton) {
            setShowActive(!showActive);
            setShowCompleted(false);
        } else {
            setShowCompleted(!showCompleted);
            setShowActive(false);
        }
    };

    return (
        <React.Fragment>
            <InputGroup className="filter-todos-checkbox">
                <Button
                    color="primary"
                    active={showActive}
                    onClick={() => toggleShowButtons(true)}
                >
                    Active
                </Button>
                <Button
                    color="primary"
                    active={showCompleted}
                    onClick={() => toggleShowButtons()}
                >
                    Completed
                </Button>
            </InputGroup>
        </React.Fragment>
    );
};

export default FilterTodos;
