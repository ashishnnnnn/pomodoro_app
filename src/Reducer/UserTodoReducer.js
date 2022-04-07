import { v4 as uuid } from "uuid";
import { get_curr_date } from "../Utils/get_curr_date";
import { get_subtracted_time } from "../Utils/get_subtracted_time";

export function UserTodoReducer(state, action) {
  const action_type = action.type;
  switch (action_type) {
    case "ADD":
      const new_todo_after_add = [
        ...state,
        {
          id: uuid(),
          completed: false,
          created_at: get_curr_date(),
          ...action.paylod,
        },
      ];
      localStorage.setItem("my_todos", JSON.stringify(new_todo_after_add));
      return new_todo_after_add;
    case "EDIT":
      const new_todo_after_edit = state.map((item) =>
        item.id === action.paylod.id ? action.paylod : item
      );
      localStorage.setItem("my_todos", JSON.stringify(new_todo_after_edit));
      return new_todo_after_edit;

    case "DELETE":
      const new_todo_after_delete = state.filter(
        (item) => item.id !== action.paylod.id
      );
      localStorage.setItem("my_todos", JSON.stringify(new_todo_after_delete));
      return new_todo_after_delete;
    case "TOGGLE_STATUS":
      const new_todo_after_change_status = state.map((item) =>
        item.id === action.paylod.id
          ? { ...item, completed: !item.completed }
          : item
      );
      localStorage.setItem(
        "my_todos",
        JSON.stringify(new_todo_after_change_status)
      );
      return new_todo_after_change_status;
    case "GET_TODOLIST_LOCALLY":
      const local_todo = JSON.parse(localStorage.getItem("my_todos"));
      if (local_todo && local_todo.length) {
        return local_todo;
      }
      return state;

    case "DECREASE_TIME":
      const new_tod_after_decrease = state.map((item) =>
        item.id === action.paylod
          ? {
              ...item,
              remaining_time: get_subtracted_time(item.remaining_time),
            }
          : item
      );
      localStorage.setItem("my_todos", JSON.stringify(new_tod_after_decrease));
      return new_tod_after_decrease;

    case "RESET_TIME":
      const new_tod_after_reset = state.map((item) =>
        item.id === action.paylod
          ? { ...item, remaining_time: item.time + ":00" }
          : item
      );
      localStorage.setItem("my_todos", JSON.stringify(new_tod_after_reset));
      return new_tod_after_reset;
    default:
      return state;
  }
}
