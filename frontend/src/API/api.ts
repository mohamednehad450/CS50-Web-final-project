import Axios from 'axios'
import { v4 } from 'uuid'

import type { AuthContext, } from './auth'

export interface Tag {
    color: string
    label: string
    id: string | number
}

export interface Step {
    id: number | string,
    title: string,
    dueDate?: Date,
    checked: boolean,
}

export interface Todo {
    title: string,
    checked: boolean,
    tag: Tag,
    dueDate?: Date,
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
        id: v4(),
        date: new Date(),
    }
}

export const createEmptyTag = (): Tag => {
    return {
        label: '',
        color: '',
        id: v4()
    }
}


export const getTodos = async (auth: AuthContext): Promise<Todo[] | undefined> => {
    try {
        const { data } =
            await Axios.get<Todo[]>('/api/todos/', {
                headers: {
                    "Authorization": `JWT ${auth.user?.token}`
                }
            })
        return data
    } catch (error) {
        // TODO: Handle error
        auth.signout()
    }

};
export const updateTodo = async (todo: Partial<Todo>, auth: AuthContext): Promise<Todo | undefined> => {
    try {
        const { data } =
            await Axios.patch<Todo>(`/api/todos/${todo.id}/`, todo, {
                headers: {
                    "Authorization": `JWT ${auth.user?.token}`
                }
            })
        return data
    } catch (error) {
        // TODO: Handle error
        auth.signout()
    }

}
export const updateStep = async (step: Partial<Step>, auth: AuthContext): Promise<Step | undefined> => {
    try {
        const { data } =
            await Axios.patch<Step>(`/api/steps/${step.id}/`, step, {
                headers: {
                    "Authorization": `JWT ${auth.user?.token}`
                }
            })
        return data
    } catch (error) {
        // TODO: Handle error
        auth.signout()
    }
}
export const addNewTodo = async (todo: Partial<Todo>, auth: AuthContext): Promise<Todo | undefined> => {
    try {
        const { data } =
            await Axios.post<Todo>('/api/todos/', todo, {
                headers: {
                    "Authorization": `JWT ${auth.user?.token}`
                }
            })
        return data
    } catch (error) {
        // TODO: Handle error
        auth.signout()
    }
};

export const getTages = async (auth: AuthContext): Promise<Tag[] | undefined> => {
    try {
        const { data } = await
            Axios.get<Tag[]>('/api/tags/', {
                headers: {
                    "Authorization": `JWT ${auth.user?.token}`
                }
            })
        return data
    } catch (error) {
        // TODO: Handle error
        auth.signout()
    }

};
export const addNewTag = async (tag: Tag, auth: AuthContext): Promise<Tag | undefined> => {
    try {
        const { data } =
            await Axios.post<Tag>('/api/tags/', tag, {
                headers: {
                    "Authorization": `JWT ${auth.user?.token}`
                }
            })
        return data
    } catch (error) {
        // TODO: Handle error
        auth.signout()
    }
};
