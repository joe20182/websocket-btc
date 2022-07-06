/**
 * get the class of size column
 * @param {*} data have to include trend property
 * @returns
 */
export const getSizeClass = (data) => {
  let classes = "order-col";
  if (data.trend === "up") classes += " flash-red";
  else if (data.trend === "down") classes += " flash-green";
  return classes;
};
