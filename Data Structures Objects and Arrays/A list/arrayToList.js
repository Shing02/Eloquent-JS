function arrayToList(array) {

  const obj = {};
  let temp;

  function recursive(arg) {
    if (arg.ref === undefined) {
      arg.value = temp;
      arg.ref = {};
      return;
    } else {
      recursive(arg.ref);
    }
  }

  for (let arr of array) {
    temp = arr;
    if (obj.ref === undefined) {
      obj.value = arr;
      obj.ref = {}
    } else {
      recursive(obj);
    }
    
  return obj;
  
  }
}
