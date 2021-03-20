import React from 'react'
import { Header } from '../components/common'
import { Summary } from '../components/Graphs'

const Graphs = () => {
    return (
        <div className="container">
            <Header
                title="Graphs"
            />
            <Summary />
        </div>
    )
}

export default Graphs