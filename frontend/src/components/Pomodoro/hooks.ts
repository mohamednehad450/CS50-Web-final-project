import { createContext, useContext, useEffect, useState } from "react"


enum PomodoroMode {
    WORK = "work",
    BREAK = "break",
    LONGBREAK = "longbreak",
}

// units in milieseconds
interface PomodoroState {
    mode: PomodoroMode
    defaultTime: number
    timeLeft: number
}

interface PomodoroStats {
    round: number
    goal: number
    date: Date | string
}

// units in seconds
interface PomodoroSettings {
    [PomodoroMode.BREAK]: number
    [PomodoroMode.WORK]: number
    [PomodoroMode.LONGBREAK]: number
    autoStart: boolean
    longBreakAfter: number
}

const defaultPomodoroSettings: PomodoroSettings = {
    [PomodoroMode.BREAK]: 5 * 60,
    [PomodoroMode.LONGBREAK]: 25 * 60,
    [PomodoroMode.WORK]: 25 * 60,
    autoStart: true,
    longBreakAfter: 4,
}

const defaultPomodoroState: PomodoroState = {
    mode: PomodoroMode.WORK,
    defaultTime: defaultPomodoroSettings[PomodoroMode.WORK] * 1000,
    timeLeft: defaultPomodoroSettings[PomodoroMode.WORK] * 1000,
}

const defaultPomodoroStats: PomodoroStats = {
    round: 0,
    goal: 0,
    date: new Date()
}


interface PomodoroContext {
    state: PomodoroState
    stats: PomodoroStats
    isRunning: boolean
    start: () => void
    stop: () => void
    reset: () => void
    skip: () => void
}

const pomodoroContext = createContext<PomodoroContext>({
    state: defaultPomodoroState,
    stats: defaultPomodoroStats,
    isRunning: false,
    start: () => console.error("pomodoro not initialized"),
    stop: () => console.error("pomodoro not initialized"),
    reset: () => console.error("pomodoro not initialized"),
    skip: () => console.error("pomodoro not initialized"),
})

const usePomodoro = () => useContext(pomodoroContext)

const TICK = 1000

const useProvidePomodoro = (): PomodoroContext => {

    const [pomodoro, setPomodoro] = useState({
        state: newState(PomodoroMode.WORK, defaultPomodoroSettings),
        stats: defaultPomodoroStats,
    })

    const [timer, setTimer] = useState<any>()

    useEffect(() => {
        return () => clearInterval(timer)
    }, [timer])

    const tick = () => {
        setPomodoro((p) => {
            if (p.state.timeLeft - TICK < 0) {
                if (!defaultPomodoroSettings.autoStart) {
                    clearInterval(timer)
                    setTimer(undefined)
                }
            }
            return nextPomodoro(defaultPomodoroSettings, p)

        })
    }
    const start = () => {
        if (!timer) {
            setTimer(setInterval(tick, TICK))
        }
    }
    const stop = () => {
        if (timer) {
            clearInterval(timer)
            setTimer(undefined)
        }
    }

    const reset = () => {
        clearInterval(timer)
        setTimer(undefined)
        console.log(pomodoro)
        setPomodoro(p => ({ stats: p.stats, state: newState(p.state.mode, defaultPomodoroSettings) }))
    }

    const skip = () => {
        if (!defaultPomodoroSettings.autoStart) {
            clearInterval(timer)
            setTimer(undefined)
        }
        setPomodoro(p => {
            p.state.timeLeft = -1
            return nextPomodoro(defaultPomodoroSettings, p)
        })
    }


    return {
        ...pomodoro,
        isRunning: !!timer,
        start,
        stop,
        reset,
        skip
    }
}

const nextPomodoro = (settings: PomodoroSettings, p: { state: PomodoroState, stats: PomodoroStats }): {
    state: PomodoroState,
    stats: PomodoroStats,
} => {
    if (p.state.timeLeft - TICK < 0) {
        switch (p.state.mode) {
            case PomodoroMode.WORK:
                const stats = {
                    ...p.stats,
                    goal: p.stats.goal + 1,
                    round: p.stats.round + 1,
                }
                if (stats.round >= settings.longBreakAfter) {
                    return {
                        state: newState(PomodoroMode.LONGBREAK, settings),
                        stats,
                    }
                }
                return {
                    state: newState(PomodoroMode.BREAK, settings),
                    stats,
                }
            case PomodoroMode.BREAK:
                return {
                    state: newState(PomodoroMode.WORK, settings),
                    stats: p.stats,
                }
            case PomodoroMode.LONGBREAK:
                return {
                    state: newState(PomodoroMode.WORK, settings),
                    stats: { ...p.stats, round: 0 }
                }
        }
    }
    else {
        return {
            stats: p.stats,
            state: tickState(p.state)
        }
    }

}

function newState(mode: PomodoroMode, settings: PomodoroSettings): PomodoroState {
    return {
        mode,
        timeLeft: settings[mode] * 1000,
        defaultTime: settings[mode] * 1000,
    }
}

function tickState(state: PomodoroState) {
    return {
        ...state,
        timeLeft: state.timeLeft - TICK
    }
}


export { usePomodoro, useProvidePomodoro, pomodoroContext }
export type { PomodoroState, PomodoroMode, PomodoroSettings, PomodoroContext }