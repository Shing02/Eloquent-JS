function flattening(arg) {
  return arg.reduce((accumulator, currentArray) => accumulator.concat(currentArray));
  }
