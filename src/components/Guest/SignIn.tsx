import {useState} from "react";

const SignIn = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleClickSignIn = () => {
        // TODO Signin
        alert('Sign in')
    }
    const handleClickClear = () => {
        setLogin('');
        setPassword('');
    }

    return (
        <div>
            <label>Login:
                <input
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
            </label>
            <label>Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>

            <button onClick={handleClickSignIn}>Sign In</button>
            <button onClick={handleClickClear}>Clear</button>
        </div>
    );
};

export default SignIn;