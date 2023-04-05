import { Link } from 'react-router-dom';

import { useAuthContext } from "../../contexts/AuthContext";
import { useForm } from '../../hooks/useForm';

import "./Register.css";

export const Register = ({ onError }) => {

    const { onRegisterSubmit } = useAuthContext();
    const { values, changeHandler, onSubmit } = useForm({
        "email": '',
        "username": '',
        "imageUrl": '',
        "password": '',
        "repass": '',
    }, (data) => onRegisterSubmit(data, onError));

    return (
        <section className="register">
            <div className="registerWrapper">
                <form method='post' onSubmit={onSubmit}>
                    <h2>Register</h2>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={values.email} onChange={changeHandler} />
                    </div>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" value={values.username} onChange={changeHandler} />
                    </div>
                    <div>
                        <label htmlFor="imageUrl">Image URL:</label>
                        <input type="text" id="imageUrl" name="imageUrl" value={values.imageUrl} onChange={changeHandler} />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={values.password} onChange={changeHandler} />
                    </div>
                    <div>
                        <label htmlFor="repass">Repeat Password:</label>
                        <input type="password" id="repass" name="repass" value={values.repass} onChange={changeHandler} />
                    </div>
                    <div className="registerBtnWrapper">
                        <input type="submit" value="Register" />
                    </div>
                </form>
                <p>
                    Already have an account? You can login from this
                    <Link to="/login">link</Link>.
                </p>
            </div>
        </section>
    );
}