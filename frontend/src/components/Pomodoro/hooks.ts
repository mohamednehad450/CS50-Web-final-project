import { createContext, useContext, useEffect, useReducer, useState } from "react"
import { addPomodoroInterval } from "../../API";
import { defaultPomodoroSettings } from "../Settings";

import type { AuthContext, PomodoroInterval, Todo } from "../../API";
import type { PomodoroSettings } from "../Settings";

enum PomodoroMode {
    WORK = "work",
    BREAK = "break",
    LONGBREAK = "longbreak",
}

// Reducers Actions
enum PomodoroActions {
    tick = "TICK",
    reset = "RESET",
    skip = "SKIP",
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

interface Pomodoro {
    state: PomodoroState
    stats: PomodoroStats
}

// Reducers Type
type PomodoroReducer = (
    pomodoro: {
        state: PomodoroState,
        stats: PomodoroStats
    },
    action: {
        type: PomodoroActions,
        payload: {
            settings: PomodoroSettings,
        }
    }) => Pomodoro;


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
    setTodo: (id?: Todo['id']) => void
}

const pomodoroContext = createContext<PomodoroContext>({
    state: defaultPomodoroState,
    stats: defaultPomodoroStats,
    isRunning: false,
    start: () => console.error("pomodoro not initialized"),
    stop: () => console.error("pomodoro not initialized"),
    reset: () => console.error("pomodoro not initialized"),
    skip: () => console.error("pomodoro not initialized"),
    setTodo: () => console.error("pomodoro not initialized"),
})

const usePomodoro = () => useContext(pomodoroContext)

const TICK = 1000

const useProvidePomodoro = ({ user }: AuthContext, settings: PomodoroSettings): PomodoroContext => {

    const [pomodoro, dispatch] = useReducer(pomodoroReducer, {
        state: newState(PomodoroMode.WORK, settings),
        stats: defaultPomodoroStats,
    })

    const [pomInterval, setPomInterval] = useState<Partial<PomodoroInterval>>()

    const [timer, setTimer] = useState<any>()

    // Cleans up the Timer
    useEffect(() => {
        return () => clearInterval(timer)
    }, [timer])

    // Mode Change Effect
    useEffect(() => {
        // Handles autoStart
        if (!settings.autoStart) {
            clearTimeout(timer)
            setTimer(undefined)
        }
        // Submiting Pomodoro Interval to Api
        if (pomodoro.state.mode !== PomodoroMode.WORK) {
            if (pomInterval?.startDate) {
                addPomodoroInterval({
                    ...pomInterval,
                    endDate: new Date(),
                }, user) // TODO: Handles api error
                setPomInterval(p => ({ todo: p?.todo }))
            }
        }

        // Initializing Pomodoro Interval
        if (pomodoro.state.mode === PomodoroMode.WORK) {
            setPomInterval(p => !!timer ? {
                ...p,
                startDate: new Date(),
                defaultDuration: settings.work
            } :
                { todo: p?.todo }
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pomodoro.state.mode])

    // Resets when settings changes
    useEffect(() => {
        reset()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settings])

    const tick = () => {
        dispatch({
            type: PomodoroActions.tick,
            payload: {
                settings: settings,
            }
        })
    }

    const start = () => {
        if (!timer) {
            setTimer(setInterval(tick, TICK))
        }
        if (!pomInterval?.startDate && PomodoroMode.WORK) {
            setPomInterval(p => ({
                ...p,
                startDate: new Date(),
                defaultDuration: settings.work
            }))
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
        dispatch({
            type: PomodoroActions.reset,
            payload: {
                settings: settings,
            }
        })
    }

    const skip = () => {
        dispatch({
            type: PomodoroActions.skip,
            payload: {
                settings: settings,
            }
        })
        if (!settings.submitOnSkip) {
            setPomInterval(p => ({ todo: p?.todo }))
        }
    }

    const setTodo = (id?: Todo['id']) => {
        setPomInterval(p => ({ ...p, todo: id }))
    }


    return {
        ...pomodoro,
        isRunning: !!timer,
        start,
        stop,
        reset,
        skip,
        setTodo,
    }
}

function newState(mode: PomodoroMode, settings: PomodoroSettings): PomodoroState {
    return {
        mode,
        timeLeft: settings[mode] * 1000,
        defaultTime: settings[mode] * 1000,
    }
}


const pomodoroReducer: PomodoroReducer = ({ state, stats }, { type, payload: { settings } }) => {
    function nextPomodoro(state: PomodoroState, stats: PomodoroStats, settings: PomodoroSettings): Pomodoro {
        // Time is up: Switching to a new mode
        if (state.timeLeft - TICK < 0) {
            switch (state.mode) {
                case PomodoroMode.WORK:
                    const s = {
                        ...stats,
                        round: stats.round + 1,
                        goal: stats.goal + 1,
                    }
                    // Should go on a long or short break?
                    if (stats.round + 1 >= settings.longBreakAfter) {
                        return {
                            state: newState(PomodoroMode.LONGBREAK, settings),
                            stats: s
                        }
                    } else return {
                        state: newState(PomodoroMode.BREAK, settings),
                        stats: s
                    }
                case PomodoroMode.BREAK:
                    return {
                        state: newState(PomodoroMode.WORK, settings),
                        stats
                    }
                case PomodoroMode.LONGBREAK:
                    return {
                        state: newState(PomodoroMode.WORK, settings),
                        stats: { ...stats, round: 0 }
                    }
                default:
                    throw new Error('Invalid PomodoroMode')
            }
        }
        else {
            return {
                state: {
                    ...state,
                    timeLeft: state.timeLeft - TICK,
                },
                stats,
            }
        }
    }

    switch (type) {
        case PomodoroActions.tick:
            return nextPomodoro(state, stats, settings)
        case PomodoroActions.skip:
            return nextPomodoro({ ...state, timeLeft: 0, }, stats, settings)
        case PomodoroActions.reset:
            return {
                state: newState(state.mode, settings),
                stats,
            }
        default:
            return {
                state,
                stats
            }
    }
}

export { usePomodoro, useProvidePomodoro, pomodoroContext }
export type { PomodoroState, PomodoroMode, PomodoroContext }