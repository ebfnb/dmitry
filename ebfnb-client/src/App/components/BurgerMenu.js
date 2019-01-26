import React, { useContext, useState, useEffect } from "react"
import useVwBreakpoint from "../../hooks/useViewportWListener"

const State = React.createContext()

const BurgerMenu = ({ bp, ...props }) => {
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
  const contextValue = { show, setShow, isBelowBp }
  return (
    <State.Provider value={contextValue}>
      <div {...props} />}
    </State.Provider>
  )
}
BurgerMenu.Burger = props => {
  const { isBelowBp, setShow } = useContext(State)
  return !isBelowBp ? null : (
    <span {...props} onClick={() => setShow(show => !show)} />
  )
}
BurgerMenu.Menu = props => {
  const { show, isBelowBp } = useContext(State)
  return isBelowBp && !show ? null : <div {...props} />
}
export default BurgerMenu
