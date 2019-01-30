/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import User from "./User"
import LayoutContainer from "../components/LayoutContainer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useNav from "../../hooks/useNav"
import { useContext } from "react"
import { Link } from "react-router-dom"

const headerCss = css`
  background-color: black;
  height: 45px;
  margin-bottom: 1rem;
  width: 100%;
`
const containerCss = css`
  display: flex;
`
const leftMenuCss = css`
  display: block;
  float: left;
  margin: 0px;
  a {
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
const linkCss = {
  onHover: css`
    &:hover,
    &:active,
    &:focus {
      color: white;
    }
  `,
  active: css`
    color: white;
    cursor: default;
    border-bottom: 5px solid purple;
  `,
  disabled: css`
    color: #999999;
    cursor: default;
  `
}

const getNavCss = props => {
  const {
    key,
    component,
    theme: { nav: navTheme }
  } = props
  if (key === "leftMenu") return navTheme.menu({ side: "left" })
  if (key === "logo") return navTheme.logo()
  if (component === "nav.link" || component === "nav.menuLink") {
    const { isActive, isDisabled } = props
    if (isDisabled) return linkCss.disabled
    return isActive ? linkCss.active : linkCss.onHover
  }
}

const Layout = () => {
  const { isRegistered } = useContext(User)
  const { menu, linkProps, logoProps, navCss } = useNav({
    //  getCss: getNavCss,
    bp: 600,
    activeLinkKey: "/"
  })
  const leftMenu = menu({ pull: "left" })

  return (
    <header css={headerCss}>
      <LayoutContainer css={navCss} tag="nav">
        <Link {...logoProps({ to: "/", title: "home" })}>
          <span style={{ visibility: "hidden" }}>East Bay Food Not Bombs</span>
        </Link>
        {/* <div {...leftMenu.toggleProps()}>
          <FontAwesomeIcon icon="bars" size="1x" />
        </div> */}
        <ul {...leftMenu.menuProps()}>
          <li>
            <Link {...leftMenu.linkProps({ to: "/about" })}>About</Link>
          </li>
        </ul>
      </LayoutContainer>
    </header>
  )
}

export default Layout
