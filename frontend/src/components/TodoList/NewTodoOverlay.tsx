
import React, { useState, FC } from 'react'
import { createEmptyTodo } from '../../API'
import { Overlay, Button, ButtonsRow, TextInput, DatePicker, IconButton, } from '../common'
import StepsInput from './StepsInput'
import TagSelect from './TagSelect'

import { ReactComponent as CancelIcon } from '../../icons/cancel-fill.svg'

import type { Tag, Todo, Step } from '../../API'


interface NewTodoOverlayProps {
    close: () => void
    submit: (todo: Partial<Todo>) => Promise<Todo>
    onSubmit?: (todo: Todo) => void
    initialTodo?: Todo
}

function getMaxDate(steps: Partial<Step>[]): Date | undefined {
    return steps.reduce<Date | undefined>((acc, { dueDate }) => {
        const date = dueDate ? new Date(dueDate) : undefined
        return (
            acc ?
                date && date.getTime() > acc.getTime() ?
                    date :
                    acc :
                date
        )
    }, undefined)
}

const NewTodoOverlay: FC<NewTodoOverlayProps> = ({ close, onSubmit, submit, initialTodo }) => {

    const [todo, setTodo] = useState<Partial<Todo>>(initialTodo || createEmptyTodo())
    const [tag, setTag] = useState<Tag>()
    const [maxDate, setMaxDate] = useState<Date | undefined>(getMaxDate(initialTodo?.steps || []))
    return (
        <Overlay>
            <div className='overlay-container-lg'>
                <div className='input-row header-margin'>
                    <TagSelect selected={tag} onChange={(tag) => { setTodo({ ...todo, tag: tag.id }); setTag(tag) }} />
                    <TextInput
                        onChange={(title) => setTodo({ ...todo, title })}
                        value={todo.title}
                        placeholder="New Todo"
                        className='textinput-lg'
                    />
                </div>
                <div className='input-row'>
                    <DatePicker
                        disabled={!!maxDate}
                        emptyPlaceholder="set a deadline (optional)"
                        date={maxDate || (todo.dueDate ? new Date(todo.dueDate) : undefined)}
                        onChange={(dueDate) => setTodo({ ...todo, dueDate })}
                    />
                    {todo.dueDate && !maxDate &&
                        <IconButton
                            onClick={() => setTodo({ ...todo, dueDate: undefined })}
                            className="icon-gray"
                            icon={<CancelIcon />}
                        />
                    }
                </div>
                <StepsInput
                    onChange={(steps) => {
                        setTodo({ ...todo, steps, })
                        setTimeout(() => setMaxDate(getMaxDate(steps)), 0)
                    }}
                    steps={todo.steps || []}
                />
                <ButtonsRow>
                    <Button type='secondary' onClick={close}>Cancel</Button>
                    <Button
                        disabled={!todo.title || !todo.steps?.reduce<boolean>((acc, { title }) => acc && !!title, true)}
                        type='primary'
                        onClick={() => submit(todo).then(t => { onSubmit && onSubmit(t); close() })}
                    >
                        {initialTodo ? 'Save' : 'Add'}
                    </Button>
                </ButtonsRow>
            </div>
        </Overlay>
    )
}

export default NewTodoOverlay