import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faSpinner,
  faCaretDown,
  faComment,
  faPlus,
  faBars
} from "@fortawesome/free-solid-svg-icons"

//console.log(spinner)
library.add({ faSpinner, faCaretDown, faComment, faPlus, faBars })
ReactDOM.render(<App />, document.getElementById("root"))
