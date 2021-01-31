import { FC } from 'react'

interface TextInputProps {
    placeholder?: string
    className?: string
    value?: string
    autofocus?: boolean
    type?: string
    autoComplete?: string
    onChange: (value: string) => void
    errors?: string[]
}

const TextInput: FC<TextInputProps> = ({
    placeholder,
    onChange,
    value = '',
    className = "",
    type = "",
    autofocus = false,
    autoComplete = "",
    errors = []
}) => {
    return (
        <span className={`textinput-container ${className}`}>
            <input
                className={`textinput ${!errors.length ? '' : 'textinput-invalid'}`}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                value={value}
                autoFocus={autofocus}
                type={type || 'text'}
                autoComplete={autoComplete}
            >
            </input>
            {errors.length ? (
                <ul className="textinput-errors">
                    {errors.map(s => (<li className="textinput-error">{s}</li>))}
                </ul>
            ) : null}
        </span>
    )
}

export default TextInput