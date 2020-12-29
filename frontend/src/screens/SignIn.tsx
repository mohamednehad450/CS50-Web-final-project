import React, { FC, useState } from 'react'
import { Link, Redirect, } from 'react-router-dom';
import { routes } from '.';
import { useAuth } from '../API'
import { Button, TextInput } from '../components/common';
import { validateUsername } from '../utils';


const SignIn: FC = () => {
    let auth = useAuth();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    if (auth.user) {
        return <Redirect to={routes.APP} />
    }
    return (
        <div className="container-sm">
            <form onSubmit={(e) => e.preventDefault()} className="login-form">
                <div className="col">
                    <TextInput
                        placeholder="Username"
                        onChange={(s) => validateUsername(s) && setUsername(s)}
                        value={username}
                        className="ver-margin"
                    />
                    <TextInput
                        placeholder="Password"
                        onChange={(password) => setPassword(password)}
                        value={password}
                        type='password'
                        className="ver-margin"
                    />
                </div>
                <div className="col ver-margin">
                    <Button
                        disabled={!username || !password}
                        type="primary"
                        className="btn-row"
                        onClick={() => {
                            auth.signin(
                                username,
                                password,
                            )
                        }}
                    >
                        Sign In
                    </Button>
                    <Link
                        to={routes.REGISTER}
                        className="iconbutton"
                    >
                        Don't have an Account? Register here.
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default SignIn