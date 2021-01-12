import { FC } from "react"
import { usePomodoro, CircularProgress } from "."
import { formatTime } from "../../utils"

import { ReactComponent as PlayIcon } from '../../icons/play.svg'
import { ReactComponent as PauseIcon } from '../../icons/pause.svg'


interface PomodoroClockProps { }



const PomodoroClock: FC<PomodoroClockProps> = () => {

    const { state: { timeLeft, defaultTime, running, mode, }, start, stop } = usePomodoro()


    return (
        <div className={`center pomodoro-${mode}`} onClick={() => running ? stop() : start()}>
            <CircularProgress
                size={420}
                progress={timeLeft / defaultTime}
            >
                <text className="progress-text" x="50%" y="40%" dominantBaseline="middle" textAnchor="middle">
                    {formatTime(timeLeft)}
                </text>
                {running ?
                    <PauseIcon className="pomodoro-icon" width={64} height={64} x="41%" y="60%" /> :
                    <PlayIcon className="pomodoro-icon" width={64} height={64} x="41%" y="60%" />
                }
            </CircularProgress>
        </div>
    )
}

export default PomodoroClock