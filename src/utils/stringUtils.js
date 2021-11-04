export const getInitials = (name) => {
  let initials = Array.prototype.map
    .call(name.split(' '), function (x) {
      return x.substring(0, 1).toUpperCase();
    })
    .join('');
  return initials.substring(0, 2);
};

export const stringIsEmptyOrWhiteSpaces = (str) => {
  return str == null || str == undefined || (typeof str === 'string' && str.trim().length == 0)
}
