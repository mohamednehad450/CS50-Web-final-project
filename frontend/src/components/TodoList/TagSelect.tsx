import React, { FC, useEffect, useState } from 'react'
import { addNewTag, getTages } from '../../API/api'
import { IconButton, Select } from '../common'
import NewTagOverlay from './NewTagOverlay'

import { ReactComponent as Circle } from '../../icons/circle.svg'
import { ReactComponent as Add } from '../../icons/add-fill.svg'

import type { Tag } from '../../API'

interface TagSelectProps {
    selected: Tag
    onChange: (tag: Tag) => void
}

const TagSelect: FC<TagSelectProps> = ({ selected, onChange }) => {


    const [addTagOverlay, setAddTagOverlay] = useState(false)

    const [tags, setTags] = useState<Tag[]>([])
    useEffect(() => {
        getTages().then(setTags)
    }, [])

    return (
        <>
            {addTagOverlay &&
                <NewTagOverlay
                    onSubmit={(tag) => {
                        addNewTag(tag).then(setTags) // submit to api
                        setTags([...tags, tag]) // update current list
                        onChange(tag) // update parant form
                    }}
                    close={() => setAddTagOverlay(false)}
                />
            }
            <Select
                options={tags}
                selected={selected}
                onChange={onChange}
                customInput={({ selected, onClick }) => (
                    <IconButton
                        className='select-input'
                        onClick={onClick}
                        icon={<Circle fill={selected.color} />}
                    />
                )}
                customRow={({ option, onClick, isSelected }) => (
                    <IconButton
                        className={`${isSelected ? 'selected' : 'select-item'}`}
                        onClick={onClick}
                        icon={<Circle fill={option.color} />}
                        label={option.label}
                    />
                )}
                headerOption={({ close }) => (
                    <IconButton
                        className="select-item icon-prime"
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