// Code is self explanatory on this one.

function reverseArray(arg) { 

  let newArray = [];
  
  for (let i = arg.length-1; i >= 0; i--){
    newArray.push(arg[i]);
    
  }
  
  return newArray;
  
}

/* the reverseArrayInPlace function takes the first (array[n-(n+1)]) and the last (array[n-1]) value of a given array and swaps 
them. Then it proceeds to replicate this mechanic with array[n-(n+2)] and array[n-2], etc. It doesn't matter if n is even or odd,
the number of permutations will be Math.floor(arg.length) / 2. */

function reverseArrayInPlace(arg){

  let tempValue = 0;

  for (let i = 0; i < Math.floor((arg.length)/2); i++) {  // [a,b,c,d] => [d,b,c,a] => [d,c,b,a]. Permutations = arg.length/2 
    tempValue = arg[i];
    arg[i] = arg[(arg.length-1)-i];
    arg[(arg.length-1)-i] = tempValue;
    
  }
  
  return arg;
  
}

