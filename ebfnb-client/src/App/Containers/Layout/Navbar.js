import React from 'react'
import { Link } from "react-router-dom"
import {Navbar} from 'react-bulma-components/full'
import ForRegisteredUser from '../../Components/ForRegisteredUser'
import ForUnregisteredUser from '../../Components/ForUnregisteredUser'

const DefaultMenu=()=>{return (
    <React.Fragment>
        <Navbar.Item renderAs='div'>
            <Link to="/">Home</Link>
        </Navbar.Item>
        <Navbar.Item renderAs='div'>
            <Link to="/about">About</Link>
        </Navbar.Item>
        <Navbar.Item renderAs='div'>
            <Link to="/volunteer">Volunteer</Link>
        </Navbar.Item>
    </React.Fragment>
)}
const TasksDropdownMenu=()=>{return (
    <Navbar.Item renderAs='div' dropdown hoverable>
        <Navbar.Link>Tasks</Navbar.Link>
        <Navbar.dropdown>
            <Navbar.Item renderAs='div'>
                <Link to="/myTasks">My tasks</Link>
            </Navbar.Item>
        </Navbar.dropdown>
    </Navbar.Item>
)}
const AccountsMenu=()=>{return (
    <Navbar.Item renderAs='div'>
        <React.Fragment>
            <div className='buttons'>
                <ForRegisteredUser>
                    <Link to="/signout" className='button is-primary'>
                        <strong>Sign out</strong>
                    </Link>
                    <Link to="/profile" className="button is-light">
                        My profile
                    </Link>
                </ForRegisteredUser>
                {/* <ForUnregisteredUser>
                    <Link to="/signup" className="button is-primary">
                        <strong>Sign up</strong>
                    </Link>
                    <Link to="/login" className="button is-light">
                        Log in
                    </Link>
                </ForUnregisteredUser> */}
            </div> 
        </React.Fragment>
    </Navbar.Item>
)}
export default ()=>{
    return (
        <Navbar 
          fixed='top'
          color='primary'
          role="navigation" 
          aria-label="main navigation"
        >
          <Navbar.Brand>
            <Navbar.Item renderAs="a" href="#">
              <img
                src="https://bulma.io/images/bulma-logo.png"
                alt="Bulma: a modern CSS framework based on Flexbox"
                width="112"
                height="28"
              />
            </Navbar.Item>
            <Navbar.Burger/>
          </Navbar.Brand>
          <Navbar.Menu>
            <Navbar.Container>
               <DefaultMenu/>
                <ForRegisteredUser>
                   <TasksDropdownMenu/>
                </ForRegisteredUser>
            </Navbar.Container>
            <Navbar.Container position="end">
                <AccountsMenu/>
            </Navbar.Container>
          </Navbar.Menu>
        </Navbar>
      )
}

