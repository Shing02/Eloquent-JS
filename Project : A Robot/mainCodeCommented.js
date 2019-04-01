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
    if (!roadGraph[this.place].includes(destination)) { // I don't understand this block because the randomRobot function makes sure we pick a place we can access from our current location
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
  return array[choice];
}

function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.place])}; 
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
