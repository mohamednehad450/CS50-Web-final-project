import React from 'react'
import { ReactComponent as TimerIcon } from '../../icons/pomodoro.svg'

import type { Step } from '../../api'

interface StepRowProps {
    step: Step,
    onChange?: (step: Step) => void
}

const StepRow = (props: StepRowProps) => {
    const { step: { title, checked }, onChange } = props
    return (
        <div className="step-container">
            <hr />
            <div className="step-row">
                <div className="row-section">
                    <span className="checkbox">
                        <input
                            checked={checked}
                            type="checkbox"
                            onChange={() => {
                                onChange && onChange({
                                    ...props.step,
                                    checked: !checked
                                })
                            }}
                        ></input>
                    </span>
                    <span className={`step-title ${checked ? 'crossed' : ''}`}>{title}</span>
                </div>
                <div className="row-section">
                    <span className="icon icon-gray"><TimerIcon /></span>
                </div>
            </div>
        </div>
    )
}

export default StepRow