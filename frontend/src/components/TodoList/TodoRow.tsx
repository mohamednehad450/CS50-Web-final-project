import React, { useState } from 'react'
import { Checkbox, ColorTag, } from '../common'
import StepRow from './Step'
import { NewTodoOverlay, useTodo } from '.'
import ActionSelect from './ActionSelect'

import { ReactComponent as ExpandIcon } from '../../icons/expand.svg'
import { ReactComponent as TimerIcon } from '../../icons/pomodoro.svg'

// Types
import { Todo, } from '../../API'

interface TodoRowProps {
    todo: Todo,
    expanded: boolean,
    onClick?: (id: Todo['id']) => void,
}



const TodoRow = (props: TodoRowProps) => {
    const { todo, onClick, expanded: exp, } = props
    const { title, tag, steps, id, } = todo

    const expandable = !!steps.length
    const expanded = exp && expandable

    const stepsLeft: number = steps.length && steps.filter(step => !step.checked).length
    const checked = steps.length ? !stepsLeft : todo.checked

    const [editing, setEditing] = useState(false)

    const { updateTodo, updateStep, deleteTodo } = useTodo()


    return (
        <>
            {editing && (
                <NewTodoOverlay
                    close={() => setEditing(false)}
                    onSubmit={updateTodo}
                    initialTodo={todo}
                />
            )}
            <div className={`row-container ${expanded ? 'gray-bg' : ''}`}>
                <div onClick={() => expandable && onClick && onClick(id)} className="row">
                    <div className="row-section">
                        <Checkbox
                            disabled={expandable}
                            checked={checked}
                            onChange={(checked) => updateTodo({ id, checked, })}
                        />
                        <span className={`text-title ${checked ? 'crossed' : ''}`}>{title}</span>
                    </div>
                    <div className="row-section">
                        {expandable &&
                            <span className="text-note">
                                {stepsLeft ? `${stepsLeft} step${stepsLeft > 1 ? 's' : ''} left` : 'done'}
                            </span>
                        }
                        <ColorTag tag={tag} />
                        {expandable ?
                            <span className={`icon icon-gray ${expanded ? 'flip' : ''}`}>
                                <ExpandIcon />
                            </span> :
                            <span className={`icon icon-pomodoro`}>
                                <TimerIcon />
                            </span>
                        }
                        <ActionSelect
                            actions={[
                                { label: 'Edit', action: () => setEditing(true) },
                                { label: 'Delete', action: () => deleteTodo(todo) },
                            ]}
                            id={id}
                        />
                    </div>
                </div>
                <div className={`steps-container ${expanded ? "expanded" : ''}`}>
                    {steps?.map((step, index) => (
                        <StepRow
                            key={step.id}
                            step={step}
                            onChange={updateStep}
                        />
                    ))}
                </div>
                <hr></hr>
            </div>
        </>
    )
}


export default TodoRow