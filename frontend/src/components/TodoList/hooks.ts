import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
    getTodos as getTodosApi,
    updateTodo as updateTodoApi,
    deleteTodo as deleteTodoApi,
    addNewTodo as addNewTodoApi,
    updateStep as updateStepApi,
    getTages as getTagsApi,
    addNewTag as addNewTagApi,
} from '../../API'

import type { Step, Todo, Tag, AuthContext } from "../../API";

interface TodoContext {
    todos: Todo[]
    getTodos: () => void
    updateTodo: (id: Todo['id'], t: Partial<Todo>) => Promise<Todo>
    deleteTodo: (id: Todo['id']) => Promise<void>
    addNewTodo: (t: Partial<Todo>) => Promise<Todo>
    updateStep: (id: Step['id'], s: Partial<Step>) => Promise<Step | void>
    tags: Tag[]
    getTags: () => void
    getTag: (id?: Tag['id']) => Tag | undefined
    addNewTag: (tag: Partial<Tag>) => Promise<Tag>
}

function todoNotinitialized(): any {
    console.warn('Todo context not initialized')
}

const defaultTodoContext: TodoContext = {
    todos: [],
    getTodos: todoNotinitialized,
    updateTodo: todoNotinitialized,
    deleteTodo: todoNotinitialized,
    addNewTodo: todoNotinitialized,
    updateStep: todoNotinitialized,
    tags: [],
    getTags: todoNotinitialized,
    getTag: todoNotinitialized,
    addNewTag: todoNotinitialized,
}

const todoContext = createContext(defaultTodoContext)

const useTodo = () => useContext(todoContext)

const useProvideTodo = ({ user, signout }: AuthContext): TodoContext => {

    const [todos, setTodos] = useState<Todo[]>([])
    const [tags, setTags] = useState<Tag[]>([])


    const isAuthError = (err: any): boolean => {
        const { response, isAxiosError } = err
        if (isAxiosError) {
            const { status } = response
            if (status === 401 || status === 403) {
                return true
            }
        }
        return false
    }

    const handleTodoErr = (err: any): any => {
        const { response, isAxiosError } = err

        if (isAuthError(err)) {
            signout()
        }

        if (isAxiosError) {
            const { status, data } = response

            if (status === 404) {
                // eslint-disable-next-line no-throw-literal
                throw { notFound: true, ...data }
            }
            else if (status === 400) {
                throw data
            }
            else if (status === 500) {
                alert('Somthing went wrong, Please try again later or refresh the page.')
            }
        }
    }


    const getTodos = useCallback(() =>
        getTodosApi(user)
            .then(r => r && setTodos(r))
            .catch((err: any) => { isAuthError(err) && signout() })
        , [user])

    const updateTodo = (id: Todo['id'], t: Partial<Todo>) =>
        updateTodoApi(id, t, user)
            .then(t => { getTodos(); return t })
            .catch(handleTodoErr)

    const deleteTodo = (id: Todo['id']) =>
        deleteTodoApi(id, user)
            .then(getTodos)
            .catch(getTodos)

    const addNewTodo = (t: Partial<Todo>) =>
        addNewTodoApi(t, user)
            .then(t => { getTodos(); return t })
            .catch(handleTodoErr)

    const updateStep = (id: Step['id'], s: Partial<Step>) =>
        updateStepApi(id, s, user)
            .then(s => { getTodos(); return s })
            .catch(getTodos)

    const getTags = useCallback(() =>
        getTagsApi(user)
            .then(r => r && setTags(r))
            .catch(err => { isAuthError(err) && signout() })
        , [user])

    const addNewTag = (tag: Partial<Tag>) =>
        addNewTagApi(tag, user)
            .then(t => { getTags(); return t })
            .catch(handleTodoErr)


    const tagsDict: any = useMemo(() => tags.reduce((acc, t) => ({ ...acc, [t.id]: { ...t } }), {}), [tags]);
    const getTag = (id?: Tag['id']): Tag | undefined => tagsDict[id || ''] || undefined

    useEffect(() => {
        getTodos()
        getTags()
    }, [getTodos, getTags])

    return {
        todos,
        getTodos,
        updateTodo,
        deleteTodo,
        addNewTodo,
        updateStep,
        tags,
        getTags,
        getTag,
        addNewTag,
    }
}

export {
    todoContext,
    useTodo,
    useProvideTodo,
}

export type {
    TodoContext,

}