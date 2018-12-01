import {replace,toUpper} from 'ramda'

export default (str)=>replace(/^./, toUpper)