import React, { FC, useState } from 'react'
import { ReactComponent as AddIcon } from '../icons/add-outline.svg'
import { TodoRow, NewTodoOverlay, useTodo } from '../components/TodoList'
import { Header } from '../components/common'

import type { Todo, } from '../API'


const TodoList: FC = () => {

    const { todos, addNewTodo } = useTodo()

    const [expanded, setExpanded] = useState<Todo['id']>('');
    const todosLeft = todos.filter(t => !t.checked).length
    const [newOverlay, setNewOverlay] = useState(false)

    return (
        <div className="container">
            {newOverlay &&
                <NewTodoOverlay
                    submit={addNewTodo}
                    done={() => setNewOverlay(false)}
                />
            }
            <Header
                title="Todo List"
                subtitle={todos.length ?
                    todosLeft ?
                        `${todosLeft} todo${todosLeft > 1 ? "s" : ''} left` :
                        'all done' :
                    'no current todos'
                }
                actions={
                    <span className="header-actions-icon">
                        <AddIcon onClick={() => { setNewOverlay(true); setExpanded('') }} />
                    </span>
                }
            />
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
        </div>
    )
}

export default TodoList