/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { Link, withRouter } from "react-router-dom"
import { contains } from "ramda"
import toFlatList from "../../utils/toFlatList"

const aonHoverCss = css`
  &:hover,
  &:active,
  &:focus {
    color: white;
  }
`
const aactiveCss = css`
  color: white;
  cursor: default;
  border-bottom: 5px solid purple;
`
const adefaultCss = css`
  color: #bbbbbb;
  display: inline-flex;
  font-size: 1rem;
  line-height: 28px;
  padding: 10px 1rem;
  text-align: center;
  text-decoration: none;
  vertical-align: top;
`
const adisabledCss = css`
  color: #999999;
  cursor: default;
`
const NavMenuItem = withRouter(
  ({
    isDisabled,
    to,
    location,
    css: customCss,
    disabledCss: customDisabledCss,
    onHoverCss: customOnHoverCss,
    activeCss: customActiveCss,
    ...props
  }) => {
    const disabledCss = toFlatList(adisabledCss, customDisabledCss)
    const onHoverCss = toFlatList(aonHoverCss, customOnHoverCss)
    const activeCss = toFlatList(aactiveCss, customActiveCss)
    const defaultCss = toFlatList(adefaultCss, customCss)
    let localCss
    if (isDisabled) localCss = disabledCss
    else if (contains(to, location.pathname)) localCss = activeCss
    else localCss = onHoverCss
    const css = toFlatList(defaultCss, localCss)
    const linkProps = { to, ...props, css }
    if (isDisabled)
      Object.assign(linkProps, {
        onClick: e => e.preventDefault()
      })
    return <Link {...linkProps} />
  }
)
export default NavMenuItem
