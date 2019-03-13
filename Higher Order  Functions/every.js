function every(array, f) {
  
  for (let arr of array) {
    if (!f(arr)) {
      return false;
    }
    
    return true;
    
    }
}


// No idea for the second implementation with some
