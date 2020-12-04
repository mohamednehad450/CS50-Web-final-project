import React from 'react'
import { ReactComponent as ExpandIcon } from '../../icons/expand.svg'
import { ReactComponent as TimerIcon } from '../../icons/pomodoro.svg'
import { ReactComponent as Circle } from '../../icons/circle.svg'
import { ReactComponent as CircleOutline } from '../../icons/circle-outline.svg'

import StepRow from './Step'

// Types
import { Todo, Step } from '../../api'

interface TodoRowProps {
    todo: Todo,
    expanded: boolean,
    onClick?: (id: number) => void,
    onChange?: (todo: Todo) => void,
}

const TodoRow = (props: TodoRowProps) => {
    const { todo, onClick, expanded: exp, onChange } = props
    const { title, colorTag, steps, id, checked, } = todo

    const expandable = !!steps.length
    const expanded = exp && expandable
    const stepsLeft: number = steps.length && steps.filter(step => !step.checked).length
    return (
        <>
            <hr></hr>
            <div className={`row-container ${expanded ? 'gray-bg' : ''}`}>
                <div onClick={() => expandable && onClick && onClick(id)} className="row">
                    <div className="row-section">
                        <span className="checkbox">
                            <input disabled={expandable} checked={checked} type="checkbox" onChange={() => onChange && onChange({ ...todo, checked: !checked })}></input>
                        </span>
                        <span className={`text-title ${checked ? 'crossed' : ''}`}>{title}</span>
                    </div>
                    <div className="row-section">
                        {expandable &&
                            <span className="text-note">
                                {stepsLeft ? `${stepsLeft} step${stepsLeft > 1 ? 's' : ''} left` : 'done'}
                            </span>
                        }
                        <span className="icon">{colorTag ? <Circle style={{ fill: colorTag }} /> : <CircleOutline />}</span>
                        <span className={`icon ${expanded ? 'flip' : ''}`}>{expandable ? <ExpandIcon /> : <TimerIcon />}</span>
                    </div>
                </div>
                <div className={`steps-container ${expanded ? "expanded" : ''}`}>
                    {steps?.map(step => (
                        <StepRow
                            key={step.id}
                            step={step}
                            onChange={(step) => {
                                onChange && onChange(updeteStep(todo, step))
                            }}
                        />))}
                </div>
            </div>
        </>
    )
}

const updeteStep = (todo: Todo, step: Step): Todo => {
    const index = todo.steps?.findIndex(({ id }) => step.id === id);
    todo.steps[index] = step
    const checked = todo.steps.reduce((acc, step) => acc && step.checked, true)
    return { ...todo, checked }
}

export default TodoRow