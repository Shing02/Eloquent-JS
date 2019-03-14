const SCRIPTS = [
  {
    name: "Coptic",
    ranges: [[994, 1008], [11392, 11508], [11513, 11520]],
    direction: "ltr",
    year: -200,
    living: false,
    link: "https://en.wikipedia.org/wiki/Coptic_alphabet"
  },
  ...
  ]
  
  //FILTERING
  
function filter(array, test) {
  let passed = [];
  for (let element of array) {
    if (test(element)) {
      passed.push(element);
    }
  }
  return passed;
  }
  console.log(filter(SCRIPTS, script => script.living));
  // → [{name: "Mongolian", ...}, ...]
  
  //MAP
  
function map(array, transform) {
  let mapped = [];
  for (let element of array) {
    mapped.push(transform(element));
  }
  return mapped;
  }
  
let rtlScripts = SCRIPTS.filter(s => s.direction == "rtl");
console.log(map(rtlScripts, s => s.name));
// → ["Adlam", "Arabic", "Imperial Aramaic", ...]

// REDUCE

function characterCount(script) {
  return script.ranges.reduce((count, [from, to]) => {
  return count + (to - from);
  }, 0);
}

console.log(SCRIPTS.reduce((a, b) => {
return characterCount(a) < characterCount(b) ? b : a;
}));
// → {name: "Han", ...}

// COMPOSABILITY 
// HIGHER ORDER FUNCTIONS

function average(array) {
  return array.reduce((a, b) => a + b) / array.length;
  }

console.log(Math.round(average(
  SCRIPTS.filter(s => s.living).map(s => s.year))));
// → 1188

console.log(Math.round(average(
SCRIPTS.filter(s => !s.living).map(s => s.year))));
// → 188

//VS LOW ABSTRACT IMPERATIVE APPROACH

let total = 0, count = 0;
for (let script of SCRIPTS) {
if (script.living) {
total += script.year;
count += 1;
}
}
console.log(Math.round(total / count));
// → 1188

// OTHER EXAMPLES

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    }))   {
    return script;
    }
  }
  
return null;

}

console.log(characterScript(121));
// → {name: "Latin", ...}


function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({name, count: 1});
    } else {
    counts[known].count++;
    }
  }
  
return counts;
}
console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
93// → [{name: false, count: 2}, {name: true, count: 3}]


function textScripts(text) {
  let scripts = countBy(text, char => {
  let script = characterScript(char.codePointAt(0));
  return script ? script.name : "none";
  }).filter(({name}) => name != "none");
  let total = scripts.reduce((n, {count}) => n + count, 0);
    if (total == 0) return "No scripts found";
    return scripts.map(({name, count}) => {
    return `${Math.round(count * 100 / total)}% ${name}`;
    }).join(", ");
  }
  
console.log(textScripts(' 英国的狗说 "woof",
// → 61% Han, 22% Latin, 17% Cyrillic
俄罗斯的狗说 "тяв"'));
