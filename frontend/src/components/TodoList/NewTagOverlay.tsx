import React, { FC, useState } from 'react'
import { SliderPicker } from 'react-color'
import { createEmptyTag, } from '../../API'

import { Overlay, Button, ButtonsRow, TextInput, ColorTag, ErrorList } from '../common'

import type { Tag, TagError } from '../../API'



interface NewTagOverlayProps {
    close: () => void
    onSubmit: (tag: Tag) => void
    submit: (tag: Partial<Tag>) => Promise<Tag>
}

const NewTagOverlay: FC<NewTagOverlayProps> = ({ close, onSubmit, submit }) => {

    const [tag, setTag] = useState<Partial<Tag>>(createEmptyTag())
    const [err, setErr] = useState<TagError>({})

    return (
        <Overlay>
            <div className='overlay-container'>
                <div className='input-row padding-top-3'>
                    <ColorTag tag={tag} />
                    <TextInput
                        placeholder="Tag Name"
                        onChange={(label) => setTag({ ...tag, label })}
                        value={tag.label}
                        errors={[...err.label || [], ...err.non_field_errors || []]}
                    />
                </div>
                <div className='grow'></div>
                <SliderPicker
                    className="padding"
                    color={tag.color}
                    onChange={(color) => setTag({ ...tag, color: color.hex })}
                />
                <ErrorList errors={err.color} />
                <div className="grow"></div>
                <ButtonsRow>
                    <Button type='secondary' onClick={close}>Cancel</Button>
                    <Button
                        type='primary'
                        onClick={() => submit(tag).then(t => { onSubmit(t); close() }).catch(err => setErr(err))}
                    >
                        Add
                    </Button>
                </ButtonsRow>
            </div>
        </Overlay>
    )
}

export default NewTagOverlay