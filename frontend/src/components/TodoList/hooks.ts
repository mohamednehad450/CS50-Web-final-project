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
    updateStep: (id: Step['id'], s: Partial<Step>) => Promise<Step>
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

const useProvideTodo = ({ user }: AuthContext): TodoContext => {

    const [todos, setTodos] = useState<Todo[]>([])
    const [tags, setTags] = useState<Tag[]>([])


    const getTodos = useCallback(() => getTodosApi(user).then(r => r && setTodos(r)), [user])
    const updateTodo = (id: Todo['id'], t: Partial<Todo>) => updateTodoApi(id, t, user).then(t => { getTodos(); return t })
    const deleteTodo = (id: Todo['id']) => deleteTodoApi(id, user).then(getTodos)
    const addNewTodo = (t: Partial<Todo>) => addNewTodoApi(t, user).then(t => { getTodos(); return t })
    const updateStep = (id: Step['id'], s: Partial<Step>) => updateStepApi(id, s, user).then(s => { getTodos(); return s })
    const getTags = useCallback(() => getTagsApi(user).then(r => r && setTags(r)), [user])
    const tagsDict: any = useMemo(() => tags.reduce((acc, t) => ({ ...acc, [t.id]: { ...t } }), {}), [tags]);
    const getTag = (id?: Tag['id']): Tag | undefined => tagsDict[id || ''] || undefined
    const addNewTag = (tag: Partial<Tag>) => addNewTagApi(tag, user).then(t => { getTags(); return t })

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