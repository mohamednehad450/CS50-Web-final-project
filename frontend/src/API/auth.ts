import Axios from 'axios';
import { useState, useContext, createContext, useEffect, useCallback, } from 'react'
import { getItemFromStorage, removeItemFromStorage, setItemToStorage } from '../utils';

// Types
export interface User {
    token: string
    username: string
}
export interface UserError {
    username?: string[]
    password?: string[]
    non_field_errors?: string[]
}
export type Register = (
    username: string,
    password: string,
    cb?: () => void,
) => Promise<void | UserError>
export type SignIn = (
    username: string,
    password: string,
    cb?: () => void,
) => Promise<void | UserError>
export type SignOut = (cb?: () => void) => Promise<void>
export interface AuthContext {
    register: Register
    signin: SignIn
    signout: SignOut
    user?: User
}


const defaultAuthContext: AuthContext = {
    signin: async () => console.error('auth not initialized'),
    register: async () => console.error('auth not initialized'),
    signout: async () => console.error('auth not initialized'),
};

const authContext = createContext<AuthContext>(defaultAuthContext);

const useAuth = () => {
    return useContext(authContext);
}

const refreshToken = async (oldToken: string) => {
    try {
        const { data: { token } }
            = await Axios.post<{ token: string }>('/api/auth/refresh_token', {
                token: oldToken,
            }, {
                headers: {
                    "Authorization": `JWT ${oldToken}`,
                    "Content-Type": "application/json"
                }
            })
        return token
    } catch (error) {
        return false
    }
}

const AUTH_REFRESH_INTERVAL = 3 * 60 * 1000
const useProvideAuth = (): AuthContext => {

    const [user, setUser] = useState<User | undefined>(getItemFromStorage('user'));
    const [lastRefreshed, setLastRefreshed] = useState(0)

    const updateToken = useCallback(() => {
        if (Date.now() > lastRefreshed + AUTH_REFRESH_INTERVAL) {
            setLastRefreshed(Date.now())
            if (user) {
                refreshToken(user.token).then(token => {
                    if (token) {
                        updateUser({ ...user, token })
                    }
                    else {
                        updateUser(undefined)
                    }
                })
            }
        }
    }, [lastRefreshed, user])

    // Refreshing Token
    useEffect(() => {
        const interval = setInterval(updateToken, 3 * 1000)
        return () => clearInterval(interval)
    }, [updateToken])

    const updateUser = (user: User | undefined) => {
        if (user) {
            setUser(user)
            setItemToStorage('user', user)
        }
        else {
            setUser(undefined)
            removeItemFromStorage('user')
        }
    }


    const register: Register = async (username, password, cb) => {
        try {
            const { data } = await Axios.post<{ token: string }>('/api/auth/create_auth', {
                username,
                password,
            })
            updateUser({ username, token: data.token })
            cb && cb()

        } catch (error) {
            const { response, isAxiosError } = error

            if (isAxiosError) {
                const { data, status } = response
                if (status === 400) {
                    return data
                }
            }
        }
    };
    const signin: SignIn = async (username, password, cb) => {
        try {
            const { data } = await Axios.post<{ token: string }>('/api/auth/get_token', {
                username,
                password
            })
            updateUser({ username, token: data.token })
            cb && cb()
        } catch (error) {
            const { response, isAxiosError } = error

            if (isAxiosError) {
                const { data, status } = response
                if (status === 400) {
                    return data
                }
            }
        }
    };
    const signout: SignOut = async (cb) => {
        updateUser(undefined)
        cb && cb()
    };
    return {
        user,
        signin,
        signout,
        register,
    };
}

export { useProvideAuth, useAuth, authContext }