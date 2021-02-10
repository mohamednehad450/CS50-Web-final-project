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
    addPomodoroInterval,
} from './api'

import ProvideAuth from './ProvideAuth'
import PrivateRoute from './PrivateRoute'
import { useAuth } from './auth'

// Types
import type { Todo, Step, Tag, PomodoroInterval, TodoError, StepError } from './api'
import type { User, AuthContext, UserError } from './auth'


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
    validateStep,
    addPomodoroInterval,
}

export type {
    Todo,
    Step,
    Tag,
    PomodoroInterval,
    User,
    AuthContext,
    TodoError,
    StepError,
    UserError
}
