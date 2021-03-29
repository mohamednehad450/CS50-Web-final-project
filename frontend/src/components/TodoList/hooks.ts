import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
    getTodos as getTodosApi,
    updateTodo as updateTodoApi,
    deleteTodo as deleteTodoApi,
    addNewTodo as addNewTodoApi,
    updateStep as updateStepApi,
    getTages as getTagsApi,
    addNewTag as addNewTagApi,
    updateTag as updateTagApi,
    deleteTag as deleteTagApi,
} from '../../API'
import { removeFromArray, replaceFromArray } from "../../utils";

import type { Step, Todo, Tag, AuthContext } from "../../API";

interface TodoContext {
    todos: Todo[]
    getTodos: () => void
    updateTodo: (id: Todo['id'], t: Partial<Todo>) => Promise<void>
    deleteTodo: (id: Todo['id']) => Promise<void>
    addNewTodo: (t: Partial<Todo>) => Promise<void>
    updateStep: (id: Todo['id'], s: Partial<Step>) => Promise<void>
    tags: Tag[]
    getTags: () => void
    getTag: (id?: Tag['id']) => Tag | undefined
    addNewTag: (tag: Partial<Tag>) => Promise<void>
    deleteTag: (id: Tag['id']) => Promise<void>
    updateTag: (id: Tag['id'], tag: Partial<Tag>) => Promise<void>
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
    deleteTag: todoNotinitialized,
    updateTag: todoNotinitialized,
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
            .then(t => setTodos(arr => replaceFromArray(arr, t)))
            .catch((err) => err.isAxiosError ? handleTodoErr(err) : getTodos())

    const deleteTodo = (id: Todo['id']) =>
        deleteTodoApi(id, user)
            .then(() => setTodos(arr => removeFromArray(arr, id)))
            .catch(getTodos)

    const addNewTodo = (t: Partial<Todo>) =>
        addNewTodoApi(t, user)
            .then(t => setTodos(arr => [t, ...arr]))
            .catch(handleTodoErr)

    const updateStep = (id: Step['id'], s: Partial<Step>) =>
        updateStepApi(id, s, user)
            .then(todo => setTodos(arr => replaceFromArray(arr, todo)))
            .catch((err) => err.isAxiosError ? handleTodoErr(err) : getTodos())

    const getTags = useCallback(() =>
        getTagsApi(user)
            .then(r => r && setTags(r))
            .catch(err => { isAuthError(err) && signout() })
        , [user])

    const addNewTag = (tag: Partial<Tag>) =>
        addNewTagApi(tag, user)
            .then(t => { setTags(arr => [t, ...arr]); return t })
            .catch(handleTodoErr)

    const updateTag = (id: Tag['id'], tag: Partial<Tag>) =>
        updateTagApi(id, tag, user)
            .then(t => setTags(replaceFromArray(tags, t)))
            .catch(handleTodoErr);


    const deleteTag = (id: Tag['id']) =>
        deleteTagApi(id, user)
            .then(() => setTags(removeFromArray(tags, id)))
            .catch(handleTodoErr);


    const tagsMap: any = useMemo(() => {
        const map = new Map()
        tags.forEach(t => map.set(t.id, t))
        return map
    }, [tags]);
    const getTag = (id?: Tag['id']): Tag | undefined => tagsMap.get(id)

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
        updateTag,
        deleteTag,
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