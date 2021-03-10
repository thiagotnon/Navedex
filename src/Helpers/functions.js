export function utcFormat(date) {
  const dateFormat = new Date(date)
  const day = dateFormat.getDate()
  const year = dateFormat.getFullYear()
  const month = dateFormat.getMonth() + 1
  return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
}

export function yearsFormat(date) {
  let registerDate = new Date(`${date}`);
  let registerYear = registerDate.getUTCFullYear()
  let registerMonth = registerDate.getUTCMonth() + 1;
  let registerDay = registerDate.getUTCDay();

  // eslint-disable-next-line
  let curDate = new Date,
    currentYear = curDate.getFullYear(),
    currentMonth = curDate.getMonth() + 1,
    currentDay = curDate.getDate();

  let year = currentYear - registerYear;
  // eslint-disable-next-line
  if (currentMonth < registerMonth || currentMonth === registerMonth && currentDay < registerDay) {
    year--;
  }
  return year < 0 ? 0 : year;
}