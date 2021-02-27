import { FC } from "react";


import type { Habit } from "../../API";

interface HabitEntriesProps {
    entries: Habit['entries']
    onAdd: (d: Date) => void
    onRemove: (d: Date) => void
}


const HabitEntries: FC<HabitEntriesProps> = () => {


    return null
}


export default HabitEntries