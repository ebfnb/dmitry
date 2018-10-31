import React from 'react'
import { Link } from "react-router-dom"

export default ()=>(
    <div>
        <p>This is a Preact app being rendered on the server. It uses Unistore for state management and preact-router for routing.</p>
        <Link to="/">Home</Link>
    </div>
)