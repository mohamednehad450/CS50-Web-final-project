import React, { FC } from 'react'
import { IconButton, TextInput, DatePicker } from '../common'

import { ReactComponent as CancelIcon } from '../../icons/cancel-fill.svg'

import type { Step } from '../../API'

interface StepInputProps {
    step: Step
    onChange: (step: Step) => void
    remove: (step: Step) => void
}

const StepInput: FC<StepInputProps> = ({ step, onChange, remove }) => {
    return (
        <>
            <hr></hr>
            <div className='input-row wrap'>
                <IconButton
                    className='icon-gray'
                    icon={<CancelIcon />}
                    onClick={() => remove(step)}
                />
                <TextInput
                    placeholder="New Step"
                    onChange={(title) => onChange({ ...step, title })}
                    value={step.title}
                />
                <DatePicker
                    date={step.dueDate}
                    onChange={(dueDate) => onChange({ ...step, dueDate })}
                    emptyPlaceholder="set a deadline (optional)"
                />
            </div>
        </>
    )
}

export default StepInput