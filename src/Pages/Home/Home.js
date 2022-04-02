import "./Home.css";
import { useState } from "react";
import { useUserTodo } from "../../Context/useUserTodo";
import { no_of_pending_task } from "../../Utils/no_of_pending_task";
import { Modal } from "../../Components";
import { useGetLocalData } from "../../Hooks/useGetLocalData";

export const Home = () => {
  useGetLocalData();
  const { user_data, setUser_Data } = useUserTodo();
  const [show_modal, setShow_modal] = useState(false);
  const [curr_modal_todo, setCurr_modal_todo] = useState({});
  const toggle_modal = () => {
    setShow_modal((pre_val) => !pre_val);
  };
  const reset_modal = () => {
    setCurr_modal_todo({});
  };
  return (
    <div className="container pad-t-5 flex-column">
      <div className="header">
        <div className="welcome-msg fnt-2 fnt-w-600 mar-b-1">
          Welcome , Lets Complete the task
        </div>
        <div className="task-information fnt-w-300 fnt-1-5">
          {no_of_pending_task(user_data) > 0 ? (
            <p>
              You have {no_of_pending_task(user_data)} tasks to complete. All
              the best..
            </p>
          ) : (
            <p>You have no task to complete. Good Job...</p>
          )}
        </div>
      </div>
      <div className="todo-body pad-t-3 pad-b-3">
        <div className="todo-header flex mar-b-2 jst-sp-sb">
          <div className="todo-header-text fnt-2 fnt-w-600">To - Do List</div>
          <div className="add-btn fnt-2">
            <i
              onClick={() => toggle_modal()}
              className="fas fa-plus-circle"
            ></i>
          </div>
        </div>
        <div className="todo-container fnt-1-5 fnt-w-300">
          {user_data.length === 0 ? (
            <div className="fnt-2">
              You don't have any task added in the your todo list
            </div>
          ) : (
            user_data.map((ele) => (
              <div key={ele.id}>
                <div className="todo-item flex pad-0-5 ali-ce">
                  {ele.completed ? (
                    <div
                      onClick={() => {
                        setUser_Data({
                          type: "TOGGLE_STATUS",
                          paylod: ele,
                        });
                      }}
                      className="flex-center-row circle"
                    >
                      <i className="fas fa-check fnt-1"></i>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setUser_Data({
                          type: "TOGGLE_STATUS",
                          paylod: ele,
                        });
                      }}
                      className="circle"
                    ></div>
                  )}
                  <div className="todo-text">
                    {ele.completed ? (
                      <p>
                        <s>{ele.title}</s>
                      </p>
                    ) : (
                      <p>{ele.title}</p>
                    )}
                  </div>
                  <div className="todo-btn flex">
                    <i
                      onClick={() => {
                        toggle_modal();
                        setCurr_modal_todo(ele);
                      }}
                      className="fas fa-edit"
                    ></i>
                    <i
                      onClick={() => {
                        setUser_Data({
                          type: "DELETE",
                          paylod: ele,
                        });
                      }}
                      className="fas fa-trash-alt"
                    ></i>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {show_modal && (
        <Modal
          todo={curr_modal_todo}
          toggle_modal={toggle_modal}
          reset_modal={reset_modal}
        />
      )}
    </div>
  );
};
