const INITIAL_STATE = [

]

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'COMPLETED':
      return [...state, action.payload]
    case 'DELETE_COMPLETED':
      const newList = state.filter(item => item.id !== action.payload)
      return newList
    default:
      return state
  }
}