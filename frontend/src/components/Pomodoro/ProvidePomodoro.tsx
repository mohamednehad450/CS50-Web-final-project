import React, { FC } from 'react'
import { useAuth } from '../../API';
import { useSettings } from '../Settings';

import { useProvidePomodoro, pomodoroContext } from './index'


const ProvidePomodoro: FC = ({ children }) => {
    const auth = useAuth()
    const { settings: { pomodoroSettings } } = useSettings()
    const pomodoro = useProvidePomodoro(auth, pomodoroSettings);
    return (
        <pomodoroContext.Provider value={pomodoro}>
            {children}
        </pomodoroContext.Provider>
    );
}


export default ProvidePomodoro
