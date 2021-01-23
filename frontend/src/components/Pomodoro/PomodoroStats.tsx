import { FC } from "react";
import { usePomodoro } from ".";

interface PomodoroStatsProps { }


const PomodoroStats: FC<PomodoroStatsProps> = () => {

    const { stats } = usePomodoro()

    return (
        <div className="pomodoro-stats">
            <span className="pomodoro-count">
                <span className="pomodoro-count-title">ROUND</span>
                <span className="pomodoro-count-value">{stats.round}/4</span>
            </span>
            <span className="pomodoro-count">
                <span className="pomodoro-count-title">GOAL</span>
                <span className="pomodoro-count-value">{stats.goal}/12</span>
            </span>
        </div>
    )
}

export default PomodoroStats