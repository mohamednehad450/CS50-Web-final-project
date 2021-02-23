import Axios from 'axios'
import { User } from './auth';


export interface Tag {
    color: string
    label: string
    id: string | number
}

export const createEmptyTag = (): Partial<Tag> => {
    return {
        label: '',
        color: '',
    }
}



export const getTages = async (user?: User): Promise<Tag[]> => {
    const { data } = await
        Axios.get<Tag[]>('/api/tags/', {
            headers: {
                "Authorization": `JWT ${user?.token}`
            }
        })
    return data
};
export const addNewTag = async (tag: Partial<Tag>, user?: User): Promise<Tag> => {
    const { data } =
        await Axios.post<Tag>('/api/tags/', tag, {
            headers: {
                "Authorization": `JWT ${user?.token}`
            }
        })
    return data
}
