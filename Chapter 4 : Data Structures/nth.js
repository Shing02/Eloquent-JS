//Academic implementation
function nth(list, n) {
  if (!list) // case if n > list number
    return undefined;
  else if (n == 0)
    return list.value;
  else
    return nth(list.rest, n - 1);
}

//My original attempt with a loop
function nth(list, number) {
  const array = listToArray(list);
  for (let i = 0; i < array.length-1; i++) {
    if (i === number) {
      return array[i];
    }
  }
}
undefined
