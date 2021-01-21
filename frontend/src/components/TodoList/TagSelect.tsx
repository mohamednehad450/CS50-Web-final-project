import React, { FC, useEffect, useState } from 'react'
import { IconButton, Select } from '../common'
import NewTagOverlay from './NewTagOverlay'
import { useTodo } from '.'

import { ReactComponent as Circle } from '../../icons/circle.svg'
import { ReactComponent as Add } from '../../icons/add-fill.svg'

import type { Tag } from '../../API'

interface TagSelectProps {
    selected?: Tag
    onChange: (tag: Tag) => void
}

const TagSelect: FC<TagSelectProps> = ({ selected, onChange }) => {

    const [addTagOverlay, setAddTagOverlay] = useState(false)

    const { getTags, tags, addNewTag } = useTodo()
    useEffect(() => {
        !tags.length && getTags()
    }, [tags, getTags])

    return (
        <>
            {addTagOverlay &&
                <NewTagOverlay
                    onSubmit={(t) => { addNewTag(t); onChange(t) }}
                    close={() => setAddTagOverlay(false)}
                />
            }
            <Select
                border
                scroll
                options={tags}
                selected={selected}
                onChange={onChange}
                CustomInput={({ selected, onClick }) => selected ? (
                    <IconButton
                        className='select-input'
                        onClick={onClick}
                        icon={<Circle fill={selected.color} />}
                    />
                ) :
                    (<IconButton
                        className='select-input icon-gray'
                        onClick={onClick}
                        icon={<Add />}
                    />)
                }
                CustomRow={({ option, onClick, isSelected }) => (
                    <IconButton
                        key={option.id}
                        className={`select-item ${isSelected ? 'select-item-selected' : ''}`}
                        onClick={onClick}
                        icon={<Circle fill={option.color} />}
                        label={option.label}
                    />
                )}
                Header={({ close }) => (
                    <IconButton
                        className="select-item icon-gray"
                        icon={<Add />}
                        onClick={() => { setAddTagOverlay(true); close() }}
                        label="New Tag"
                    />
                )}
            />
        </>
    )
}

export default TagSelect