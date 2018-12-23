import React,{useState} from 'react'
import { Link } from "react-router-dom"
import {Navbar} from 'react-bulma-components/full'
import {ForRegisteredUser} from '../ForRegisteredUser'
import {ForUnregisteredUser} from '../ForUnregisteredUser'

const DefaultMenu=()=>{(
    <React.Fragment>
        <Navbar.Item>
            <Link to="/">Home</Link>
        </Navbar.Item>
        <Navbar.Item>
            <Link to="/about">About</Link>
        </Navbar.Item>
        <Navbar.Item>
            <Link to="/volunteer">Volunteer</Link>
        </Navbar.Item>
    </React.Fragment>
)}
const TasksDropdownMenu=()=>{(
    <Navbar.Item dropdown hoverable>
        <Navbar.Link>Tasks</Navbar.Link>
        <Navbar.dropdown>
            <Navbar.Item>
                <Link to="/myTasks">My tasks</Link>
            </Navbar.Item>
        </Navbar.dropdown>
    </Navbar.Item>
)}
const AccountsMenu=()=>{(
    <Navbar.Item>
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
                <ForUnregisteredUser>
                    <Link to="/signup" className="button is-primary">
                        <strong>Sign up</strong>
                    </Link>
                    <Link to="/login" className="button is-light">
                        Log in
                    </Link>
                </ForUnregisteredUser>
            </div> 
        </React.Fragment>
    </Navbar.Item>
)}
export default ()=>{
    const [isOpen,setOpen]=useState(false)
    return (
        <Navbar fixed
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
            <Navbar.Burger
              active={isOpen}
              onClick={() =>setOpen(!isOpen)}
            />
          </Navbar.Brand>
          <Navbar.Menu active={isOpen}>
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

