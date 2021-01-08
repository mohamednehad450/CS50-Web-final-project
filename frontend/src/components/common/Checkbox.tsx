import { FC } from "react";
import { ReactComponent as Check } from '../../icons/checkbox.svg'
import { ReactComponent as Checked } from '../../icons/checkedbox.svg'

interface CheckboxProps {
    disabled?: boolean
    checked?: boolean
    onChange: (checked: boolean) => void
    className?: string
}


const Checkbox: FC<CheckboxProps> = ({
    disabled = false,
    checked = false,
    onChange,
    className = ''
}) => {


    return (
        <span
            className={`checkbox ${disabled ? 'checkbox-disabled' : ''} ${className}`}
            onClick={() => !disabled && onChange(!checked)}
        >
            {checked ? <Checked /> : <Check />}
        </span>
    )
}

export default Checkbox