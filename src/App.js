import logo from "./logo.svg";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import TodoList from "./todos/List";

function App() {
    return (
        <div className="App">
            <TodoList />
        </div>
    );
}

export default App;
