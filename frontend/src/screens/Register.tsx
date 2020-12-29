import React, { FC, useState } from 'react'
import { Link, Redirect, } from 'react-router-dom';
import { routes } from '.';
import { useAuth } from '../API'
import { Button, TextInput } from '../components/common';
import { validateUsername } from '../utils';


const Register: FC = () => {
    let auth = useAuth();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')


    if (auth.user) {
        return <Redirect to={routes.APP} />
    }
    return (
        <div className="container-sm">
            <form onSubmit={(e) => e.preventDefault()} className="login-form">
                <div className="col">
                    <TextInput
                        className="ver-margin"
                        placeholder="Username"
                        onChange={(s) => validateUsername(s) && setUsername(s)}
                        value={username}
                        autoComplete="off"
                    />
                    <TextInput
                        placeholder="Password"
                        className="ver-margin"
                        onChange={(password) => setPassword(password)}
                        value={password}
                        type='password'
                        autoComplete="new-password"
                    />
                    <TextInput
                        placeholder="Confirm Password"
                        className="ver-margin"
                        onChange={(confirm) => setConfirm(confirm)}
                        value={confirm}
                        type='password'
                        autoComplete="new-password"
                    />
                </div>
                <div className="col ver-margin">
                    <Button
                        disabled={!username || !password || confirm !== password}
                        type="primary"
                        className="btn-row"
                        onClick={() => {
                            auth.signin(
                                username,
                                password,
                            )
                        }}
                    >
                        Register
                    </Button>
                    <Link
                        to={routes.SIGININ}
                    >
                        Already have an Account? Sign in here.
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Register 