import React from 'react'

import '../style/navbar.css'



export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light">
                <a href="#" className="navbar-brand">
                  <img src="https://pbs.twimg.com/profile_images/483307375248424960/HaEZPYK8_400x400.jpeg" height="45" width="45" alt="CoolBrand"/>
                </a>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav">
                        <a href="#" className="nav-item nav-link active">EMIR</a>
                </div>
                </div>
        </nav>
    )
}
