function listToArray(list) {
  
  let array = [];
  for (let node = list; node; node = node.rest) { // (init node; while node === true the loops goes on; incrementation)
    array.push(node.value);
    
    }
  
  return array;
  
}

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

function nth(list, number) {
  const array = listToArray(list);
  for (let i = 0; i < array.length-1; i++) {
    if (i === number) {
      return array[i];
    }
  }
}
undefined
