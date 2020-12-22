import React, { FC, useState } from 'react'
import { SliderPicker } from 'react-color'
import { createEmptyTag } from '../../API'

import { Overlay, Button, ButtonsRow, TextInput, ColorTag } from '../common'

import type { Tag } from '../../API'



interface NewTagOverlayProps {
    close: () => void
    onSubmit: (tag: Tag) => void
}

const NewTagOverlay: FC<NewTagOverlayProps> = ({ close, onSubmit }) => {

    const [tag, setTag] = useState<Tag>(createEmptyTag())

    return (
        <Overlay>
            <div className='overlay-container'>
                <div className='input-row padding-top-3'>
                    <ColorTag tag={tag} />
                    <TextInput
                        placeholder="Tag Name"
                        onChange={(label) => setTag({ ...tag, label })}
                        value={tag.label}
                    />
                </div>
                <div className='grow'></div>
                <SliderPicker
                    className="padding"
                    color={tag.color}
                    onChange={(color) => setTag({ ...tag, color: color.hex })}
                />
                <div className="grow"></div>
                <ButtonsRow>
                    <Button type='secondary' onClick={close}>Cancel</Button>
                    <Button
                        disabled={!tag.label || !tag.color}
                        type='primary'
                        onClick={() => { onSubmit(tag); close() }}
                    >
                        Add
                    </Button>
                </ButtonsRow>
            </div>
        </Overlay>
    )
}

export default NewTagOverlay