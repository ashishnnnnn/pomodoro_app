import { useState } from "react";
import { useUserTodo } from "../../Context/useUserTodo";
export const Modal = ({ todo, toggle_modal, reset_modal }) => {
  const { setUser_Data } = useUserTodo();
  const [curr_todo, setCurr_todo] = useState(todo ? todo : {});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCurr_todo((pre_todo) => ({ ...pre_todo, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.id) {
      setUser_Data({ type: "EDIT", paylod: curr_todo });
    } else {
      setUser_Data({ type: "ADD", paylod: curr_todo });
    }
    toggle_modal();
    reset_modal();
  };
  return (
    <div className="pop_up">
      <div className="pop_up_background"></div>
      <div className="pop_up_input fnt-2 pad-1-5">
        <div onClick={toggle_modal} className="cross fnt-3">
          &times;
        </div>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            className="input pad-1 mar-t-2 fnt-1-5"
            placeholder="Add Title"
            value={curr_todo.title || ""}
            onChange={handleChange}
            required
          ></input>
          <textarea
            name="description"
            className="input pad-1 input-description mar-t-1-5 fnt-1-5"
            placeholder="Add Description"
            value={curr_todo.description || ""}
            onChange={handleChange}
            required
          ></textarea>
          <input
            name="time"
            className="input pad-1 mar-t-1-5 fnt-1-5"
            placeholder="Add Time"
            value={curr_todo.time || ""}
            onChange={handleChange}
            required
          ></input>
          <div className="pop_up_buttons flex mar-t-2">
            <button type="submit" className="btn btn-primary fnt-1-2">
              Add
            </button>
            <button
              onClick={toggle_modal}
              className="btn btn-secondary fnt-1-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
