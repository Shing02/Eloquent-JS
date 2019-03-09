/* this function turns an 1D array like [1,2,3] into the following list (from an existing empty object):
{
  value : 1,
  ref : {
          value : 2,
          ref : {  etc.
The for loop does two things: if the considered object is empty, it fills it with the value and ref properties. If the object is
not empty, it calls the recursive fonction. The recursive fonction fills the object passed as a parameter if and only if the 
object is empty. If it isn't, it calls itself with the obj.ref parameter, etc. I had a hard time with this one and the
implementation may seem a bit gross but readable, let me know if you have a more elegant / concise way to do it. */


function arrayToList(array) {

  const obj = {};
  let temp;  // this one is because the arr variable isn't visible for the recursive fonction.

  function recursive(arg) {
    if (arg.ref === undefined) {
      arg.value = temp;
      arg.ref = {};
      return;
    } else {
      recursive(arg.ref);
    }
  }

  for (let arr of array) {
    temp = arr;
    if (obj.ref === undefined) {  //init first properties of obj.
      obj.value = arr;
      obj.ref = {}
    } else {
      recursive(obj); //once the first array item called, everythings takes place in the recursive function.
    }
  }
  
  return obj;
  
}
