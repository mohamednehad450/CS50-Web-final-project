import { createContext, useContext, useMemo } from "react";
import { formatTodo, useTodo } from "../TodoList";
import { isToday } from '../../utils'
import { useIntervals } from "../Pomodoro";


import { Step } from "../../API";
import { useHabits } from "../HabitTracker";

export interface StatsContext {
    summary: {
        todoAdded: number
        todoFinished: number
        stepsFinished: number
        pomodoroSession: number
        checkedHabits: number
    }
}



const defaultStatsContext = {
    summary: {
        todoAdded: 0,
        todoFinished: 0,
        stepsFinished: 0,
        pomodoroSession: 0,
        checkedHabits: 0,
    }

}

export const statsContext = createContext<StatsContext>(defaultStatsContext)

export const useStats = () => useContext(statsContext)

export const useProvideStats = (): StatsContext => {

    const { intervals } = useIntervals()
    const { todos } = useTodo()
    const { habits } = useHabits()

    const todoSummary = useMemo(() => {
        const todoAdded = todos
            .filter(t => isToday(t.date))
            .length
        const todoFinished = todos
            .filter(t => isToday(formatTodo(t).checked))
            .length
        const stepsFinished = todos
            .reduce<Step[]>((acc, t) => [...acc, ...t.steps], [])
            .filter(s => s.checked && isToday(s.checked))
            .length

        return {
            todoAdded,
            todoFinished,
            stepsFinished,
        }
    }, [todos])

    const pomodoroSession = useMemo(() => {
        const pomodoroSession = intervals
            .filter(i => isToday(i.startDate))
            .length
        return pomodoroSession
    }, [intervals])

    const checkedHabits = useMemo(() => {
        const checkedHabits = habits
            .filter(h => h.entries
                .reduce<boolean>((acc, d) => acc || isToday(d), false))
            .length
        return checkedHabits
    }, [habits])

    return {
        summary: {
            ...todoSummary,
            pomodoroSession,
            checkedHabits,
        }
    }
}