/** @jsx jsx */
import { jsx,Global } from '@emotion/core'
import css from '@emotion/css/macro'

const GlobalStyles=()=>{return (
    <Global 
        styles={css`
            body {
                margin: 0;
                padding: 0;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
                "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
                sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
            
            code {
                font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
                monospace;
            }          
        `}
    />
)}
export default GlobalStyles