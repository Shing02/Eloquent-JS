
function loop(value, test, update, body) {
   for (let i = value; test(i); value = update(i)) {
     body(i);
   }
 }
