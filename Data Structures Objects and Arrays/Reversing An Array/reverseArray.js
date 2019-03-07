
function reverseArray(arg) { 

  let newArray = [];
  
  for (let i = arg.length-1; i >= 0; i--){
    newArray.push(arg[i]);
    
  }
  
  return newArray;
  
}



function reverseArrayInPlace(arg){

  let tempValue = 0;

  for (let i = 0; i < Math.floor((arg.length)/2); i++) {  // [a,b,c,d] => [d,b,c,a] => [d,c,b,a]. Permutations = arg.length/2 
    tempValue = arg[i];
    arg[i] = arg[(arg.length-1)-i];
    arg[(arg.length-1)-i] = tempValue;
    
  }
  
  return arg;
  
}

