import { Header } from '../components/common'
import { HabitStats, PomodoroStats, Summary, TodoStats } from '../components/Graphs'

const Graphs = () => {
    return (
        <div className="container">
            <Header
                title="Graphs"
            />
            <Summary />
            <PomodoroStats />
            <TodoStats />
            <HabitStats />
        </div>
    )
}

export default Graphs