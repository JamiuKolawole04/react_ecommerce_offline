import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from '../../../../utils/axios'
const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const registerSubmit = async e => {
        e.preventDefault()

        try {
            const { data } = await axios({
                method: "post",
                url: "/user/register",
                data: { ...user }
            });


            const setCookie = (cookieName, cookieValue, expirationDays) => {
                let date = new Date();
                date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
                const expires = `expires=${date.toUTCString()}`;
                document.cookie = `${cookieName}=${cookieValue}; path=/user/refresh_token;samesite=none;secure=true;${expires}`;
            }

            setCookie("refreshtoken", data.refreshtoken, 7);

            localStorage.setItem("firstLogin", JSON.stringify(true));

            window.location.href = "/"
        } catch (err) {
            alert(err.response.data.msg)
        }
    }


    return (
        <div className="login-page">
            <form onSubmit={registerSubmit}>
                <h2>Register</h2>
                <input
                    type="text"
                    name="name"
                    required
                    placeholder="Name"
                    value={user.name}
                    onChange={onChangeInput}

                />
                <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    value={user.email}
                    onChange={onChangeInput}

                />
                <input
                    type="password"
                    name="password"
                    required
                    placeholder="Password"
                    value={user.password}
                    onChange={onChangeInput}
                    autoComplete="off"

                />

                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;