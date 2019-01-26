import { Link } from "react-router-dom"
import React, { useContext, useReducer } from "react"
import update from "react-addons-update"

const LinksContext = React.createContext()
const reducer = (state, action) => {
  switch (action.type) {
    case "setActiveLinkName":
      return update(state, { activeLinkName: action.name })
    default:
      return state
  }
}
const initState = { links: { activeLinkName: "" } }

const Nav = ({ activeLinkName, children, tag: Wrapper = "nav", ...props }) => {
  const initAction = {
    type: "setActiveLink",
    name: activeLinkName
  }
  const store = useReducer(reducer, initState, initAction)
  if (typeof children === "function") Wrapper = () => children(store)
  return (
    <LinksContext.Provider value={[store.links, store.dispatch]}>
      <Wrapper {...props}>{children}</Wrapper>
    </LinksContext.Provider>
  )
}

// Nav.Link = ({
//   to,
//   isDisabled,
//   disabledCss,
//   onHoverCss,
//   activeCss,
//   baseCss,
//   ...props
// }) => {
//   const {activeLink,setActiveLink}=useContext(NavState)
//   const isActive=to === activeLink
//   let dynamicCss
//   if (isDisabled) dynamicCss = disabledCss
//   else if (isActive && !isDisabled) dynamicCss = activeCss
//   else dynamicCss = onHoverCss
//   const linkProps = { css: [baseCss,dynamicCss], to,...props }
//   return isDisabled ? (
//     <div {...linkProps} />
//   ) : (
//     <Link {...linkProps} onClick={()=>setActiveLink(to)} />
//   )
// }
Nav.Link = ({ to, isDisabled, name = to, getCss, children, ...props }) => {
  const [linksState, dispatch] = useContext(LinksContext)
  const isActive = name === linksState.activeLinkName
  const linkCss = getCss({
    isActive,
    isDisabled
  })
  const linkProps = { css: linkCss, to, children, ...props }
  if (typeof children === "function") return children(linksState, dispatch)
  return isDisabled ? (
    <div {...linkProps} />
  ) : (
    <Link
      {...linkProps}
      onClick={() => dispatch({ type: "setActiveLinkName", name })}
    />
  )
}

Nav.Burger = ({ bp, ...props }) => {}

export default Nav
