function chessBoard(size) {

let firstLine = '#'; secondLine = ' '; tracker = 0;
//board is an alternance between first line '# # # # ' and second line ' # # # #'

for (let i = 0; i < size-1; i++) {
  i % 2 === 0 ? firstLine += ' ' : firstLine += '#';
  } 
// first line init

for (let j = 0; j < size-1; j++) {
  j % 2 === 0 ? secondLine += '#' : secondLine += ' ';
  }
//second line init
 
let fullBoard = firstLine;

while (tracker < size) {
  tracker === 0 ? undefined : 
  tracker % 2 === 0 ? fullBoard += '\n'+firstLine :
  fullBoard += '\n'+secondLine;
  tracker++;
  }
//loop while increments fullBoard variable, alternance between fl and sl

  console.log(fullBoard);

}

/*
chessBoard(8)
# # # # 
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #


