import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    todosReducer , deleteTodoReducer , newTodoReducer , completedTodosReducer
} from "./reducers/todoReducer";

const reducer = combineReducers({
  todos: todosReducer,
  newTodos:newTodoReducer,
  deleteTodo:deleteTodoReducer,
  completedTodos:completedTodosReducer
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
