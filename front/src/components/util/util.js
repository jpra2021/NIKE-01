export const TYPES = {
  add: "ADD",
  remove: "REMOVE",
  edit: "EDIT",
  load: "LOAD",
  setID: "SETID",
  init: "INIT",
};

export const overlapCheck = (state, title, date, school, degree) => {
  let filtered;

  // award, project, certificate
  if (title) {
    filtered = state.filter((state) => state.title === title);
  }

  // project, certificate
  if (date) {
    filtered = filtered.filter((state) => state.date === date);
  }

  // education
  if (school && degree) {
    filtered = state.filter(
      (state) => state.school === school && state.degree === degree
    );
  }

  if (filtered.length === 1) {
    return true;
  }

  return false;
};

export const formatDateStr = (date) => {
  const year = date.getFullYear();
  const month = "0" + (date.getMonth() + 1);
  let day = date.getDate();

  if (day <= 9) {
    day = "0" + day;
  }

  const period = year + "-" + month + "-" + day;

  return period;
};
