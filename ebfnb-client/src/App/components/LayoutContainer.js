/** @jsx jsx */
import { css, jsx } from "@emotion/core"

const styles = css`
  margin: 0 auto;
  padding: 0 10px;
  max-width: 60rem;
  width: 100%;
`
const LayoutContainer = ({ tag: Wrapper = "div", ...props }) => (
  <Wrapper css={styles} {...props} />
)

export default LayoutContainer
