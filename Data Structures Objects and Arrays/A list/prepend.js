
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


function listToArray(list) {
  
  let array = [];
  for (let node = list; node; node = node.rest) { // (init node; while node === true the loops goes on; incrementation)
    array.push(node.value);
    
    }
  
  return array;
  
}

function prepend(elem, list) {
  
  let newList = [];
  let array = listToArray(list);
  array.unshift(elem);
  newList = arrayToList(array);
  return newList;
  
}
