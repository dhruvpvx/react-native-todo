const INITIAL_STATE = [

]

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      const { task, time } = action.payload
      return [...state, { id: Math.floor(Math.random() * 99999), task, time }]
    case 'DELETE_TODO':
      const newList = state.filter(item => item.id !== action.payload)
      return newList
    case 'ADD_TODO':
      return [...state, action.payload]  
    default:
      return state
  }
}