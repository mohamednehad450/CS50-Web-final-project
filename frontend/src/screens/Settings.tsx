import React from 'react'
import { Header } from '../components/common'
import { PomodoroSettingsInput, ThemeSettingsInput, useSettings } from '../components/Settings'

const Settings = () => {

    const { settings, updateSettings } = useSettings()

    return (
        <div className="container">
            <Header title="Settings" />
            <PomodoroSettingsInput
                pomodoroSettings={settings.pomodoroSettings}
                onChange={(pomodoroSettings) => updateSettings({ pomodoroSettings })}
            />
            <ThemeSettingsInput
                themeSettings={settings.themeSettings}
                onChange={(themeSettings) => updateSettings({ themeSettings })}
            />
        </div>
    )
}

export default Settings