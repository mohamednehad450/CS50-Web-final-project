import {
    getTodos,
    getTages,
    updateTodo,
    deleteTodo,
    updateStep,
    addNewTodo,
    addNewTag,
    createEmptyTodo,
    createEmptyStep,
    createEmptyTag,
    validateTodo,
    validateStep,
} from './api'

import ProvideAuth from './ProvideAuth'
import PrivateRoute from './PrivateRoute'
import { useAuth } from './auth'

// Types
import type { Todo, Step, Tag, TodoError, StepError } from './api'
import type { User, AuthContext } from './auth'


export {
    getTodos,
    getTages,
    updateTodo,
    deleteTodo,
    updateStep,
    addNewTodo,
    addNewTag,
    createEmptyTodo,
    createEmptyStep,
    createEmptyTag,
    PrivateRoute,
    ProvideAuth,
    useAuth,
    validateTodo,
    validateStep
}

export type {
    Todo,
    Step,
    Tag,
    User,
    AuthContext,
    TodoError,
    StepError,
}
