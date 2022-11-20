//Returns today's date
function Today() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${year}-${month}-${day}`;
  return currentDate;
}

//Returns tomorrow's date
function Tomorrow() {
  let date = new Date();
  let tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);
  let day = tomorrow.getDate();
  let month = tomorrow.getMonth() + 1;
  let year = tomorrow.getFullYear();
  let currentDate = `${year}-${month}-${day}`;
  return currentDate;
}

export { Today, Tomorrow };