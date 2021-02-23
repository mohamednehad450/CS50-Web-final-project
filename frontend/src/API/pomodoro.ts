import Axios from 'axios'

import type { User } from '.'
import { Todo } from './todos'


export interface PomodoroInterval {
    todo?: Todo['id']
    startDate: Date | string
    endDate: Date | string
    defaultDuration: number
}

export const addPomodoroInterval = async (pomInterval: Partial<PomodoroInterval>, user?: User): Promise<PomodoroInterval> => {
    const { data } =
        await Axios.post<PomodoroInterval>('/api/pomodoros/', pomInterval, {
            headers: {
                "Authorization": `JWT ${user?.token}`
            }
        })
    return data
}