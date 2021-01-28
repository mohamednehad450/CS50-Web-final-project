import React, { useState } from 'react'
import { Todo } from '../API'
import { Button, ButtonsRow, Header, Select, SelectItem } from '../components/common'
import { PomodoroClock, PomodoroStats, usePomodoro } from '../components/Pomodoro'
import { useTodo } from '../components/TodoList'

const Pomodoro = () => {

    const todo = useTodo()
    const { reset, skip } = usePomodoro()

    // TODO: Implement pomodoro linking with Todos
    const [selected, setSelected] = useState<Todo | undefined>()

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
                            options={todo.todos.map(t => ({ ...t, label: t.title }))}
                            onChange={(o) => setSelected(o)}
                            selected={selected}
                            Header={({ close }) => (
                                <SelectItem onClick={() => { setSelected(undefined); close() }} option={{ id: "NONE", label: '- None' }} />
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