import { Header } from '../components/common'
import { Summary, TodoStats } from '../components/Graphs'

const Graphs = () => {
    return (
        <div className="container">
            <Header
                title="Graphs"
            />
            <Summary />
            <TodoStats />
        </div>
    )
}

export default Graphs