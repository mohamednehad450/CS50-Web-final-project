import React, { FC } from 'react'
import { Checkbox } from '../common'

// Types
import type { Step } from '../../API'

interface StepRowProps {
    step: Step,
    onChange: (step: Partial<Step>) => void
}

const StepRow: FC<StepRowProps> = ({ step, onChange }) => {
    const { title, checked, id } = step
    return (
        <div className="step-container">
            <div className="step-row">
                <div className="row-section">
                    <span className={`step-title ${checked ? 'crossed' : ''}`}>{title}</span>
                </div>
                <Checkbox
                    checked={!!checked}
                    onChange={(b) => onChange({ id, checked: b ? new Date() : null })}
                />
            </div>
        </div>
    )
}

export default StepRow