import React from 'react'
import { Header } from '../components/common'
import { PomodoroClock } from '../components/Pomodoro'

const Pomodoro = () => {
    return (
        <div className="container">
            <Header
                title="Pomodoro Timer"
            />
            <div className="center">
                <PomodoroClock />
            </div>
        </div>
    )
}

export default Pomodoro
