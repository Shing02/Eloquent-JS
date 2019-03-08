function range(start, end, step) {
  
let array = [];

function oldRange(start, end) {  // if step is undefined
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
}
      
if (step === undefined) {
  oldRange(start, end);
}

if (step < 0) {
  for (let i = start; i >= end; i += step) {
    array.push(i);
  }
}

if (step > 0) {
  for (let i = start; i <= end; i += step) {
    array.push(i);
  }
}
    
return array;
  
}
