import React from 'react'
import { Link } from "react-router-dom"
import {withCurrentUser} from '../hoc'

const AccountControls=withCurrentUser(
    ({forRole})=>(
        <div class="buttons">
            <Link to="/signout" className={forRole('registered')("button is-primary")}>
                <strong>Sign out</strong>
            </Link>
            <Link to="/profile" class={forRole('registered')("button is-light")}>
                My profile
            </Link>
            <Link to="/signup" className={forRole('unregistered')("button is-primary")}>
                <strong>Sign up</strong>
            </Link>
            <Link to="/login" class={forRole('unregistered')("button is-light")}>
                Log in
            </Link>
        </div>
    )
)
const Brand=({targetMenuId})=>(
    <div>
        <a className="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
        </a>

        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
           data-target={targetMenuId}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>
)
const Menu=withCurrentUser(
    ({forRole})=>{
        const LeftMenu=()=>(
            <div>
                <Link to="/" className="navbar-item">
                    Home
                </Link>
                <Link to="/about" class="navbar-item">
                    About
                </Link>
                <Link to="/volunteer" class="navbar-item">
                    Volunteer
                </Link>
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                        More
                    </a>

                    <div class="navbar-dropdown">
                        <Link to="/myTasks" class={forRole('volunteer')("navbar-item")}>
                            My tasks
                        </Link>
                        <Link to="/createTask" class={forRole('taskCreator')("navbar-item")}>
                            Create task
                        </Link>
                        <a class="navbar-item">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        )
        return (
            <div>
                <LeftMenu className="navbar-start"/>
                <AccountControls className="navbar-end"/>
            </div>
        )
    }
)
export default ()=>(
   <nav class="navbar" role="navigation" aria-label="main navigation">
       <Brand  className="navbar-brand" targetMenuId="navbarBasicExample"/>
       <Menu className="navbar-menu" id="navbarBasicExample"/>
   </nav>
)
