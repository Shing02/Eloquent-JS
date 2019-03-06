function range(start, end, step) {
  
let arr = [];

function oldRange(start, end) {  
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
}
      
if (step === undefined) {
  oldRange(start, end);
}

if (step < 0) {
	for (let i = start; i >= end; i += step) {
    arr.push(i);
  }
}

if (step > 0) {
 	for (let i = start; i <= end; i += step) {
  	arr.push(i);
  }
}
    
return arr;
  
}
