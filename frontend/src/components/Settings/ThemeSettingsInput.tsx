import { FC } from "react";
import { Checkbox, } from "../common";
import { ThemeSettings } from "./hooks";
import SettingRow from "./SettingRow";

interface ThemeSettingsInputProps {
    themeSettings: ThemeSettings
    onChange: (s: ThemeSettings) => void
}


const ThemeSettingsInput: FC<ThemeSettingsInputProps> = ({ themeSettings, onChange }) => {


    return (
        <div className="settings-container">
            <span className="settings-header">
                Theme Settings
            </span>
            <SettingRow
                title="Dark Mode?"
            >
                <Checkbox
                    checked={themeSettings === 'dark'}
                    onChange={dark => onChange(dark ? 'dark' : 'light')}
                />
            </SettingRow>
        </div>
    )
}

export default ThemeSettingsInput