/* The indexOf(param,index) allows us to look for a character from a certain index in a string. It returns the number of the index 
if found, and it returns -1 if not. The while loop forces the indexOf built in function to increment its index each time a
character is found and to search again. */

function countBS(str, param) {

  let count = 0;
  let index = 0;
  
  while (str.indexOf(param, index) !== -1) {
    count++;
    index = (str.indexOf(param, index))+1;
  }
  
  return count;
  
}
