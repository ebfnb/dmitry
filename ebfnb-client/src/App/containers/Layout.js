/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { Link } from "react-router-dom"
import User from "./User"
import { useContext } from "react"
import LayoutContainer from "../components/LayoutContainer"
import NavMenuItem from "../components/NavMenuItem"

const headerCss = css`
  background-color: black;
  height: 45px;
  margin-bottom: 1rem;
  // overflow: hidden;
  width: 100%;
`

const navCss = css`
  display: flex;
`

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

const LogoItem = ({ to }) => {
  return (
    <Link title="Home" to={to} css={logoCss}>
      <span style={{ visibility: "hidden" }}>East Bay Food Not Bombs</span>
    </Link>
  )
}

const Layout = () => {
  const { isRegistered } = useContext(User)
  return (
    <header css={headerCss}>
      <LayoutContainer css={navCss} tag="nav">
        <LogoItem to="/" />
        <NavMenuItem to="/about">About</NavMenuItem>
        <NavMenuItem to="/tasks" isDisabled={!isRegistered}>
          Tasks
        </NavMenuItem>
      </LayoutContainer>
    </header>
  )
}

export default Layout
