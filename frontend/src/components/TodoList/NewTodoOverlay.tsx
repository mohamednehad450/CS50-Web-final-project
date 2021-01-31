
import React, { useState, FC } from 'react'
import { createEmptyTodo, validateTodo } from '../../API'
import { Overlay, Button, ButtonsRow, TextInput, DatePicker, IconButton, } from '../common'
import StepsInput from './StepsInput'
import TagSelect from './TagSelect'

import { ReactComponent as CancelIcon } from '../../icons/cancel-fill.svg'

import type { Tag, Todo, Step, TodoError } from '../../API'


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
    const [error, setError] = useState<TodoError>()

    const [maxDate, setMaxDate] = useState<Date | undefined>(getMaxDate(initialTodo?.steps || []))
    return (
        <Overlay>
            <div className='overlay-container-lg'>
                <div className='input-row header-margin'>
                    <TagSelect selected={tag} onChange={(tag) => { setTodo({ ...todo, tag: tag.id }); setTag(tag) }} />
                    <TextInput
                        onChange={(title) => { setTodo({ ...todo, title }); setError({ ...error, title: undefined }) }}
                        value={todo.title}
                        placeholder="New Todo"
                        className='textinput-lg'
                        errors={error?.title}
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
                        setError({ ...error, steps: undefined })
                        setTimeout(() => setMaxDate(getMaxDate(steps)), 0)
                    }}
                    steps={todo.steps || []}
                    errors={error?.steps?.map(err => err.err)}
                />
                <ButtonsRow>
                    <Button type='secondary' onClick={close}>Cancel</Button>
                    <Button
                        type='primary'
                        onClick={() => {
                            const err = validateTodo(todo)
                            if (err.isValid) {
                                submit(todo)
                                    .then(t => {
                                        onSubmit && onSubmit(t); close()
                                    })
                                    .catch(err => setError(err))
                            }
                            else {
                                setError(err.err)
                            }
                        }}
                    >
                        {initialTodo ? 'Save' : 'Add'}
                    </Button>
                </ButtonsRow>
            </div>
        </Overlay>
    )
}

export default NewTodoOverlay