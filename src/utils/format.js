export const addComma = (number) => {
  if (number) {
    number += "";
    const arr = number.split(".");
    const re = /(\d{1,3})(?=(\d{3})+$)/g;
    return arr[0].replace(re, "$1,") + (arr.length == 2 ? "." + arr[1] : "");
  } else {
    return "";
  }
};
