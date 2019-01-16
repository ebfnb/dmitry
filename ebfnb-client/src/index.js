import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

//console.log(spinner)
library.add(faSpinner)
ReactDOM.render(<App />, document.getElementById("root"))
