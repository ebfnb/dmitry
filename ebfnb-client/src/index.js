import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faSpinner, faCaretDown } from "@fortawesome/free-solid-svg-icons"

//console.log(spinner)
library.add({ faSpinner, faCaretDown })
ReactDOM.render(<App />, document.getElementById("root"))
