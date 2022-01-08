export const saveTodos = (todos) => {
    localStorage.setItem("userTodos", todos);
};
export const getTodos = () => {
    return localStorage.getItem("userTodos");
};
export const removeTodo = () => {
    localStorage.removeItem("userTodos");
};
