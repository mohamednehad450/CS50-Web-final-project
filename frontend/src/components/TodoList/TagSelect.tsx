import React, { FC, useEffect, useState } from 'react'
import { addNewTag, getTages, useAuth } from '../../API/'
import { IconButton, Select } from '../common'
import NewTagOverlay from './NewTagOverlay'

import { ReactComponent as Circle } from '../../icons/circle.svg'
import { ReactComponent as Add } from '../../icons/add-fill.svg'

import { Tag } from '../../API'

interface TagSelectProps {
    selected?: Tag
    onChange: (tag: Tag) => void
}

const TagSelect: FC<TagSelectProps> = ({ selected, onChange }) => {

    const auth = useAuth();
    const [addTagOverlay, setAddTagOverlay] = useState(false)

    const [tags, setTags] = useState<Tag[]>([])
    useEffect(() => {
        !tags.length && getTages(auth).then((tags) => {
            if (tags) {
                setTags(tags)
                onChange(tags[0])
            }
        })
    }, [auth, tags, onChange])

    return (
        <>
            {addTagOverlay &&
                <NewTagOverlay
                    onSubmit={(tag) => {
                        addNewTag(tag, auth).then((tag) => {
                            if (tag) {
                                setTags([...tags, tag])
                                onChange(tag)
                            }
                        })
                    }}
                    close={() => setAddTagOverlay(false)}
                />
            }
            <Select
                options={tags}
                selected={selected}
                onChange={onChange}
                customInput={({ selected, onClick }) => selected ? (
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