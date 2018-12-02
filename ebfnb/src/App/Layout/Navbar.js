import React from 'react'
import { Link } from "react-router-dom"
import {useCurrentUser} from '../hooks'

export default ()=>{
    const {forRole}=useCurrentUser()
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div  className="navbar-brand">
                <a className="navbar-item" href="https://bulma.io">
                    <img src="https://bulma.io/images/bulma-logo.png" alt="bulma-logo" width="112" height="28"/>
                </a>

                <a role="button" href='#!' className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div  className="navbar-menu" id="navbarBasicExample">
                <div  className="navbar-start">
                    <Link to="/" className="navbar-item">
                        Home
                    </Link>
                    <Link to="/about" className="navbar-item">
                        About
                    </Link>
                    <Link to="/volunteer" className="navbar-item">
                        Volunteer
                    </Link>
                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link" href="/">
                            More
                        </a>

                        <div className="navbar-dropdown">
                            <Link to="/myTasks" className={forRole('volunteer')("navbar-item")}>
                                My tasks
                            </Link>
                            <Link to="/createTask" className={forRole('taskCreator')("navbar-item")}>
                                Create task
                            </Link>
                            <Link className="navbar-item" to="/contact">
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
                <div  className="navbar-end">
                    <div className="buttons">
                        <Link to="/signout" className={forRole('registered')("button is-primary")}>
                            <strong>Sign out</strong>
                        </Link>
                        <Link to="/profile" className={forRole('registered')("button is-light")}>
                            My profile
                        </Link>
                        <Link to="/signup" className={forRole('unregistered')("button is-primary")}>
                            <strong>Sign up</strong>
                        </Link>
                        <Link to="/login" className={forRole('unregistered')("button is-light")}>
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
     )
}
