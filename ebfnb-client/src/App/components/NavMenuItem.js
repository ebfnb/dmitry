/** @jsx jsx */
import { jsx } from "@emotion/core"
import { Link } from "react-router-dom"

const NavMenuItem = ({
  makeActive,
  isActive,
  isDisabled,
  disabledCss,
  onHoverCss,
  activeCss,
  ...props
}) => {
  let dynamicCss
  if (isDisabled) dynamicCss = disabledCss
  else if (isActive && !isDisabled) dynamicCss = activeCss
  else dynamicCss = onHoverCss
  const linkProps = { css: [dynamicCss], ...props }
  return isDisabled ? (
    <div {...linkProps} />
  ) : (
    <Link {...linkProps} onClick={makeActive} />
  )
}

export default NavMenuItem
