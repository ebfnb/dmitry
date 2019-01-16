/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const spinnerCss = css`
  margin: auto;
  display: block;
  width: 1%;
`
const Spinner = ({ size }) => (
  <span css={spinnerCss}>
    <FontAwesomeIcon size={size} icon="spinner" pulse />
  </span>
)
export default Spinner
