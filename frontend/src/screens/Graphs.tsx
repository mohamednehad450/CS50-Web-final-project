import { Header } from '../components/common'
import { PomodoroStats, Summary, TodoStats } from '../components/Graphs'

const Graphs = () => {
    return (
        <div className="container">
            <Header
                title="Graphs"
            />
            <Summary />
            <TodoStats />
            <PomodoroStats />
        </div>
    )
}

export default Graphs