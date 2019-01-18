import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faSpinner,
  faCaretDown,
  faComment
} from "@fortawesome/free-solid-svg-icons"

//console.log(spinner)
library.add({ faSpinner, faCaretDown, faComment })
ReactDOM.render(<App />, document.getElementById("root"))
