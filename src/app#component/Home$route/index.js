import React from 'react'
import { Link } from "react-router-dom"
import actions$get from './actions$get'
import { connect } from 'unistore/react'

export default connect('count', actions$get)(
    ({ count, increment, decrement }) => (
        <div class="count">
            <p>{count}</p>
            <button className="increment-btn" onClick={increment}>Increment</button>
            <button className="decrement-btn" onClick={decrement}>Decrement</button>
            <Link to="/About">About</Link>
        </div>
    )
)