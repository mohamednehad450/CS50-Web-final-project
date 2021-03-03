import { FC } from "react";
import { Checkbox, NumberInput } from "../common";
import { PomodoroSettings } from "./hooks";
import SettingRow from "./SettingRow";

interface PomodoroSettingsInputProps {
    pomodoroSettings: PomodoroSettings
    onChange: (s: PomodoroSettings) => void
}


const PomodoroSettingsInput: FC<PomodoroSettingsInputProps> = ({ pomodoroSettings, onChange }) => {


    return (
        <div className="settings-container">
            <span className="settings-header">
                Pomodoro Settings
            </span>

            <SettingRow
                title="Time (minutes)"
            >
                <NumberInput
                    value={pomodoroSettings.work / 60}
                    label="Work"
                    onChange={(v) => v >= 0 && v < 100 && onChange({ ...pomodoroSettings, work: v * 60 })}
                />
                <NumberInput
                    value={pomodoroSettings.break / 60}
                    label="Break"
                    onChange={(v) => v >= 0 && v < 100 && onChange({ ...pomodoroSettings, break: v * 60 })}
                />
                <NumberInput
                    value={pomodoroSettings.longbreak / 60}
                    label="Long Break"
                    onChange={(v) => v >= 0 && v < 100 && onChange({ ...pomodoroSettings, longbreak: v * 60 })}
                />
            </SettingRow>
            <SettingRow
                title="Long Break after?"
            >
                <NumberInput
                    label="Rounds"
                    value={pomodoroSettings.longBreakAfter}
                    onChange={v => v >= 0 && v < 100 && onChange({ ...pomodoroSettings, longBreakAfter: v })}
                />
            </SettingRow>
            <SettingRow
                title="Daily Rounds goal"
            >
                <NumberInput
                    label="Rounds"
                    value={pomodoroSettings.goal}
                    onChange={v => v >= 0 && v < 100 && onChange({ ...pomodoroSettings, goal: v })}
                />
            </SettingRow>
            <SettingRow
                title="Auto start next round?"
            >
                <Checkbox
                    checked={pomodoroSettings.autoStart}
                    onChange={autoStart => onChange({ ...pomodoroSettings, autoStart })}
                />
            </SettingRow>
        </div>
    )
}

export default PomodoroSettingsInput