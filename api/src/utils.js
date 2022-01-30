const addXSecondsToDate = (date, x) => {
   return new Date(date.getTime() + x * 1000);
};

module.exports = {
   addXSecondsToDate,
};
