import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";


export default function Login(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json();
        if (json.success) {
            // Save authToken and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/")
            props.showAlert("Logged in Successfully", "success")
        } else {
            props.showAlert(json.error, "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="container-fluid">
            <h2>Login to use NoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} name='email' id="email" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} name='password' id="password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-info">Submit</button>
            </form>
            <p className='mt-2'>New User ? <Link to="/signup" >Sign up</Link></p>
        </div>
    )
}
