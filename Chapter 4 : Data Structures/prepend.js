
function prepend(elem, list) {
  
  let newList = [];
  let array = listToArray(list);
  array.unshift(elem);
  newList = arrayToList(array);
  return newList;
  
}
