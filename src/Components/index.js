import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createTodos, getTodos, deleteTodos, resetTodos, getCompletedTodos, updateCompletedTodos } from '../actions/todoAction';
import './index.css'

function Todo() {
    const [todoItem, setTodoItem] = useState('')
    const dispatch = useDispatch();
    const { todos } = useSelector((state) => state.todos);
    const { completeTodos } = useSelector((state) => state.completedTodos);
    const handleChange = (e) => {
        e.preventDefault();
        setTodoItem(e.target.value)
    }
    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            if (todoItem.includes('#')) {
                const indexOfHash = todoItem.indexOf('#');
                const todaData = {
                    id: 1,
                    todoItem: todoItem.slice(0, indexOfHash),
                    hashTag: todoItem.slice(indexOfHash, todoItem.length),
                }
                dispatch(createTodos(todaData));
                dispatch(getTodos())
                alert('todo added !')
            } else {
                alert('Kindly include type oftodo  task including "#" keyword')
            }

        }
    };
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(deleteTodos(e.target.value));
        dispatch(getTodos())
    }
    const handleStatusUpdate = (e) => {
        e.preventDefault();
        dispatch(updateCompletedTodos(e.target.value))
        alert('Marked Completed !')
        dispatch(getTodos())
        dispatch(getCompletedTodos())
    }
    const handleReset = () => {
        dispatch(resetTodos());
        alert('ToDos Reset done !');
        dispatch(getTodos());
        dispatch(getCompletedTodos())
    }
    useEffect(() => {
        dispatch(getTodos());
        dispatch(getCompletedTodos())
    }, [])
    return (
        <div className='todo-container'>
            <h1>ToDO App</h1>
            <div className='todo-form'>
                <input name="todo" onChange={handleChange} onKeyDown={handleKeyDown} />
            </div>
            <div className='reset_button'><button onClick={handleReset}>Reset task</button></div>
            <div className='todo-list'>
                <h1>All Task To do</h1>
                <table id="table-data">
                    <thead>
                        <tr>
                            <th> Index</th>
                            <th> Description</th>
                            <th>HashTag</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos && todos.map((item, index) => {
                                return <tr key ={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.todoItem}</td>
                                    <td>
                                        <button className='btn'>{item.hashTag}</button>
                                    </td>
                                    <td className='icons'>
                                        {/* <i className="fa fa-trash-o" > */}
                                        <button value={item.id} onClick={handleClick}>Delete</button>
                                        {/* </i> */}
                                        {/* <i className="fa fa-check-square-o" > */}
                                        <button value={item.id} onClick={handleStatusUpdate}>Mark complete</button>
                                        {/* </i> */}
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div className='todo_list-completed'>
                <h1>Completed Task</h1>
                <table id="table-data">
                    <thead>
                        <tr>
                            <th> Index</th>
                            <th> Description</th>
                            <th>HashTag</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            completeTodos && completeTodos.map((item, index) => {
                                return <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.todoItem}</td>
                                    <td>
                                        <button className='btn'>{item.hashTag}</button>
                                    </td>
                                </tr>
                            })

                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Todo
