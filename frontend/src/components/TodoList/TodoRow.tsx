import React, { useState } from 'react'
import { ColorTag } from '../common'
import StepRow from './Step'
import { updateTodo, useAuth } from '../../API'

import { ReactComponent as ExpandIcon } from '../../icons/expand.svg'
import { ReactComponent as TimerIcon } from '../../icons/pomodoro.svg'

// Types
import { Todo, Step, } from '../../API'

interface TodoRowProps {
    todo: Todo,
    expanded: boolean,
    onClick?: (id: Step['id']) => void,
}

const TodoRow = (props: TodoRowProps) => {
    const { todo, onClick, expanded: exp } = props
    const [{ title, tag, steps, id, checked, }, setTodo] = useState<Todo>(todo)

    const expandable = !!steps.length
    const expanded = exp && expandable
    const stepsLeft: number = steps.length && steps.filter(step => !step.checked).length

    const auth = useAuth()

    return (
        <>
            <hr></hr>
            <div className={`row-container ${expanded ? 'gray-bg' : ''}`}>
                <div onClick={() => expandable && onClick && onClick(id)} className="row">
                    <div className="row-section">
                        <span className="checkbox">
                            <input
                                disabled={expandable}
                                checked={checked}
                                type="checkbox"
                                onChange={() => updateTodo({ id, checked: !checked }, auth).then(t => t && setTodo(t))}
                            ></input>
                        </span>
                        <span className={`text-title ${checked ? 'crossed' : ''}`}>{title}</span>
                    </div>
                    <div className="row-section">
                        {expandable &&
                            <span className="text-note">
                                {stepsLeft ? `${stepsLeft} step${stepsLeft > 1 ? 's' : ''} left` : 'done'}
                            </span>
                        }
                        <ColorTag tag={tag} />
                        <span className={`icon icon-gray ${expanded ? 'flip' : ''}`}>{expandable ? <ExpandIcon /> : <TimerIcon />}</span>
                    </div>
                </div>
                <div className={`steps-container ${expanded ? "expanded" : ''}`}>
                    {steps?.map((step, index) => (
                        <StepRow
                            key={step.id}
                            step={step}
                            onChange={(step) => {
                                steps[index] = step
                                setTodo({
                                    ...todo,
                                    checked: steps.reduce((acc, { checked }) => acc && checked, steps[0].checked)
                                })
                            }}
                        />))}
                </div>
            </div>
        </>
    )
}


export default TodoRow