import { FC, ReactNode, } from 'react'

interface ListRowProps {
    expanded?: boolean
    expandable?: boolean
    onClick?: () => void
    leftItem?: ReactNode
    rightItem?: ReactNode
    expandedItem?: ReactNode
    expandedClassName?: string
}


const ListRow: FC<ListRowProps> = ({
    onClick,
    expanded = false,
    expandedItem = null,
    expandedClassName = '',
    leftItem = null,
    rightItem = null,
}) => {
    return (
        <div className={`row-container ${(expanded && expandedItem) ? 'gray-bg' : ''}`}>
            <div onClick={() => onClick && onClick()} className="row">
                <div className="row-section">
                    {leftItem}
                </div>
                <div className="row-section">
                    {rightItem}
                </div>
            </div>
            {expandedItem && (
                <div className={`expandable-container ${expanded ? `expanded ${expandedClassName}` : ''}`}>
                    {expandedItem}
                </div>
            )}
            <hr></hr>
        </div>
    )
}


export default ListRow