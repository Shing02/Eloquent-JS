class Group {

	constructor() {
  	this.group = [];
  }
  
  add(value) {
  	if (!this.group.includes(value)) {
    this.group.push(value); 
    }
  }
  
  delete(value) {
  	if (this.group.includes(value)) {
    	this.group.splice(this.group.indexOf(value), 1);  // or this.group = this.group.filter( v => v !== value)
  	}
  }
  
  has(value){
  	return this.group.includes(value);
  }
  
  static from(iterable) {
  	let anotherGroup = new Group();
    for (let val of iterable) {
    	anotherGroup.add(val);
    }
  }
  
    
}
