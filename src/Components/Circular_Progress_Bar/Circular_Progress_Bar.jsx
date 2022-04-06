import React from "react";
import { render } from "react-dom";
import "./Circular_Progress_Bar.css";

import { get_percentage_of_time } from "../../Utils/get_percentage_of_time";
import { get_remaining_time } from "../../Utils/get_remaining_time";
import { useUserTodo } from "../../Context/useUserTodo";

import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useGetLocalData } from "../../Hooks/useGetLocalData";
import { get_format_time } from "../../Utils/get_format_time";

export const Circular_Progress_Bar = ({ task, user_data }) => {
  let percentage;
  let remaining_time;
  if (user_data.length) {
    percentage = get_percentage_of_time(task, user_data);
    remaining_time = get_remaining_time(task, user_data);
    remaining_time = get_format_time(remaining_time);
  }
  return (
    <CircularProgressbarWithChildren value={percentage} strokeWidth={8}>
      <div className="remaining_time  mar-b-1 fnt-w-600">{remaining_time}</div>
      <div className="total_time  mar-b-1">Out of {task.time} min</div>
    </CircularProgressbarWithChildren>
  );
};
