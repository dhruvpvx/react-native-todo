const INITIAL_STATE = [

]

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'IN_PROGRESS':
      return [...state, action.payload]
    case 'DELETE_INPROGRESS':
      const newList = state.filter(item => item.id !== action.payload)
      return newList
    default:
      return state
  }
}