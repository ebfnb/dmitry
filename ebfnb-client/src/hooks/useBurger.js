import { useEffect, useState } from "react"
import useVwBreakpoint from "./useViewportWListener"
import { css } from "@emotion/core"

const hiddenCss = css`
  display: none;
`
const useBurger = ({ bp }) => {
  const [show, setShow] = useState(false)
  const closeMenuListener = () => setShow(false)
  const isBelowBp = useVwBreakpoint(bp)
  useEffect(
    () => {
      if (isBelowBp) window.addEventListener("click", closeMenuListener)
      return () => {
        if (isBelowBp) window.removeEventListener("click", closeMenuListener)
      }
    },
    [bp]
  )
  const burgerProps = (props = {}) => {
    const { css, ref, ...restProps } = props
    const onClick = () => setShow(show => !show)
    if (ref) ref.current.addEventListener("click", onClick)
    const burgerProps = {
      ...restProps,
      css: isBelowBp ? css : [css, hiddenCss]
    }
    Object.assign(burgerProps, ref ? { burgerRef: ref } : { onClick })
    return burgerProps
  }
  const menuProps = ({ getCss, ...props }) => {
    const css = getCss(show, isBelowBp)
    return { ...props, css }
  }
  return { burgerProps, menuProps }
}
export default useBurger
