export const get_format_time = (time) => {
  let min = Math.floor(Number(time) / 60);
  let sec = Number(time) % 60;
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;
  return min + ":" + sec;
};
