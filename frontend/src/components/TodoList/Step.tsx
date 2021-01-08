import React, { FC, useState } from 'react'
import { updateStep, useAuth } from '../../API'

import { ReactComponent as TimerIcon } from '../../icons/pomodoro.svg'

// Types
import type { Step } from '../../API'
import { Checkbox } from '../common'

interface StepRowProps {
    step: Step,
    onChange: (step: Step) => void
}

const StepRow: FC<StepRowProps> = ({ step, onChange }) => {
    const [{ title, checked, id }, setStep] = useState<Step>(step)
    const auth = useAuth()
    return (
        <div className="step-container">
            <hr />
            <div className="step-row">
                <div className="row-section">
                    <Checkbox
                        checked={checked}
                        onChange={(checked) => updateStep({ id, checked }, auth).then((step) => {
                            if (step) {
                                setStep(step)
                                onChange(step)
                            }
                        })}
                    />
                    <span className={`step-title ${checked ? 'crossed' : ''}`}>{title}</span>
                </div>
                <div className="row-section">
                    <span className="icon icon-sm icon-pomodoro"><TimerIcon /></span>
                </div>
            </div>
        </div>
    )
}

export default StepRow