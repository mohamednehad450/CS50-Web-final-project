import {
    getTodos,
    getTages,
    updateTodo,
    updateStep,
    addNewTodo,
    addNewTag,
    createEmptyTodo,
    createEmptyStep,
    createEmptyTag,
} from './api'

import ProvideAuth from './ProvideAuth'
import PrivateRoute from './PrivateRoute'
import { useAuth } from './auth'

// Types
import type { Todo, Step, Tag } from './api'
import type { User, AuthContext } from './auth'


export {
    getTodos,
    getTages,
    updateTodo,
    updateStep,
    addNewTodo,
    addNewTag,
    createEmptyTodo,
    createEmptyStep,
    createEmptyTag,
    PrivateRoute,
    ProvideAuth,
    useAuth,
}

export type {
    Todo,
    Step,
    Tag,
    User,
    AuthContext
}
