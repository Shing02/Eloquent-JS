const object = { 
  value : 1,
  ref : {
    value : 2,
    ref : {
      value : 3,
      ref : {
        value : 4,
        ref : {
          value : 5,
          ref : null
        }
      }
    }
  }
}
      
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





