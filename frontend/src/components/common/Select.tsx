import React, { ReactNode, useState, } from 'react'


// TODO: Implement default behavior

interface Option {
    id: number | string
    label?: string
}

interface SelectProps<T extends Option> {
    onChange: (arg: T) => void;
    options: T[]
    selected: T
    customInput?: (props: { selected: T, onClick: () => void }) => ReactNode
    customRow?: (props: { onClick: () => void, option: T, isSelected: boolean }) => ReactNode
    headerOption?: (arg: { close: () => void }) => ReactNode
}

function Select<T extends Option>({
    customInput,
    selected,
    options,
    customRow,
    onChange,
    headerOption,
}: SelectProps<T>) {
    const [open, setOpen] = useState(false)
    return (
        <>
            {customInput && customInput({ onClick: () => setOpen(!open), selected })}
            {open && (
                <>
                    <div className="dismiss" onClick={() => setOpen(false)}></div>
                    <div className="dropdown">
                        {headerOption && headerOption({ close: () => setOpen(false) })}
                        {options.map(option => (
                            customRow &&
                            customRow({
                                isSelected: option.id === selected.id,
                                option,
                                onClick: () => {
                                    onChange(option)
                                    setOpen(false)
                                }
                            })
                        ))}
                    </div>
                </>
            )}
        </>
    )
}

export default Select

