import { FC } from "react";
import { useStats } from ".";
import NumCard from "./NumCard";


interface SummaryProps { }

const Summary: FC<SummaryProps> = () => {

    const { summary } = useStats()
    const {
        todoAdded,
        todoFinished,
        stepsFinished,
        pomodoroSession
    } = summary



    return (
        <>
            <div className="section-header margin">
                Today's Summary
            </div>
            <div className="summary-container">
                <span className="numcard-section" >
                    <NumCard title="Todos Added" count={todoAdded} />
                    <NumCard title="Todos Completed" count={todoFinished} />
                </span>
                <span className="numcard-section" >
                    <NumCard title="Steps Completed" count={stepsFinished} />
                    <NumCard title="Pomodoro Sessions" count={pomodoroSession} />
                </span>
            </div>

        </>
    )
}


export default Summary


