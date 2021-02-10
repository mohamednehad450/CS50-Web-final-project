import Axios from 'axios'
import { v4 } from 'uuid'

import type { User } from '.'

export interface Tag {
    color: string
    label: string
    id: string | number
}

export interface Step {
    id: number | string,
    title: string,
    dueDate?: Date | string,
    checked: boolean,
}

export interface Todo {
    title: string,
    checked: boolean,
    tag?: Tag['id'],
    dueDate?: string | Date,
    date: Date,
    id: number | string,
    steps: Step[],
}

export interface PomodoroInterval {
    todo?: Todo['id']
    startDate: Date | string
    endDate: Date | string
    defaultDuration: number
}
export interface StepError {
    id?: string[]
    title?: string[]
    dueDate?: string[]
    checked?: string[]
}
export interface TodoError {
    title?: string[]
    checked?: string[]
    tag?: string[]
    dueDate?: string[]
    date?: string[]
    id?: string[]
    steps?: ErrorObj<StepError>[]
}

export interface ErrorObj<T> {
    isValid: boolean
    err: T
}

export const validateTodo = (todo: Partial<Todo>): ErrorObj<TodoError> => {

    // FrontEnd validation
    const err: TodoError = {}
    let isValid = true

    // title
    if (todo.title || todo.title === '') {
        const titleErr: string[] = []
        todo.title.length === 0 && titleErr.push('This field can\'t be blank')
        todo.title.length > 150 && titleErr.push('This feild can\'t be greater than 150 charecters')
        if (titleErr.length) {
            err.title = titleErr
            isValid = false
        }
    }

    // steps
    if (todo.steps) {
        const stepsErr = todo.steps.map(s => validateStep(s))
        if (!stepsErr.reduce((acc, s) => acc && s.isValid, true)) {
            err.steps = stepsErr
            isValid = false
        }
    }

    return {
        isValid,
        err
    }
}


export const validateStep = (step: Step): ErrorObj<StepError> => {

    const err: StepError = {}
    let isValid = true

    // title
    if (step.title || step.title === '') {
        const titleErr: string[] = []
        step.title.length === 0 && titleErr.push('This field can\'t be blank')
        step.title.length > 150 && titleErr.push('This feild can\'t be greater than 150 charecters')
        if (titleErr.length) {
            err.title = titleErr
            isValid = false
        }
    }

    return {
        isValid,
        err
    }
}

export const createEmptyStep = (): Step => {
    return {
        title: '',
        checked: false,
        id: v4()
    }
}

export const createEmptyTodo = (): Partial<Todo> => {
    return {
        title: '',
        steps: [],
        checked: false
    }
}

export const createEmptyTag = (): Partial<Tag> => {
    return {
        label: '',
        color: '',
    }
}


export const getTodos = async (user?: User): Promise<Todo[] | undefined> => {
    const { data } =
        await Axios.get<Todo[]>('/api/todos/', {
            headers: {
                "Authorization": `JWT ${user?.token}`
            }
        })
    return data
}

export const updateTodo = async (id: Todo['id'], todo: Partial<Todo>, user?: User): Promise<Todo> => {
    const { data } =
        await Axios.patch<Todo>(`/api/todos/${id}/`, todo, {
            headers: {
                "Authorization": `JWT ${user?.token}`
            }
        })
    return data
}

export const deleteTodo = async (id: Todo['id'], user?: User): Promise<void> => {
    await Axios.delete<void>(`/api/todos/${id}/`, {
        headers: {
            "Authorization": `JWT ${user?.token}`
        }
    })
}

export const updateStep = async (id: Step['id'], step: Partial<Step>, user?: User): Promise<Step> => {
    const { data } =
        await Axios.patch<Step>(`/api/steps/${id}/`, step, {
            headers: {
                "Authorization": `JWT ${user?.token}`
            }
        })
    return data
}
export const addNewTodo = async (todo: Partial<Todo>, user?: User): Promise<Todo> => {
    const { data } =
        await Axios.post<Todo>('/api/todos/', todo, {
            headers: {
                "Authorization": `JWT ${user?.token}`
            }
        })
    return data
}


export const getTages = async (user?: User): Promise<Tag[]> => {
    const { data } = await
        Axios.get<Tag[]>('/api/tags/', {
            headers: {
                "Authorization": `JWT ${user?.token}`
            }
        })
    return data
};
export const addNewTag = async (tag: Partial<Tag>, user?: User): Promise<Tag> => {
    const { data } =
        await Axios.post<Tag>('/api/tags/', tag, {
            headers: {
                "Authorization": `JWT ${user?.token}`
            }
        })
    return data
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