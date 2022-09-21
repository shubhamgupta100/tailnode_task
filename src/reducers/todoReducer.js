import {
    ALL_TODO_REQUEST, ALL_TODO_SUCCESS, ALL_TODO_FAIL, NEW_TODO_FAIL, NEW_TODO_REQUEST, 
    NEW_TODO_SUCCESS, DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS, DELETE_TODO_FAIL, RESET_TODO_REQUEST,
     RESET_TODO_SUCCESS, RESET_TODO_FAIL,ALL_COMPLETE_TODO_REQUEST, ALL_COMPLETE_TODO_SUCCESS, ALL_COMPLETE_TODO_FAIL
} from '../actions/actionType';

export const todosReducer = (state = { todos: [] }, action) => {
    switch (action.type) {
        case ALL_TODO_REQUEST:
            return {
                loading: true,
                todos: [],
            };
        case ALL_TODO_SUCCESS:
            return {
                loading: false,
                todos: action.payload,
            };
        case ALL_TODO_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const deleteTodoReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_TODO_REQUEST:
        case RESET_TODO_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_TODO_SUCCESS:
        case RESET_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: true,
            };
        case DELETE_TODO_FAIL:
        case RESET_TODO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const newTodoReducer = (state = { todos: {} }, action) => {
    switch (action.type) {
        case NEW_TODO_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_TODO_SUCCESS:
            return {
                loading: false,
                success: true,
                todos: action.payload,
            };
        case NEW_TODO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const completedTodosReducer = (state = { todos: [] }, action) => {
    switch (action.type) {
        case ALL_COMPLETE_TODO_REQUEST:
            return {
                loading: true,
                todos: [],
            };
        case ALL_COMPLETE_TODO_SUCCESS:
            return {
                loading: false,
                completeTodos: action.payload,
            };
        case ALL_COMPLETE_TODO_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

