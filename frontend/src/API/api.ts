import { v4 } from 'uuid'

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

export const createEmptyTodo = (): Todo => {
    return {
        title: '',
        steps: [],
        checked: false,
        tag: noneTag,
        id: v4()
    }
}

export const createEmptyTag = (): Tag => {
    return {
        label: '',
        color: '',
        id: v4()
    }
}

export const noneTag: Tag = {
    label: 'None',
    color: '#fff',
    id: v4()
}


const mockTodos: Todo[] = [
    {
        title: "Todo 1",
        tag: {
            color: "#FF8E6A",
            label: 'work',
            id: v4()
        },
        steps: [
            {
                title: 'step x',
                checked: true,
                id: v4(),
            },
            {
                title: 'step y',
                checked: true,
                id: v4(),
            },
        ],
        checked: true,
        id: v4(),
    },
    {
        title: "Todo 2",
        checked: false,
        id: v4(),
        steps: [],
        tag: noneTag
    },
    {
        title: "Todo 3",
        checked: false,
        id: v4(),
        steps: [],
        tag: noneTag,
    },
]

const mockTags: Tag[] = [
    noneTag,
    {
        color: "#FF8E6A",
        label: 'work',
        id: v4(),
    },
    {
        color: "#5A92FF",
        label: 'project alpha',
        id: v4(),
    },
    {
        color: "#e91e63",
        label: 'hobby',
        id: v4(),
    },
]


export const getTodos = async () => {
    return mockTodos
};
export const updateTodo = async (todo: Partial<Todo>): Promise<Todo> => {
    const t = mockTodos.find(({ id }) => id === todo.id)
    if (t) {
        return { ...t, ...todo }
    } else throw Error('missing todo')
}
export const updateStep = async (step: Partial<Step>) => {
    for (let todo of mockTodos) {
        const s = todo.steps.find(({ id }) => step.id === id)
        if (s) {
            return { ...s, ...step }
        }
    }
    throw Error('missing step')
}
export const addNewTodo = async (todo: Todo) => {
    mockTodos.unshift(todo)
    return [...mockTodos]
};

export const getTages = async () => mockTags;
export const addNewTag = async (tag: Tag) => {
    mockTags.push(tag)
    return [...mockTags]
};
