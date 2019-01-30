import { css } from "@emotion/core"
import { useReducer } from "react"
import update from "react-addons-update"
import useViewportWListener from "./useViewportWListener"
import { flatten, curry } from "ramda"
import useTheme from "../hooks/useTheme"

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
const menuCss = ({ pull }) => {
  return css`
    display: block;
    float: ${pull};
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
}
const linkCss = ({ isActive, isDisabled }) => {
  const cssStrings = {
    onHover: `
      &:hover,
      &:active,
      &:focus {
        color: white;
      }
    `,
    active: `
      color: white;
      cursor: default;
      border-bottom: 5px solid purple;
    `,
    disabled: `
      color: #999999;
      cursor: default;
    `
  }
  let cssString
  if (isDisabled) cssString = cssStrings.disabled
  cssString = isActive ? cssStrings.active : cssStrings.onHover
  return css`
    ${cssString}
  `
}
const getDefaultNavCss = (path, cssState) => {
  switch (path) {
    case "nav":
      return navCss
    case "nav.link":
    case "nav.menu.link":
      return linkCss(cssState)
    case "nav.menu":
      return menuCss(cssState)
    case "nav.logo":
      return logoCss
    default:
      console.log("bad path ", path)
  }
}

const useNavReducer = ({ activeLinkKey }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "activateLink": {
        const { key } = action
        state = update(state, { activeLinkKey: { $set: key } })
        return state
      }
      case "toggleMenu": {
        const { key } = action
        const { isToggled } = state.menues[key]
        return update(state, {
          menues: { [key]: { isToggled: { $set: isToggled } } }
        })
      }
      case "setViewportW": {
        const { viewportW } = action
        return update(state, { viewportW: { $set: viewportW } })
      }

      default:
        return state
    }
  }
  const initState = { menues: {} }
  const initAction = {
    type: "activateKey",
    key: activeLinkKey
  }

  const initMenuState = key => {
    if (state.menues[key]) return
    const menuState = {
      isToggled: false,
      children: { menues: [], links: [] }
    }
    state.menues[key] = menuState
  }
  const addLinkToMenu = props => addChildToMenu("links", props)
  const addMenuToMenu = props => addChildToMenu("menues", props)
  const addChildToMenu = (childType, { childKey, parentMenuKey }) => {
    const children = state.menues[parentMenuKey].children[childType]
    !children.includes(childKey) && children.push(childKey)
    if (childType === "menues")
      state.menues[childKey].parentMenuKey = parentMenuKey
  }
  const isMenuActive = key => {
    const {
      children: { menues, links }
    } = state.menues[key]
    const { activeLinkKey } = state
    return (
      links.find(key => key === activeLinkKey) ||
      menues.find(key => isMenuActive(key))
    )
  }

  const [state, dispatch] = useReducer(reducer, initState, initAction)
  return [
    state,
    dispatch,
    { initMenuState, addMenuToMenu, addLinkToMenu, isMenuActive }
  ]
}

const useNav = ({ activeLinkKey, bp: navBp = 0, css, getCss = () => {} }) => {
  const [
    state,
    dispatch,
    { initMenuState, addMenuToMenu, addLinkToMenu, isMenuActive }
  ] = useNavReducer({ activeLinkKey })
  useViewportWListener(viewportW => {
    dispatch({ type: "setViewportW", viewportW })
  })
  const theme = useTheme()
  const childProps = curry(
    (path, parentGetCss, parentCssState, func) => (props = {}) => {
      const { css, getCss = () => {}, ...restProps } = props
      const childGetCss = (childPath = path, cssState) => {
        const args = [childPath, { ...parentCssState, ...cssState }, theme]
        return flatten([parentGetCss(...args), css || getCss(...args)])
      }
      return func({ ...restProps, getCss: childGetCss })
    }
  )
  const getNavCss = (...args) => [
    getDefaultNavCss(...args),
    css || getCss(...args)
  ]
  const navCssState = {
    isBelowBp: state.viewportW < navBp,
    viewportW: state.viewportW
  }

  const linkProps = ({ to, key = to, ref, getCss, isDisabled, ...props }) => {
    const isActive = key === state.activeLinkKey
    console.log("linkProps ", getCss)
    const cssState = {
      isActive,
      isDisabled,
      key
    }
    const commonProps = { ...props, to, key, css: getCss(undefined, cssState) }
    const setActiveLink = () => {
      !isDisabled && !isActive && dispatch({ type: "activateLink", key })
    }
    if (ref) {
      ref.current.addEventListener("click", setActiveLink)
      return { ...commonProps, linkRef: ref }
    }
    return { ...commonProps, onClick: setActiveLink, key }
  }

  const logoProps = childProps("nav.logo", getNavCss, navCssState)(linkProps)

  const menu = childProps("nav.menu", getNavCss, navCssState)(
    ({ key: menuKey, bp = navBp, getCss, isDisabled, parentMenuKey }) => {
      initMenuState(menuKey)
      if (parentMenuKey) addMenuToMenu({ childKey: menuKey, parentMenuKey })
      const { isToggled } = state.menues[menuKey]
      const cssState = {
        parentMenuKey,
        isToggled,
        isDisabled,
        key: menuKey,
        isActive: isMenuActive(menuKey),
        isBelowBp: state.viewportW < bp
      }

      const menuProps = childProps("nav.menu", getCss, cssState)(
        (props = {}) => {
          const { getCss, ...restProps } = props
          return {
            ...restProps,
            key: menuKey,
            css: getCss()
          }
        }
      )

      const toggleProps = childProps("nav.menu.toggle", getCss, cssState)(
        (props = {}) => {
          const { getCss, ref, ...restProps } = props
          const toggle = () => dispatch({ type: "toggleMenu", key: menuKey })
          const commonProps = {
            ...restProps,
            css: getCss()
          }
          if (ref) {
            ref.current.addEventListener("click", toggle)
            return { ...commonProps, linkRef: ref }
          }
          return { ...commonProps, onClick: toggle }
        }
      )

      const childLinkProps = childProps("nav.menu.link", getCss, cssState)(
        (props = {}) => {
          console.log("menuLink ", props)
          const { to, key = to } = props
          addLinkToMenu({ parentMenuKey: menuKey, childKey: key })
          return linkProps(props)
        }
      )

      const childMenu = props => menu({ ...props, parentMenuKey: menuKey })

      return {
        menuProps,
        toggleProps,
        linkProps: childLinkProps,
        menu: childMenu
      }
    }
  )

  return {
    linkProps: childProps("nav.link", getNavCss, navCssState)(linkProps),
    menu,
    state,
    dispatch,
    theme,
    logoProps,
    navCss: getNavCss("nav", navCssState)
  }
}
export default useNav
