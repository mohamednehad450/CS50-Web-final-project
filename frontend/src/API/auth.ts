import { useState, useContext, createContext, } from 'react'
import { getItemFromStorage, removeItemFromStorage, setItemToStorage } from '../utils';

// Types
export interface User {
    token: string
    username: string
}
export type Register = (
    username: string,
    password: string,
    cb?: () => void,
) => Promise<void>
export type SignIn = (
    username: string,
    password: string,
    cb?: () => void,
) => Promise<void>
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

const useProvideAuth = (): AuthContext => {

    const [user, setUser] = useState<User | undefined>(getItemFromStorage('user'));

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
        // TODO: Register logic here
        setTimeout(() => {
            updateUser({ token: '123', username })
            cb && cb()
        }, 100)
    };
    const signin: SignIn = async (username, password, cb) => {
        // TODO: Signin logic here
        setTimeout(() => {
            updateUser({ token: '123', username })
            cb && cb()
        }, 100)
    };
    const signout: SignOut = async (cb) => {
        // TODO: Signout logic here
        setTimeout(() => {
            updateUser(undefined)
            cb && cb()
        }, 100)
    };
    return {
        user,
        signin,
        signout,
        register,
    };
}

export { useProvideAuth, useAuth, authContext }