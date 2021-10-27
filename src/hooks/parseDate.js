export const parseDate = (date) => {
  return `${date.getFullYear() - 2000}.${date.getMonth() + 1}.${
    date.getDate() < 10 ? "0" : ""
  }${date.getDate()}`;
};
