import verge from "verge"
import { useEffect } from "react"

const useViewportWListener = viewportWListener => {
  useEffect(
    () => {
      const listener = () => viewportWListener(verge.viewportW())
      window.addEventListener("resize", listener)
      return () => window.removeEventListener("resize", listener)
    },
    [true]
  )
}
export default useViewportWListener
