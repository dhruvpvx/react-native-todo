export const addTask = (task, time) => {
  return { type: 'ADD_TASK', payload: { task, time } }
}

export const addInProgress = task => {
  return { type: 'IN_PROGRESS', payload: task }
}
export const addCompleted = task => {
  return { type: 'COMPLETED', payload: task }
}
export const addToDo = task => {
  return { type: 'ADD_TODO', payload: task }
}

export const deleteTask = (id, value) => {
  switch (value) {
    case 'TO_DO':
      return { type: 'DELETE_TODO', payload: id }
    case 'IN_PROGRESS':
      return { type: 'DELETE_INPROGRESS', payload: id }
    case 'COMPLETED':
      return { type: 'DELETE_COMPLETED', payload: id }
    default:
      return null
  }
}