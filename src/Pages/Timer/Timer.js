import "./Timer.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Circular_Progress_Bar } from "../../Components";
import { useUserTodo } from "../../Context/useUserTodo";
import { get_remaining_time } from "../../Utils/get_remaining_time";
import { useGetLocalData } from "../../Hooks/useGetLocalData";

export const Timer = () => {
  useGetLocalData();
  const location = useLocation();
  const task = location.state?.task;
  const [isActive, setIsActive] = useState(false);
  const { user_data, setUserData } = useUserTodo();
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let interval = null;
    if (isActive && get_remaining_time(task, user_data) > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
        setUserData({ type: "DECREASE_TIME", paylod: task.id });
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="container pad-t-5 flex-column">
      <div className="todo-body pad-t-8 pad-2 timer-grid responsive-grid">
        <div className="timer">
          <Circular_Progress_Bar task={task} user_data={user_data} />
          <div className="timer-btn mar-t-2">
            <div className="flex gap-1">
              <button
                onClick={() => {
                  setIsActive((pre_state) => !pre_state);
                }}
                disabled={isActive}
                className="start-btn fnt-w-600"
              >
                Start
              </button>
              <button
                onClick={() => {
                  setIsActive((pre_state) => !pre_state);
                }}
                disabled={!isActive}
                className="pause-btn fnt-w-600"
              >
                Pause
              </button>
            </div>
            <button
              onClick={() => {
                setIsActive(true);
                setUserData({ type: "RESET_TIME", paylod: task.id });
              }}
              className="reset-btn mar-t-1 fnt-w-600"
            >
              Reset Button
            </button>
          </div>
        </div>
        <div className="task-details">
          <div className="task-heading fnt-2 fnt-w-600">{task.title}</div>
          <div className="task-details mar-t-1 ">{task.description}</div>
          <p className="date-text mar-t-1">Created At - {task.created_at}</p>
        </div>
      </div>
    </div>
  );
};
