export const get_percentage_of_time = (task, user_data) => {
  let curr_task = {};
  for (let i = 0; i < user_data.length; i++) {
    if (user_data[i].id === task.id) {
      curr_task = user_data[i];
      break;
    }
  }
  const total_time = Number(curr_task.time) * 60;
  const remaining_time =
    Number(curr_task.remaining_time.split(":")[0]) * 60 +
    Number(curr_task.remaining_time.split(":")[1]);
  return Math.floor((remaining_time * 100) / total_time);
};
