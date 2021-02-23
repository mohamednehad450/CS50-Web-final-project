import React, { useState } from 'react'
import { Header } from '../components/common'
import { NewHabitOverlay } from '../components/HabitTracker'
import { useHabits } from '../components/HabitTracker'

import { ReactComponent as AddIcon } from '../icons/add-outline.svg'

const HabitTracker = () => {

    const [overlay, setOverlay] = useState(false)
    const { habits, addNewHabit } = useHabits()

    return (
        <div className="container">
            {overlay && (
                <NewHabitOverlay
                    close={() => setOverlay(false)}
                    submit={(habit) => addNewHabit(habit)}
                />
            )}
            <Header
                title="Habit Tracker"
                actions={
                    <span className="header-actions-icon">
                        <AddIcon onClick={() => setOverlay(true)} />
                    </span>
                }
            />
        </div>
    )
}

export default HabitTracker