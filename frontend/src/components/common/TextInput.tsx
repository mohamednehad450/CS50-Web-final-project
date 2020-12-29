import React, { FC, useState } from 'react'

interface TextInputProps {

    placeholder?: string
    className?: string
    value?: string
    autofocus?: boolean
    type?: string
    autoComplete?: string
    onChange?: (value: string) => void
}

const TextInput: FC<TextInputProps> = ({
    placeholder,
    onChange,
    value = '',
    className = "",
    type = "",
    autofocus = false,
    autoComplete = ""
}) => {
    const [valid, setValid] = useState(true)
    return (
        <input
            className={`textinput ${valid ? '' : 'textinput-invalid'} ${className}`}
            onChange={({ target: { value } }) => {
                onChange && onChange(value)
                setValid(!!value)
            }}
            placeholder={placeholder}
            value={value}
            autoFocus={autofocus}
            type={type || 'text'}
            autoComplete={autoComplete}
        >
        </input>
    )
}

export default TextInput