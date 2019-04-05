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

class VillageState {
    constructor(place, parcels) {  // place represents the robot location at a given moment
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {  //if the robot can't access the destination directly from the current location
      return this;        
    } else {
      let parcels = this.parcels
        .map(p => {
          if (p.place != this.place) return p;  // 
          return { place: destination, address: p.address };  // if a packet happens to be in our current location, we pick it and its position is updated each round
        })
        .filter(p => p.place != p.address); // if adress == our current location, we drop the packet, ie it is erased from the array
      return new VillageState(destination, parcels);
    }
  }
}

function runRobot(state, robot, memory) {  // memory is useless here because the robot has a random behavior, it doesn't remember the previous place, it just wanders around until all the packets are dropped
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
  return {direction: randomPick(roadGraph[state.place])}; // the robot is a current place, this function examines all direct destinations from the current location and pick one randomly
}
  
VillageState.random = function(parcelCount = 5) { // the function generates 5 parcels if parcelCount is non precised
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph)); // picks a destination randomly in roadGraph and calls it the adress
    let place;
    do {
      place = randomPick(Object.keys(roadGraph)); // picks a destination randomly in roadGraph, PROVIDED IT IS NOT SIMILAR TO ADRESS, and calls it the destination
    } while (place == address);
    parcels.push({place, address});  
  }
  return new VillageState("Post Office", parcels);
};

runRobot(VillageState.random(), randomRobot);
