import "./Home.css";
import { useState, useEffect } from "react";
import { useUserTodo } from "../../Context/useUserTodo";
import { no_of_pending_task } from "../../Utils/no_of_pending_task";
import { Modal } from "../../Components";
import { useGetLocalData } from "../../Hooks/useGetLocalData";
import { Link, useNavigate } from "react-router-dom";
import { logoutHandle } from "../../FirebaseCall/logoutHandle";
import { useToast } from "../../Context/ToastContext";

export const Home = () => {
  let navigate = useNavigate();
  useGetLocalData();
  const { user_data, setUserData } = useUserTodo();
  const [show_modal, setShowModal] = useState(false);
  const [curr_modal_todo, setCurrModalTodo] = useState({});
  const { handleaddtoast } = useToast();
  const toggle_modal = () => {
    setShowModal((pre_val) => !pre_val);
  };
  const reset_modal = () => {
    setCurrModalTodo({});
  };

  const token = localStorage.getItem("pomodoro-token");
  console.log(!token);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="container pad-t-5 flex-column">
        <div className="header ">
          <div className="welcome-msg fnt-2 fnt-w-600 mar-b-1">
            Welcome , Lets Complete the task
          </div>
          <button
            onClick={async () => {
              await logoutHandle();
              handleaddtoast({
                message: "Logged Out",
                type: "alert-success",
              });
              navigate("/login");
            }}
            className="logout-btn"
          >
            LogOut
          </button>
          <div className="flex task-information fnt-w-300 fnt-1-5">
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
                  <div className="todo-item flex pad-0-5 ">
                    {ele.completed ? (
                      <div
                        onClick={() => {
                          setUserData({
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
                          setUserData({
                            type: "TOGGLE_STATUS",
                            paylod: ele,
                          });
                        }}
                        className="circle"
                      ></div>
                    )}
                    <div className="todo-text">
                      <Link
                        to={ele.completed ? "/" : "/timer"}
                        state={{ task: ele }}
                      >
                        {ele.completed ? (
                          <p>
                            <s>{ele.title}</s>
                          </p>
                        ) : (
                          <p>{ele.title}</p>
                        )}
                      </Link>
                    </div>
                    <div className="todo-btn flex">
                      <i
                        onClick={() => {
                          toggle_modal();
                          setCurrModalTodo(ele);
                        }}
                        className="fas fa-edit"
                      ></i>
                      <i
                        onClick={() => {
                          setUserData({
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
    </>
  );
};
