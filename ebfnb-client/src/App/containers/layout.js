/** @jsx jsx */
import {jsx,css} from '@emotion/core'
import {Link} from "react-router-dom"
import { withRouter } from "react-router"
import User from './User'
import {useContext} from 'react'

const navCss=css`
    display:flex;
    overflow: hidden;
    background-color: black; 
    height:50px;
`
const logoCss=css`
    width:100px;
    background-image:url("fnb-logo.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
`
const onHoverMenuItemCss=css`
    &:hover,
    &:active,
    &:focus {
        color: white;
    }
`
const activeMenuItemCss=css`
    color:white;
    cursor: default;
    border-bottom: 5px solid red;
`
const defaultMenuItemCss=css`
    color: #bbb;
    padding: 14px 16px;
    text-align: center;
    text-decoration: none;
    font-size:17px;
`
const MenuItem=withRouter(
    ({to,location:{pathname},...props})=>{
        const css=[
            defaultMenuItemCss,
            (pathname===to)?activeMenuItemCss:onHoverMenuItemCss
        ]
        return <Link {...{to,css,...props}} />
    }
)
const noCursorCss=css`cursor: default`
const LogoItem=withRouter(
    ({to,location:{pathname},...props})=>{
        const css=[
            logoCss,
            (pathname===to) && noCursorCss
        ]
        return <Link title='Home' {...{to,css,...props}} />
    }
)
const Layout=({children})=>{
    const {isRegistered}=useContext(User)
    return (             
        <nav css={navCss}>
            <LogoItem to='/'/>
            <MenuItem to='/about'>About</MenuItem>
            {/* <MenuItem to='/'>Home</MenuItem> */}
            {isRegistered?(<MenuItem to='/tasks'>Tasks</MenuItem>):null}         
        </nav>
    )
}
export default Layout