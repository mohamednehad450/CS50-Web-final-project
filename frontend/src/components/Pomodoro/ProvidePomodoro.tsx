import React, { FC } from 'react'
import { useAuth } from '../../API';

import { useProvidePomodoro, pomodoroContext } from './index'


const ProvidePomodoro: FC = ({ children }) => {
    const auth = useAuth()
    const pomodoro = useProvidePomodoro(auth);
    return (
        <pomodoroContext.Provider value={pomodoro}>
            {children}
        </pomodoroContext.Provider>
    );
}


export default ProvidePomodoro
