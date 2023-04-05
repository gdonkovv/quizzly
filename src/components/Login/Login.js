import { Link } from 'react-router-dom';

import { useAuthContext } from "../../contexts/AuthContext";
import { useForm } from '../../hooks/useForm';

import "./Login.css";

export const Login = ({ onError }) => {
    const { onLoginSubmit } = useAuthContext();
    const { values, changeHandler, onSubmit } = useForm({
        "email": '',
        "password": '',
    }, (data) => onLoginSubmit(data, onError));

    return (
        <section className="login">
            <div className="loginWrapper">
                <h2>Login</h2>
                <form method="post" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={values.email} onChange={changeHandler} />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={values.password} onChange={changeHandler} />
                    </div>
                    <div className="loginBtnWrapper">
                        <input type="submit" value="Login" />
                    </div>
                </form>
                <p>
                    Not registered yet? You can register from this <Link to="/register">link</Link>.
                </p>
            </div>
        </section>
    );
}