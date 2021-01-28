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