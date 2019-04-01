
function isEven(number) {

  if (number < 0) {
  return isEven(-number);
  }
  
  if (number === 0) {
  return true;
  }
  
  if (number === 1) {
  return false;
  }
  
  return isEven(number - 2);
  
}
