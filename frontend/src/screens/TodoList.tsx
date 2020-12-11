import React, { useEffect, useState } from 'react'
import { ReactComponent as AddIcon } from '../icons/add-outline.svg'
import { TodoRow } from '../components/TodoList'

import { getTodos, updateTodo, Todo } from '../api'

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([])
    useEffect(() => {
        getTodos().then(todos => setTodos(todos))
    }, [])
    const [expanded, setExpanded] = useState(-1);
    const todosLeft = todos.filter(t => !t.checked).length

    return (
        <>
            <div className="header">
                <div className="header-titles">
                    <span className="header-title">Todo List</span>
                    <span className="header-subtitle">{todosLeft ?
                        `${todosLeft} todo${todosLeft > 1 ? "s" : ''} left` :
                        'all done'}
                    </span>
                </div>
                <div className="header-actions">
                    <span className="header-actions-icon">
                        <AddIcon />
                    </span>
                </div>
            </div>
            <div className="list-container">
                {todos.map(todo => (
                    <TodoRow
                        key={todo.id}
                        todo={todo}
                        expanded={todo.id === expanded}
                        onClick={(id) => setExpanded(expanded === todo.id ? -1 : id)}
                        onChange={(todo) => {
                            updateTodo(todo).then((todos) => setTodos([...todos]))
                        }}
                    />)
                )}
            </div>
        </>
    )
}

export default TodoList