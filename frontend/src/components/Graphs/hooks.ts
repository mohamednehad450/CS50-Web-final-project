import { createContext, useContext, useMemo, useState } from "react";
import { isSameMonth, isToday } from '../../utils'
import { formatTodo, useTodo } from "../TodoList";
import { useIntervals } from "../Pomodoro";
import { useHabits } from "../HabitTracker";


import type { Step, TodoWithTag, } from "../../API";


export interface StatsContext {
    summary: {
        todoAdded: number
        todoFinished: number
        stepsFinished: number
        pomodoroSession: number
        checkedHabits: number
    },
    todoStats: {
        month: Date,
        added: TodoWithTag[]
        finished: TodoWithTag[]
        setMonth: (d: Date) => void
    },
}



const defaultStatsContext = {
    summary: {
        todoAdded: 0,
        todoFinished: 0,
        stepsFinished: 0,
        pomodoroSession: 0,
        checkedHabits: 0,
    },
    todoStats: {
        month: new Date(),
        setMonth: () => console.error('Stats context not initialized'),
        added: [],
        finished: [],
    }

}

export const statsContext = createContext<StatsContext>(defaultStatsContext)

export const useStats = () => useContext(statsContext)

export const useProvideStats = (): StatsContext => {

    const { intervals } = useIntervals()
    const { todos, getTag } = useTodo()
    const { habits } = useHabits()

    const [todosMonth, setTodosMonth] = useState(new Date())

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

    const todosStats = useMemo(() => {
        let added: TodoWithTag[] = []
        let finished: TodoWithTag[] = []

        for (let t of todos) {
            isSameMonth(t.date, todosMonth) &&
                added.push({ ...t, tag: getTag(t.tag) })
            isSameMonth(formatTodo(t).checked, todosMonth) &&
                finished.push({ ...t, tag: getTag(t.tag) })
        }
        added = added
            .sort((a, b) => {
                const aColor = a.tag?.color || '#FFF'
                const bColor = b.tag?.color || '#FFF'
                return aColor.localeCompare(bColor)
            })
            .reverse()

        finished = finished
            .sort((a, b) => {
                const aColor = a.tag?.color || '#FFF'
                const bColor = b.tag?.color || '#FFF'
                return aColor.localeCompare(bColor)
            })
            .reverse()
        return {
            added,
            finished,
        }
    }, [todosMonth, todos, getTag])

    return {
        summary: {
            ...todoSummary,
            pomodoroSession,
            checkedHabits,
        },
        todoStats: {
            month: todosMonth,
            setMonth: setTodosMonth,
            ...todosStats,
        },
    }
}