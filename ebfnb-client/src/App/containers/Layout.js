/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { Link } from "react-router-dom"
import User from "./User"
import { useContext, useState } from "react"
import LayoutContainer from "../components/LayoutContainer"
import NavMenuItem from "../components/NavMenuItem"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const headerCss = css`
  background-color: black;
  height: 45px;
  margin-bottom: 1rem;
  width: 100%;
`
const navCss = css`
  display: flex;
`

const menuItemCss = {
  onHoverCss: css`
    &:hover,
    &:active,
    &:focus {
      color: white;
    }
  `,
  activeCss: css`
    color: white;
    cursor: default;
    border-bottom: 5px solid purple;
  `,
  css: css`
    color: #bbbbbb;
    display: inline-flex;
    font-size: 1rem;
    line-height: 28px;
    padding: 10px 1rem;
    text-align: center;
    text-decoration: none;
    vertical-align: top;
  `,
  disabledCss: css`
    color: #999999;
    cursor: default;
  `
}

const logoCss = css`
  background-image: url("/fnb-logo.png");
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  display: inline-flex;
  height: 50px;
  overflow-y: hidden;
  width: 50px;
`

const myFnbDropdownCss = css`
  display: block;
  min-width: 100px;
  position: absolute;
  background-color: #ffff;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  li {
    color: black;
    text-decoration: none;
    display: block;
    text-align: left;
    &:hover,
    &:active,
    &:focus {
      font-weight: 2px;
    }
  }
`
const hiddenDropdownCss = css`
  display: none;
`
const dropdownItemCss = css`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  &:hover,
  &:active,
  &:focus {
    font-weight: 2px;
  }
`

const LogoItem = ({ to, onActive }) => {
  return (
    <div onClick={onActive}>
      <Link title="Home" to={to} css={logoCss}>
        <span style={{ visibility: "hidden" }}>East Bay Food Not Bombs</span>
      </Link>
    </div>
  )
}

const MyFnbDropdownMenu = props => {
  const [isHidden, setIsHidden] = useState(true)
  return (
    <div onClick={() => setIsHidden(isHidden => !isHidden)}>
      <NavMenuItem {...menuItemCss} {...props} to="#">
        My FNB
        <span>
          <FontAwesomeIcon icon="caret-down" />
        </span>
      </NavMenuItem>
      <div
        css={
          isHidden || !props.isActive
            ? [myFnbDropdownCss, hiddenDropdownCss]
            : myFnbDropdownCss
        }
      >
        <ul>
          <li>
            <Link to="/tasks">Manage new volunteers</Link>
          </li>
          <li>
            <a href="#">Link 2</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

const Layout = () => {
  const { isRegistered } = useContext(User)
  const [activeMenu, setActiveMenu] = useState("logo")
  const activeProps = name => ({
    makeActive: () => setActiveMenu(name),
    isActive: name === activeMenu
  })
  return (
    <header css={headerCss}>
      <LayoutContainer css={navCss} tag="nav">
        <LogoItem to="/" {...activeProps("logo")} />
        <NavMenuItem to="/about" {...menuItemCss} {...activeProps("about")}>
          About
        </NavMenuItem>
        <MyFnbDropdownMenu
          isDisabled={!isRegistered}
          {...activeProps("myFnb")}
        />
      </LayoutContainer>
    </header>
  )
}

export default Layout
