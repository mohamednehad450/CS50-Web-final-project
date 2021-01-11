import React, { useEffect, useState } from 'react'
import { Button, Header } from '../components/common'
import { CircularProgress } from '../components/Pomodoro'

const Pomodoro = () => {
    const [p, setP] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setP(p => (p + 0.005) % 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [p])
    return (
        <>
            <Header
                title="Pomodoro Timer"
            />
            <div className="center">
                <Button
                    onClick={() => setP(Math.random())}
                >
                    random P
                </Button>
            </div>
            <div className="center">
                <CircularProgress
                    progress={p}
                    innerText="TEST"
                />
            </div>
        </>
    )
}

export default Pomodoro
