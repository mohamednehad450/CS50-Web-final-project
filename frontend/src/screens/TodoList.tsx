import React, { FC, useEffect, useState } from 'react'
import { ReactComponent as AddIcon } from '../icons/add-outline.svg'
import { TodoRow, NewTodoOverlay } from '../components/TodoList'
import { getTodos, addNewTodo, useAuth } from '../API'

import type { Todo, Step, } from '../API'


const TodoList: FC = () => {

    const auth = useAuth()
    const [todos, setTodos] = useState<Todo[]>([])
    useEffect(() => {
        !todos.length && getTodos(auth).then(todos => todos?.length && setTodos(todos))
    }, [auth, todos])

    const [expanded, setExpanded] = useState<Step['id']>('');
    const todosLeft = todos.filter(t => !t.checked).length
    const [newOverlay, setNewOverlay] = useState(false)

    return (
        <>
            {newOverlay &&
                <NewTodoOverlay
                    onSubmit={(todo) => {
                        addNewTodo(todo, auth).then((t) => t && setTodos([t, ...todos]))
                    }}
                    close={() => setNewOverlay(false)}
                />
            }
            <div className="header">
                <div className="header-titles">
                    <span className="header-title">Todo List</span>
                    <span className="header-subtitle">{todosLeft ?
                        `${todosLeft} todo${todosLeft > 1 ? "s" : ''} left` :
                        'all done'
                    }
                    </span>
                </div>
                <div className="header-actions">
                    <span className="header-actions-icon">
                        <AddIcon onClick={() => setNewOverlay(true)} />
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
                    />)
                )}
            </div>
        </>
    )
}

export default TodoList