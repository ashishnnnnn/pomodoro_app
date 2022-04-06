export const get_subtracted_time = (string_time) => {
  let remaining_time =
    Number(string_time.split(":")[0]) * 60 + Number(string_time.split(":")[1]);
  remaining_time = Number(remaining_time);
  if (remaining_time === 0) {
    return "00:00";
  } else {
    remaining_time -= 1;
    let min = Math.floor(remaining_time / 60);
    let sec = remaining_time % 60;
    if (min < 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;
    return min + ":" + sec;
  }
};
