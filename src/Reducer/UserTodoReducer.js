import { v4 as uuid } from "uuid";

export function UserTodoReducer(state, action) {
  const action_type = action.type;
  switch (action_type) {
    case "ADD":
      const new_todo_after_add = [
        ...state,
        { id: uuid(), completed: false, ...action.paylod },
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
    default:
      return state;
  }
}
