import { FC } from "react"
import { useSettings } from "../Settings"

const ThemeProvider: FC = ({ children }) => {

    const { settings } = useSettings()
    return (
        <div className={settings.themeSettings}>
            {children}
        </div>
    )
}


export default ThemeProvider