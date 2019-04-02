// IF YOU DON'T UNDERSTAND HOW THE PROGRAM WORKS, GO TO THE END WHERE I SHOW THE FIRST ITERATIONS
// A state is a picture of the village at a given moment, where place represents the location of the robot and parcels the array
// of parcels constantly updated

const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);

/* roadGraph == { 
      "Alice's House": [ "Bob's House", "Cabin", "Post Office" ],
      "Bob's House": [ "Alice's House", "Town Hall" ],
      "Cabin": [ "Alice's House" ],
      "Daria's House": [ "Ernie's House", "Town Hall" ],
      "Ernie's House": [ "Daria's House", "Grete's House" ],
      "Farm": [ "Grete's House", "Marketplace" ],
      "Grete's House": [ "Ernie's House", "Farm", "Shop" ],
      "Marketplace": [ "Farm", "Post Office", "Shop", "Town Hall" ],
      "Post Office": [ "Alice's House", "Marketplace" ],
      "Shop": [ "Grete's House", "Marketplace", "Town Hall" ],
      "Town Hall": [ "Bob's House", "Daria's House", "Marketplace", "Shop" ]
    }
*/

class VillageState {
    constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) { // this block may be redundant because the randomRobot function makes sure we pick a place we can access from our current location
      return this;        
    } else {
      let parcels = this.parcels
        .map(p => {
          if (p.place != this.place) return p;  // 
          return { place: destination, address: p.address };  // if a packet happens to be in our current location, we pick it and its position is updated each round
        })
        .filter(p => p.place != p.address); // if adress == our current location, we drop the packet
      return new VillageState(destination, parcels);
    }
  }
}

function runRobot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

function randomPick(array) {  
  let choice = Math.floor(Math.random() * array.length); 
  return array[choice];  // takes an array as argument and returns a random value in this array
}

function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.place])}; // takes a VillageSate instance as argument and returns one location accessible from the current location
}
  
VillageState.random = function(parcelCount = 5) { 
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels);
};

runRobot(VillageState.random(), randomRobot);

/* We will execute the first three iterations of the runRobot() function to show how things work.
First iteration:
  - turn == 0;
  - action == randomRobot(VillageState.random(), memory) => at this point the program execute the random() method to assign its value as an argument
    - for the sake of the explanation, let's set up a parcels array with the default value (5). It's very important to remember that runRobot never knows 
      what's inside the random() method, it just takes the returned value as an argument.
      In this case, the returned value, once the random() method executed, is 
      { 
        place : "Post Office, //this one won't change, the robot always begins here
        parcels : [  // this one is random, I just executed the random() method and pasted the result here
                  { place : "Farm", adress : "Post Office" }
                  { place : "Cabin", adress : "Alice's House" }
                  { place : "Daria's House", adress : "Cabin" }
                  { place : "Post Office", adress : "Bob's House" }
                  { place : "Farm", adress : "Cabin" }
                 ]
      }
      action == { direction : randomPick(roadGraph["Post Office"]) == randomPick([ "Alice's House", "Marketplace" ]) == "Alice's House" }
      action == { direction : "Alice's House" };
  - state == VillageState.random().move("Alice's House"); //Once again, we take the returned value of random() method, which is the village statewe just saw above.
    It's a VillageState instance so the move() method is inherited. 
    state == { 
        place : "Post Office, 
        parcels : [
                   { place : "Farm", adress : "Post Office" }
                   { place : "Cabin", adress : "Alice's House" }
                   { place : "Daria's House", adress : "Cabin" }
                   { place : "Alice's House", adress : "Bob's House" } // this object changed, its original position was "Post Office", the robot collected it and updated its position to the next destination
                   { place : "Farm", adress : "Cabin" }
                  ]
      }
    
Second iteration:
  - turn == 1;
  - action == { direction : "Bob's House" }
  - state == { 
              place : "Post Office", 
              parcels : [
                         { place : "Farm", adress : "Post Office" }
                         { place : "Cabin", adress : "Alice's House" }
                         { place : "Daria's House", adress : "Cabin" }
                         { place : "Farm", adress : "Cabin" }
                        ]
            }
     The { place : "Alice's House", adress : "Bob's House" } object we saw the last time is now { place : "Bob's House", adress : "Bob's House" } . 
     place == adress, the robot delivers the parcel and the parcel array is updated. 
     
Third iteration:
  - turn = 2;
  -  action : { direction : "Town Hall" }
  - state ==  state == { 
              place : "Town Hall", 
              parcels : [
                         { place : "Farm", adress : "Post Office" }
                         { place : "Cabin", adress : "Alice's House" }
                         { place : "Daria's House", adress : "Cabin" }
                         { place : "Farm", adress : "Cabin" }
                        ]
            }
