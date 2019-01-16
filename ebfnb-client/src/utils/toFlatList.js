import { flatten } from "ramda"

const toFlatList = (...list) => flatten(list)
export default toFlatList
