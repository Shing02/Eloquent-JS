class Vec {

  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  
  plus(anotherVec) {
    return new Vec( x : this.x + anotherVec.x, y : this.y + anotherVec.y);
    }
  
  minus(anotherVec) {
    return new Vec( x : this.x - anotherVec.x, y : this.y - anotherVec.y);
    }
  
  get length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
}
