import { useContext } from "react"
import Theme from "../App/components/Theme"

const useTheme = () => {
  const theme = useContext(Theme)
  return theme
}
export default useTheme
