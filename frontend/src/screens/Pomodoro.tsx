import React from 'react'
import { Header } from '../components/common'
import { PomodoroClock, ProvidePomodoro } from '../components/Pomodoro'

const Pomodoro = () => {
    return (
        <ProvidePomodoro>
            <Header
                title="Pomodoro Timer"
            />
            <div className="center">
                <PomodoroClock />
            </div>
        </ProvidePomodoro>
    )
}

export default Pomodoro
