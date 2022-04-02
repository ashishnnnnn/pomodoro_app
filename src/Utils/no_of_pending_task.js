export const no_of_pending_task = (todos) => {
  let count = 0;
  for (let ele of todos) {
    if (!ele.completed) {
      count += 1;
    }
  }
  return count;
};
