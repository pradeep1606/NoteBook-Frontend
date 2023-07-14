import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('login')
  }
  let location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-info bg-info sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand fn" to="/">NoteBook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''} fn1`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''} fn1`} to="/about">About</Link>
            </li>
          </ul>
          {localStorage.getItem('token') ? <button onClick={handleLogout} className='btn btn-outline-dark' >Log out</button> : <form className="d-flex">
            <Link className="btn btn-outline-dark mx-2" to="/login" role="button">Login</Link>
            <Link className="btn btn-outline-dark" to="/signup" role="button">Sign up</Link>
          </form>}
        </div>
      </div>
    </nav>

  )
}
