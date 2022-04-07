export const get_remaining_time = (task, user_data) => {
  let remaining_stored_time = "";
  for (let i = 0; i < user_data.length; i++) {
    if (user_data[i].id === task.id) {
      remaining_stored_time = user_data[i].remaining_time;
    }
  }
  const remaining_time =
    Number(remaining_stored_time.split(":")[0]) * 60 +
    Number(remaining_stored_time.split(":")[1]);

  return remaining_time;
};
