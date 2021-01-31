import React, { FC, useState } from 'react'
import { IconButton, Select } from '../common'
import NewTagOverlay from './NewTagOverlay'
import { useTodo } from '.'

import { ReactComponent as Circle } from '../../icons/circle.svg'
import { ReactComponent as Add } from '../../icons/add-fill.svg'

import type { Tag } from '../../API'

interface TagSelectProps {
    selected?: Tag['id']
    onChange: (tag: Tag) => void
}

const TagSelect: FC<TagSelectProps> = ({ selected, onChange }) => {

    const [addTagOverlay, setAddTagOverlay] = useState(false)

    const { tags, addNewTag, getTag } = useTodo()


    return (
        <>
            {addTagOverlay &&
                <NewTagOverlay
                    onSubmit={(t) => onChange(t)}
                    submit={addNewTag}
                    close={() => setAddTagOverlay(false)}
                />
            }
            <Select
                border
                scroll
                options={tags}
                selected={getTag(selected)}
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
                        icon={<Circle fill={"#fff"} />}
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