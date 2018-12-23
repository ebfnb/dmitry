import capitalize from './capitalize'
import {map,join,compose} from 'ramda'

export default (listOfStr)=>compose(join(''),map(capitalize))(listOfStr)