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
            <hr />
            <div className="step-row">
                <div className="row-section">
                    <Checkbox
                        checked={checked}
                        onChange={(checked) => onChange({ id, checked })}
                    />
                    <span className={`step-title ${checked ? 'crossed' : ''}`}>{title}</span>
                </div>
            </div>
        </div>
    )
}

export default StepRow