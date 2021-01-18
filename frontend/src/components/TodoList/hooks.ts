import { createContext, useContext, useState } from "react";
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
    updateTodo: (t: Partial<Todo>) => void
    deleteTodo: (t: Partial<Todo>) => void
    addNewTodo: (t: Partial<Todo>) => void
    updateStep: (s: Partial<Step>) => void
    tags: Tag[]
    getTags: () => void
    addNewTag: (tag: Tag) => void
}

function todoNotinitialized() {
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
    addNewTag: todoNotinitialized,
}

const todoContext = createContext(defaultTodoContext)

const useTodo = () => useContext(todoContext)

const useProvideTodo = (auth: AuthContext): TodoContext => {

    const [todos, setTodos] = useState<Todo[]>([])
    const [tags, setTags] = useState<Tag[]>([])

    const getTodos = () => getTodosApi(auth).then(r => r && setTodos(r))
    const updateTodo = (t: Partial<Todo>) => updateTodoApi(t, auth).then(getTodos)
    const deleteTodo = (t: Partial<Todo>) => deleteTodoApi(t, auth).then(getTodos)
    const addNewTodo = (t: Partial<Todo>) => addNewTodoApi(t, auth).then(getTodos)
    const updateStep = (s: Partial<Step>) => updateStepApi(s, auth).then(getTodos)
    const getTags = () => getTagsApi(auth).then(r => r && setTags(r))
    const addNewTag = (tag: Tag) => addNewTagApi(tag, auth).then(getTags)
    return {
        todos,
        getTodos,
        updateTodo,
        deleteTodo,
        addNewTodo,
        updateStep,
        tags,
        getTags,
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