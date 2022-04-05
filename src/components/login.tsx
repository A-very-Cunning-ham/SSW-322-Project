import {useNavigate} from 'react-router-dom';
import React, {useEffect} from 'react';

export function Login() {
    const navigate = useNavigate();

    function handleLogin(e: any) {
        e.preventDefault();

        const form = e.target;
        const user = {
            username: form[0].value,
            password: form[1].value
        };

        fetch("/auth", { 
            method: "GET", 
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("token", data.token)}
        )
    }

    useEffect(() => {
        fetch("/auth/verify", {
            headers: {
                "x-access-token": localStorage.getItem("token") as string
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? navigate("/"): null)
    }, [])

    return (
        <form onSubmit={event => handleLogin(event)}>
            <input required type = "username"/>
            <input required type = "password"/>
            <input type = "submit" value = "Submit"/>
        </form>
    )
}