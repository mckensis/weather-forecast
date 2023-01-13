//Returns today's date
function Today() {
  let date = new Date();
  let day = String(date.getDate());
  let month = String(date.getMonth() + 1);

  if (day.length === 1) {
    day = '0' + day;
  }

  if (month.length === 1) {
    month = '0' + month;
  }
  
  let year = date.getFullYear();
  let currentDate = `${year}-${month}-${day}`;
  return currentDate;
}

//Returns tomorrow's date
function Tomorrow() {
  let date = new Date();
  let tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);
  let day = String(tomorrow.getDate());
  let month = String(tomorrow.getMonth() + 1);

  if (day.length === 1) {
    day = '0' + day;
  }

  if (month.length === 1) {
    month = '0' + month;
  }

  let year = tomorrow.getFullYear();
  let currentDate = `${year}-${month}-${day}`;
  return currentDate;
}

//Pass in a timezone as an offset from Unix time i.e. -18000 for New York
//Returns the current time as HH:MM in that timezone
function GetTime(timezone) {
    let epoch = Math.floor(new Date().getTime()/1000.0);
    let difference = epoch + timezone;
    return new Date(difference * 1000).toLocaleString().split(' ')[1].slice(0, -3);
}

export { Today, Tomorrow, GetTime };