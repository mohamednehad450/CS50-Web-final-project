import React from 'react'
import { Header } from '../components/common'
import { PomodoroSettingsInput, useSettings } from '../components/Settings'

const Settings = () => {

    const { settings: { pomodoroSettings }, updateSettings } = useSettings()

    return (
        <div className="container">
            <Header title="Settings" />
            <PomodoroSettingsInput
                pomodoroSettings={pomodoroSettings}
                onChange={(pomodoroSettings) => updateSettings({ pomodoroSettings })}
            />
        </div>
    )
}

export default Settings