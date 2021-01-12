import React, { FC } from 'react'

import { useProvidePomodoro, pomodoroContext } from './index'


const ProvidePomodoro: FC = ({ children }) => {
    const pomodoro = useProvidePomodoro();
    return (
        <pomodoroContext.Provider value={pomodoro}>
            {children}
        </pomodoroContext.Provider>
    );
}


export default ProvidePomodoro
