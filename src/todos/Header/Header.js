import React from "react";
import { Input, Card, CardBody } from "reactstrap";

const Header = ({ handleOnChangeSearch }) => {
    const onChangeSearch = (e) => {
        handleOnChangeSearch(e.target.value);
    };

    return (
        <Card className="header-card mb-4">
            <CardBody className="header-card-body d-flex">
                <h2>TODO</h2>
                <Input
                    className="search-todo"
                    placeholder="Search.."
                    onChange={onChangeSearch}
                ></Input>
            </CardBody>
        </Card>
    );
};

export default Header;
