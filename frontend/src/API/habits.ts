import Axios from "axios"
import { User } from "./auth"

export interface Habit {
    id: string
    title: string
    created: Date | string
    entries: (Date | string)[]
}

export const getHabits = async (user?: User): Promise<Habit[] | undefined> => {
    const { data } =
        await Axios.get<Habit[]>('/api/habits/', {
            headers: {
                "Authorization": `JWT ${user?.token}`
            }
        })
    return data
}

export const updateHabit = async (id: Habit['id'], habit: Partial<Habit>, user?: User): Promise<Habit> => {
    const { data } =
        await Axios.patch<Habit>(`/api/habits/${id}/`, habit, {
            headers: {
                "Authorization": `JWT ${user?.token}`
            }
        })
    return data
}

export const addNewHabit = async (habit: Partial<Habit>, user?: User): Promise<Habit> => {
    const { data } =
        await Axios.post<Habit>('/api/habits/', habit, {
            headers: {
                "Authorization": `JWT ${user?.token}`
            }
        })
    return data
}

export const removeHabit = async (id: Habit['id'], user?: User): Promise<void> => {
    await Axios.delete<void>(`/api/habits/${id}/`, {
        headers: {
            "Authorization": `JWT ${user?.token}`
        }
    })
}

export const addEntry = async (id: Habit['id'], entry: Date | string, user?: User): Promise<void> => {
    await Axios.post<void>(`/api/habits/${id}/add_entry/`, { date: entry }, {
        headers: {
            "Authorization": `JWT ${user?.token}`
        }
    })
}

export const removeEntry = async (id: Habit['id'], entry: Date | string, user?: User): Promise<void> => {
    await Axios.post<void>(`/api/habits/${id}/remove_entry/`, { date: entry }, {
        headers: {
            "Authorization": `JWT ${user?.token}`
        }
    })
}