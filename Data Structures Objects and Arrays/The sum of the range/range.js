function range(start, end) {
  
  let array = [];
  
  if (start < end) {
  	for (let i = start; i <= end; i++) {
    array.push(i);
  	} 
  }
  
  if (start > end) {
  	for (let i = start; i >= end; i--) {
    array.push(i);
  	}
  }
  
  return array;
  
}
  
