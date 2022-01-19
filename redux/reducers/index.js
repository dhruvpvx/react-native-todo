import { combineReducers } from "redux";
import InProgressReducer from "./InProgressReducer";
import ToDoReducers from "./ToDoReducers";
import CompletedReducer from "./CompletedReducer";

export default combineReducers({
  toDo: ToDoReducers,
  onGoing: InProgressReducer, 
  completed: CompletedReducer
})