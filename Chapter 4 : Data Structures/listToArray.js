// Academic implementation, the syntax of the for loop is a bit unusual but overall the idea remains the same when we compare
// with more noob-friendly implementations I designed below

function listToArray(list) {
  
  let array = [];
  for (let node = list; node; node = node.ref) { // (init node; while node === true the loops goes on; incrementation)
    array.push(node.value);
    
    }
  
  return array;
  
}
      

// My original attempts lies below
// *********************** LOOP IMPLEMENTATION ************************

function listToArray(arg) {

  let array = [];
  
  while (true) {  
    if (arg.ref === null) {
      array.push(arg.value);
      break;
      }
      
  array.push(arg.value);
  arg = arg.ref;
  
    }
    
  return array;
  
}

// ****************************RECURSIVE IMPLEMENTATION ***********************

let array = [];

function recursive(arg) {
  
  if (arg.ref === null) {
    array.push(arg.value);
    return;
    
  } else {
  
    array.push(arg.value);
    recursive(arg.ref);
    
  }

  return array;
}

