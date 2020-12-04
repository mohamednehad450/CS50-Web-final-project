
export interface Step {
    id: number,
    title: string,
    dueDate?: Date,
    checked: boolean,
}

export interface Todo {
    id: number,
    title: string,
    steps: Step[],
    checked: boolean,
    colorTag?: string,
    dueDate?: Date,

}


const mockTodos: Todo[] = [
    {
        title: "Todo 1",
        colorTag: "#FF8E6A",
        steps: [
            {
                title: 'step x',
                checked: true,
                id: 1,
            },
            {
                title: 'step y',
                checked: true,
                id: 2,
            },
        ],
        checked: true,
        id: 1,
    },
    {
        title: "Todo 2",
        checked: false,
        id: 2,
        steps: []
    },
    {
        title: "Todo 3",
        checked: false,
        id: 3,
        steps: []
    },
]


export const getTodos = async () => mockTodos;
export const updateTodo = async (todo: Todo) => {
    const index = mockTodos.findIndex(t => t.id === todo.id)
    mockTodos[index] = todo;
    return mockTodos
}