import { FC } from "react"
import { Select } from '../common'

import { ReactComponent as MoreIcon } from '../../icons/more.svg'

interface Action {
    label: string
    action: () => void
}

interface ActionSelectProps {
    id: string | number
    actions: Action[]
}

const ActionSelect: FC<ActionSelectProps> = ({
    actions,
}) => {
    return (
        <div>
            <Select
                right
                options={actions.map(a => ({ ...a, id: a.label }))}
                customInput={({ onClick }) => (
                    <span onClick={(e) => { e.stopPropagation(); onClick() }} className="icon icon-gray">
                        <MoreIcon />
                    </span>
                )}
                customRow={({ onClick, option }) => (<div onClick={(e) => { e.stopPropagation(); onClick() }} className="select-item select-item-sm align-row">{option.label}</div>)}
                onChange={(o) => o.action()}
            />
        </div>
    )
}

export default ActionSelect