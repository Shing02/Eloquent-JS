// Academic implementation, we loop the array backwards while constantly redifining the list.

function arrayToList(array) {
  
  let list = null;
  for (let i = array.length-1; i >= 0; i--) {
    list = { 
      value : array[i],
      rest : list
    }
  }
  
  return list;
    
  }


// My original attempt, for the record, which was way way too long and complicate ( ͡° ͜ʖ ͡°)

function arrayToList(array) {

  const obj = {};
  let temp;  // this one is because the arr variable isn't visible for the recursive fonction.

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
    if (obj.ref === undefined) {  //init first properties of obj.
      obj.value = arr;
      obj.ref = {}
    } else {
      recursive(obj); //once the first array item called, everythings takes place in the recursive function.
    }
  }
  
  return obj;
  
}
