import { createContext, useContext, useState } from "react";
import { getItemFromStorage, setItemToStorage } from "../../utils";

import type { PomodoroMode } from "../Pomodoro";

// units in seconds
interface PomodoroSettings {
    [PomodoroMode.BREAK]: number
    [PomodoroMode.WORK]: number
    [PomodoroMode.LONGBREAK]: number
    autoStart: boolean
    longBreakAfter: number
    goal: number
}

type ThemeSettings = 'light' | 'dark'

interface Settings {
    pomodoroSettings: PomodoroSettings
    themeSettings: ThemeSettings
}

interface SettingsContext {
    settings: Settings
    updateSettings: (s: Partial<Settings>) => void
}

const defaultPomodoroSettings: PomodoroSettings = {
    "break": 5 * 60,
    "longbreak": 25 * 60,
    "work": 25 * 60,
    autoStart: true,
    longBreakAfter: 4,
    goal: 12
}


const defaultSettings: Settings = {
    pomodoroSettings: defaultPomodoroSettings,
    themeSettings: 'light'
}

const settingsContext = createContext<SettingsContext>({
    settings: defaultSettings,
    updateSettings: () => console.error('settings not initialized')
})

const useSettings = () => useContext(settingsContext)

const useProvideSettings = (): SettingsContext => {

    const [settings, setSettings] = useState<Settings>(getItemFromStorage('settings') || defaultSettings)

    const updateSettings = (s: Partial<Settings>) => {
        setSettings(old => {
            const settings = { ...old, ...s }
            setItemToStorage('settings', settings)
            return settings
        })
    }

    return {
        settings,
        updateSettings,
    }
}

export { useSettings, settingsContext, useProvideSettings, defaultPomodoroSettings }
export type { SettingsContext, Settings, PomodoroSettings, ThemeSettings }