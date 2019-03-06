function range(start, end) {
  
  let arr = [];
  
  if (start < end) {
  	for (let i = start; i <= end; i++) {
    arr.push(i);
  	} 
  }
  
  if (start > end) {
  	for (let i = start; i >= end; i--) {
    arr.push(i);
  	}
  }
  
  return arr;
  
}
  
