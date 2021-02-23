import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { AuthContext, Habit } from "../../API"

import {
    getHabits as getHabitsApi,
    updateHabit as updateHabitApi,
    removeHabit as removeHabitApi,
    addNewHabit as addNewHabitApi,
    addEntry as addEntryApi,
    removeEntry as removeEntryApi,
} from '../../API'


interface HabitContext {
    habits: Habit[]
    getHabits: () => void
    updateHabit: (id: Habit['id'], h: Partial<Habit>) => Promise<void>
    removeHabit: (id: Habit['id']) => Promise<void>
    addNewHabit: (h: Partial<Habit>) => Promise<void>
    addEntry: (id: Habit['id'], date: Date | string) => Promise<void>
    removeEntry: (id: Habit['id'], date: Date | string) => Promise<void>
}

function habitsNotinitialized(): any {
    console.warn('Habits context not initialized')
}

const defaultHabitsContext: HabitContext = {
    habits: [],
    getHabits: habitsNotinitialized,
    updateHabit: habitsNotinitialized,
    removeHabit: habitsNotinitialized,
    addNewHabit: habitsNotinitialized,
    addEntry: habitsNotinitialized,
    removeEntry: habitsNotinitialized,
}


const habitsContext = createContext(defaultHabitsContext)

const useHabits = () => useContext(habitsContext)

const useProvideHabits = ({ user }: AuthContext): HabitContext => {


    const [habits, setHabits] = useState<Habit[]>([])
    const getHabits = useCallback(() => getHabitsApi(user).then(habits => habits && setHabits(habits)), [user])
    const updateHabit = (id: Habit['id'], h: Partial<Habit>) => updateHabitApi(id, h, user).then(getHabits)
    const removeHabit = (id: Habit['id']) => removeHabitApi(id, user).then(getHabits)
    const addNewHabit = (h: Partial<Habit>) => addNewHabitApi(h, user).then(getHabits)
    const addEntry = (id: Habit['id'], date: Date | string) => addEntryApi(id, date, user).then(getHabits)
    const removeEntry = (id: Habit['id'], date: Date | string) => removeEntryApi(id, date, user).then(getHabits)

    useEffect(() => {
        getHabits()
    }, [getHabits])


    return {
        habits,
        getHabits,
        updateHabit,
        removeHabit,
        addNewHabit,
        addEntry,
        removeEntry,
    }
}

export { useHabits, useProvideHabits, habitsContext }