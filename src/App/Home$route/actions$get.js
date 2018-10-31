export default store => ({
    increment(state) {
        return { count: state.count + 1 }
    },
    decrement(state) {
        return { count: state.count - 1 }
    }
})