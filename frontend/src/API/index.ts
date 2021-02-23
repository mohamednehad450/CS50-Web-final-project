import {
    getTodos,
    updateTodo,
    deleteTodo,
    updateStep,
    addNewTodo,
    createEmptyTodo,
    createEmptyStep,
    validateTodo,
    validateStep,
} from './todos'

import {
    getTages,
    addNewTag,
    createEmptyTag,
} from './tags'

import {
    addPomodoroInterval
} from './pomodoro'

import {
    getHabits,
    updateHabit,
    addNewHabit,
    removeHabit,
    addEntry,
    removeEntry,
} from './habits'

import ProvideAuth from './ProvideAuth'
import PrivateRoute from './PrivateRoute'
import { useAuth } from './auth'

// Types
import type { Todo, Step, TodoError, StepError, } from './todos'
import type { Tag, } from './tags'
import type { PomodoroInterval, } from './pomodoro'
import type { Habit, } from './habits'
import type { User, AuthContext, UserError, } from './auth'


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
    getHabits,
    updateHabit,
    addNewHabit,
    removeHabit,
    addEntry,
    removeEntry
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
    UserError,
    Habit
}
