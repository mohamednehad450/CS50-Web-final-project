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
    running: boolean
    currentIntervals: number
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
    running: false,
    currentIntervals: 0
}



interface PomodoroContext {
    state: PomodoroState
    start: () => void
    stop: () => void
    reset: () => void
}

const pomodoroContext = createContext<PomodoroContext>({
    state: defaultPomodoroState,
    start: () => console.error("pomodoro not initialized"),
    stop: () => console.error("pomodoro not initialized"),
    reset: () => console.error("pomodoro not initialized"),
})

const usePomodoro = () => useContext(pomodoroContext)

const TICK = 1000

const useProvidePomodoro = (): PomodoroContext => {

    const [state, setState] = useState<PomodoroState>(nextPomodoroState(defaultPomodoroSettings))
    const [timer, setTimer] = useState<any>()

    useEffect(() => {
        return () => clearInterval(timer)
    }, [timer])

    const tick = () => {
        setState((state) => {
            if (state.timeLeft - TICK < 0) {
                if (!defaultPomodoroSettings.autoStart) {
                    clearInterval(timer)
                    setTimer(undefined)
                }
                return {
                    ...nextPomodoroState(defaultPomodoroSettings, state),
                    running: defaultPomodoroSettings.autoStart
                }
            }
            else {
                return ({ ...state, timeLeft: state.timeLeft - TICK })
            }
        })
    }
    const start = () => {
        if (!state.running) {
            setTimer(setInterval(tick, TICK))
            setState(state => ({ ...state, running: true }))
        }
    }
    const stop = () => {
        if (state.running) {
            clearInterval(timer)
            setTimer(undefined)
            setState(state => ({ ...state, running: false }))
        }
    }

    const reset = () => {
        clearInterval(timer)
        setTimer(undefined)
        if (state.running) {
            setState(state => ({ ...state, timeLeft: state.defaultTime, running: false }))
        }
    }


    return {
        state,
        start,
        stop,
        reset
    }
}

const nextPomodoroState = (settings: PomodoroSettings, prevState?: PomodoroState): PomodoroState => {

    if (!prevState) {
        return newState(0, PomodoroMode.WORK, settings)
    }
    else {
        switch (prevState.mode) {
            case PomodoroMode.WORK:
                if (prevState.currentIntervals + 1 >= settings.longBreakAfter) {
                    return newState(prevState.currentIntervals + 1, PomodoroMode.LONGBREAK, settings)
                }
                return newState(prevState.currentIntervals + 1, PomodoroMode.BREAK, settings)
            case PomodoroMode.BREAK:
                return newState(prevState.currentIntervals, PomodoroMode.WORK, settings)
            case PomodoroMode.LONGBREAK:
                return newState(0, PomodoroMode.WORK, settings)
        }
    }

}

function newState(currentIntervals: number, mode: PomodoroMode, settings: PomodoroSettings): PomodoroState {
    return {
        mode,
        timeLeft: settings[mode] * 1000,
        defaultTime: settings[mode] * 1000,
        running: false,
        currentIntervals: currentIntervals
    }
}


export { usePomodoro, useProvidePomodoro, pomodoroContext }
export type { PomodoroState, PomodoroMode, PomodoroSettings, PomodoroContext }