import React, { useEffect, useState } from 'react'
import { useQuery } from '.'
import { Button, ButtonsRow, Header, Select, SelectItem } from '../components/common'
import { PomodoroClock, PomodoroStats, usePomodoro } from '../components/Pomodoro'
import { useTodo } from '../components/TodoList'

import type { Option } from '../components/common'
import type { Todo } from '../API'

interface Selected extends Todo, Option { }

const Pomodoro = () => {

    const query = useQuery()
    const { todos } = useTodo()
    const { reset, skip, start, setTodo, isRunning } = usePomodoro()
    const [selected, setSelected] = useState<Selected>()

    useEffect(() => {
        const todoId = query.get('todo')
        if (todoId) {
            const todo = todos.find((t) => t.id === todoId)
            if (todo) {
                setSelected({ ...todo, label: todo.title })
                setTodo(todo.id)
                !isRunning && start()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="container">
            <Header
                title="Pomodoro Timer"
            />
            <div className="pomodoro-container center">
                <div className="pomodoro-section">
                    <PomodoroClock />
                </div>
                <div className="pomodoro-section">
                    <div className="section-header">
                        Target:
                    </div>
                    <div className="padding">
                        <Select
                            scroll
                            options={todos.map(t => ({ ...t, label: t.title }))}
                            onChange={(o) => { setSelected(o); setTodo(o.id) }}
                            selected={selected}
                            Header={({ close }) => (
                                <SelectItem onClick={() => { setSelected(undefined); setTodo(); close() }} option={{ id: "NONE", label: '- None' }} />
                            )}
                        />
                    </div>
                    <div className="section-header">
                        Actions:
                    </div>
                    <ButtonsRow>
                        <Button type="primary" onClick={skip}>
                            Skip
                        </Button>
                        <Button onClick={reset}>
                            Reset
                        </Button>
                    </ButtonsRow>
                    <PomodoroStats />
                </div>
            </div>
        </div>
    )
}

export default Pomodoro