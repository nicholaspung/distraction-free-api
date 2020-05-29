module.exports = function (array, property) {
  let set = {};
  array.forEach((item) => (set[item[property]] = item));
  return Object.values(set);
};
