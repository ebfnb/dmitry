import { useState, useEffect, useRef, useMemo } from "react"

const useIsHover = ({ ref }) => {
  const [isHover, setIsHover] = useState(false)
  useEffect(
    useMemo(() => {
      const mouseenter = () => setIsHover(true)
      const mouseleave = () => setIsHover(false)
      ref.current.addEventListener("mouseenter", mouseenter)
      ref.current.addEventListener("mouseleave", mouseleave)
      return () => {
        ref.current.removeEventListener("mouseenter", mouseenter)
        ref.current.removeEventListener("mouseleave", mouseleave)
      }
    })
  )
  return isHover
}
export default useIsHover
