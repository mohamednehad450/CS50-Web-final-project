import React, { FC, useState } from 'react'
import { updateStep } from '../../API'

import { ReactComponent as TimerIcon } from '../../icons/pomodoro.svg'

// Types
import type { Step } from '../../API'

interface StepRowProps {
    step: Step,
    onChange: (step: Step) => void
}

const StepRow: FC<StepRowProps> = ({ step, onChange }) => {
    const [{ title, checked, id }, setStep] = useState<Step>(step)
    return (
        <div className="step-container">
            <hr />
            <div className="step-row">
                <div className="row-section">
                    <span className="checkbox">
                        <input
                            checked={checked}
                            type="checkbox"
                            onChange={() => updateStep({ id, checked: !checked }).then((step) => {
                                setStep(step)
                                onChange(step)
                            })}
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