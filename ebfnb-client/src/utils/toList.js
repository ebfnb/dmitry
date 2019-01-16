const toList = val => {
  return Array.isArray(val) ? val : [val]
}
export default toList
