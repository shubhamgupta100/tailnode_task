import {
    ALL_TODO_REQUEST, ALL_TODO_SUCCESS, ALL_TODO_FAIL, NEW_TODO_FAIL, NEW_TODO_REQUEST,
    NEW_TODO_SUCCESS, DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS, DELETE_TODO_FAIL, RESET_TODO_REQUEST,
    RESET_TODO_SUCCESS, RESET_TODO_FAIL, ALL_COMPLETE_TODO_REQUEST, ALL_COMPLETE_TODO_SUCCESS, ALL_COMPLETE_TODO_FAIL,
    UPDATE_TODO_REQUEST, UPDATE_TODO_SUCCESS, UPDATE_TODO_FAIL
} from './actionType';

// Get All todos
export const getTodos = () =>
    async (dispatch) => {
        try {
            dispatch({ type: ALL_TODO_REQUEST });
            let todos = JSON.parse(localStorage.getItem('todos'));
            todos.sort((itemA, itemB) => {
                return itemB.id - itemA.id
            });
            dispatch({
                type: ALL_TODO_SUCCESS,
                payload: todos,
            });
        } catch (error) {
            dispatch({
                type: ALL_TODO_FAIL,
                payload: error,
            });
        }
    };
//Get All completed Todos
export const getCompletedTodos = () =>
    async (dispatch) => {
        try {
            dispatch({ type: ALL_COMPLETE_TODO_REQUEST });
            let todos = JSON.parse(localStorage.getItem('todos_completed'));
            todos.sort((itemA, itemB) => {
                return itemB.id - itemA.id
            })
            dispatch({
                type: ALL_COMPLETE_TODO_SUCCESS,
                payload: todos,
            });
        } catch (error) {
            dispatch({
                type: ALL_COMPLETE_TODO_FAIL,
                payload: error,
            });
        }
    };
// Update Todo Status
export const updateCompletedTodos = (id) =>
    async (dispatch) => {
        try {
            dispatch({ type: UPDATE_TODO_REQUEST });
            let todos = JSON.parse(localStorage.getItem('todos'));
            const index = todos.findIndex((item) => parseInt(item.id) === parseInt(id));
            let obj={}
             for(const todo of todos) {
                    if(parseInt(todo.id) === parseInt(id)){
                        obj.todoItem=todo.todoItem;
                        obj.hashTag = todo.hashTag;
                    }
             }
            if (todos.length === 1) {
                localStorage.removeItem('todos')
            } else {
                todos.splice(index, 1);
                localStorage.setItem('todos', JSON.stringify(todos))
            }
            let localData = [];
            let completedTodos = JSON.parse(localStorage.getItem('todos_completed'));
            if (completedTodos) {
                todos.sort((itemA, itemB) => {
                    return itemB.id - itemA.id
                })
                localData = [...todos];
                localData.push({
                    id: todos[0].id + 1,
                    todoItem: obj.todoItem,
                    hashTag: obj.hashTag,
                })
                localStorage.setItem('todos_completed', JSON.stringify(localData));
            } else {
                localData.push({
                    id: 1,
                    todoItem: obj.todoItem,
                    hashTag: obj.hashTag,
                })
                localStorage.setItem('todos_completed', JSON.stringify(localData));
            }

            dispatch({
                type: UPDATE_TODO_SUCCESS,
                payload: todos,
            });
        } catch (error) {
            dispatch({
                type: UPDATE_TODO_FAIL,
                payload: error,
            });
        }
    };
// Create Todo
export const createTodos = (todoData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_TODO_REQUEST });
        let localData = [];
        let todos = JSON.parse(localStorage.getItem('todos'));
        if (todos) {
            todos.sort((itemA, itemB) => {
                return itemB.id - itemA.id
            })
            localData = [...todos];
            localData.push({
                id: todos[0].id + 1,
                todoItem: todoData.todoItem,
                hashTag: todoData.hashTag,
            })
            localStorage.setItem('todos', JSON.stringify(localData));
        } else {
            localData.push({
                id: 1,
                todoItem: todoData.todoItem,
                hashTag: todoData.hashTag,
            })
            localStorage.setItem('todos', JSON.stringify(localData));
        }
        dispatch({
            type: NEW_TODO_SUCCESS,
            payload: true,
        });
    } catch (error) {
        console.log(error)
        dispatch({
            type: NEW_TODO_FAIL,
            payload: error,
        });
    }
};


// Delete Todo
export const deleteTodos = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_TODO_REQUEST });
        const todos = JSON.parse(localStorage.getItem('todos'));
        if (todos.length === 1) {
            localStorage.removeItem('todos')
        } else {
            const index = todos.findIndex((item) => item.id === id);
            todos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(todos))
        }
        dispatch({
            type: DELETE_TODO_SUCCESS,
            payload: true,
        });
    } catch (error) {
        dispatch({
            type: DELETE_TODO_FAIL,
            payload: error
        });
    }
};


// Delete All Todos
export const resetTodos = () => async (dispatch) => {
    dispatch({ type: RESET_TODO_REQUEST });
    try {
        localStorage.removeItem('todos');
        localStorage.removeItem('todos_completed');
        dispatch({
            type: RESET_TODO_SUCCESS,
            isDeleted: true,
        })
    } catch (err) {
        dispatch({
            type: RESET_TODO_FAIL,
            isDeleted: false,
            payload: err
        })
    }

}
