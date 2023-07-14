import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

export default function Signup(props) {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        })
        const json = await response.json();
        if (credentials.password !== credentials.cpassword) {
            props.showAlert("Confirm Password did'nt match !", "danger")
        } else {
            if (json.success) {
                // Save authToken and redirect
                localStorage.setItem('token', json.authtoken);
                navigate("/login")
                props.showAlert("Account Created. Please Login", "success")
            } else {
                props.showAlert(json.error + ". Please Login", "danger")
            }
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="container-fluid">
            <h2>Sign up for NoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} name='name' id="name" onChange={onChange} minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} name='email' id="email" onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} name='password' id="password" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={credentials.cpassword} name='cpassword' id="cpassword" onChange={onChange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-info">Submit</button>
            </form>
            <p className='mt-2'>Already Register ? <Link to="/login" >Login.</Link></p>
        </div>
    )
}