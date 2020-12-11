import React, { useState } from 'react'
import { useRouteMatch } from 'react-router-dom'

interface ScreenProps {
    route: string
    exact?: boolean
    lazy?: boolean
    unmountOnExit?: boolean
    children: React.ReactNode
}

const Screen = ({ route, exact, lazy, unmountOnExit, children }: ScreenProps) => {

    const match = useRouteMatch(route)
    const show = match && (exact ? match.isExact : true)
    const [rendered, setRenderd] = useState(!lazy)
    if (!show && unmountOnExit) {
        return null
    }
    if (!rendered && show) {
        setRenderd(true)
    }
    return (rendered ?
        <div className="container" style={{ display: !show ? 'none' : '' }}>
            {children}
        </div>
        : null)
}

export default Screen