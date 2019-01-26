/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { Link } from "react-router-dom"
import User from "./User"
import LayoutContainer from "../components/LayoutContainer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Nav from "../components/Nav"
import useBurger from "../../hooks/useBurger"

const headerCss = css`
  background-color: black;
  height: 45px;
  margin-bottom: 1rem;
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
const leftBurgerCss = css`
  display: inline-flex;
  color: white;
  padding: 10px 1rem;
`
const leftMenuCss = (show, isBelowBp) => {
  const belowBpCss = css`
    position: absolute;
    width: 100%;
  `
  const aboveBpCss = css`
    display: inline-flex;
    li {
      color: #bbbbbb;
      display: inline-flex;
      font-size: 1rem;
      line-height: 28px;
      padding: 10px 1rem;
      text-align: center;
      text-decoration: none;
      vertical-align: top;
    }
  `
  return isBelowBp ? belowBpCss : aboveBpCss
}
const menuItemDynamicCss = {
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
  disabledCss: css`
    color: #999999;
    cursor: default;
  `
}
const LogoItem = () => {
  return (
    <Nav.Link title="Home" to="/" baseCss={logoCss}>
      <span style={{ visibility: "hidden" }}>East Bay Food Not Bombs</span>
    </Nav.Link>
  )
}

const MenuItem = props => {
  return (
    <li>
      <Nav.Link {...props} {...menuItemDynamicCss} />
    </li>
  )
}
const LeftBurger = props => {
  return (
    <div css={leftBurgerCss} {...props}>
      <FontAwesomeIcon icon="bars" size="1x" />
    </div>
  )
}
const LeftMenu = props => {
  return (
    <ul {...props}>
      <MenuItem to="/about">About</MenuItem>
      <MenuItem to="/eatWithUs">Eat with us</MenuItem>
    </ul>
  )
}
const Layout = () => {
  const leftBurger = useBurger({ bp: 440 })
  const rightBurger = useBurger({ bp: 440 })

  return (
    <header css={headerCss}>
      <LayoutContainer css={navCss} tag="Nav">
        <LogoItem />
        <LeftBurger {...leftBurger.burgerProps()} />
        <LeftMenu {...leftBurger.menuProps({ getCss: leftMenuCss })} />
      </LayoutContainer>
    </header>
  )
}

export default Layout
