// -------------------------------
// Graph Data
// -------------------------------
const graph = {
  Islamabad: [{ city:"Lahore", cost:5 }, { city:"Peshawar", cost:4 }],
  Lahore: [{ city:"Islamabad", cost:5 }, { city:"Multan", cost:6 }],
  Peshawar: [{ city:"Islamabad", cost:4 }, { city:"Quetta", cost:7 }],
  Multan: [{ city:"Lahore", cost:6 }, { city:"Karachi", cost:8 }],
  Quetta: [{ city:"Peshawar", cost:7 }, { city:"Karachi", cost:9 }],
  Karachi: []
};

// -------------------------------
// BFS Algorithm
// -------------------------------
function bfs(start, goal) {
  let queue = [[start]];
  let visited = new Set();
  let steps = 0;
  while(queue.length>0){
    const path = queue.shift();
    const node = path[path.length-1];
    steps++;
    if(node===goal) return {path, cost:path.length-1, steps};
    if(!visited.has(node)){
      visited.add(node);
      for(let neighbor of graph[node]) queue.push([...path, neighbor.city]);
    }
  }
  return null;
}

// -------------------------------
// DFS Algorithm
// -------------------------------
function dfs(start, goal){
  let stack = [[start]];
  let visited = new Set();
  let steps=0;
  while(stack.length>0){
    const path = stack.pop();
    const node = path[path.length-1];
    steps++;
    if(node===goal) return {path, cost:path.length-1, steps};
    if(!visited.has(node)){
      visited.add(node);
      for(let neighbor of graph[node]) stack.push([...path, neighbor.city]);
    }
  }
  return null;
}

// -------------------------------
// UCS Algorithm
// -------------------------------
function ucs(start, goal){
  let pq = [{path:[start], cost:0}];
  let visited = new Set();
  let steps=0;
  while(pq.length>0){
    pq.sort((a,b)=>a.cost-b.cost);
    const current = pq.shift();
    const node = current.path[current.path.length-1];
    steps++;
    if(node===goal) return {path:current.path, cost:current.cost, steps};
    if(!visited.has(node)){
      visited.add(node);
      for(let neighbor of graph[node]){
        pq.push({path:[...current.path, neighbor.city], cost:current.cost+neighbor.cost});
      }
    }
  }
  return null;
}

// -------------------------------
// Run Selected Algorithm
// -------------------------------
function run(type){
  const start=document.getElementById("start").value;
  const end=document.getElementById("end").value;

  let result;
  if(type==='bfs') result=bfs(start,end);
  if(type==='dfs') result=dfs(start,end);
  if(type==='ucs') result=ucs(start,end);

  if(result){
    document.getElementById('output').innerHTML=`
      <h3>${type.toUpperCase()} Result</h3>
      <p><b>Path:</b> ${result.path.join(' → ')}</p>
      <p><b>Total Cost:</b> ${result.cost}</p>
      <p><b>Steps Taken:</b> ${result.steps}</p>
      <p>You can explain why you chose this path and algorithm.</p>
    `;
  }else{
    document.getElementById('output').innerHTML="<p>No path found!</p>";
  }
}

// -------------------------------
// Draw Static Graph using SVG
// -------------------------------
function drawGraph(){
  const width=600, height=400;
  const nodes={
    Islamabad:{x:100,y:50}, Lahore:{x:200,y:150}, Peshawar:{x:100,y:150},
    Multan:{x:300,y:250}, Quetta:{x:200,y:300}, Karachi:{x:400,y:350}
  };
  const edges=[
    ["Islamabad","Lahore","5"], ["Islamabad","Peshawar","4"],
    ["Lahore","Multan","6"], ["Peshawar","Quetta","7"],
    ["Multan","Karachi","8"], ["Quetta","Karachi","9"],
    ["Lahore","Islamabad","5"], ["Peshawar","Islamabad","4"],
    ["Multan","Lahore","6"], ["Quetta","Peshawar","7"]
  ];

  let svg=`<svg width="${width}" height="${height}">`;

  // Draw edges
  for(let [from,to,label] of edges){
    svg+=`<line x1="${nodes[from].x}" y1="${nodes[from].y}" x2="${nodes[to].x}" y2="${nodes[to].y}"></line>`;
    svg+=`<text x="${(nodes[from].x+nodes[to].x)/2}" y="${(nodes[from].y+nodes[to].y)/2-5}" class="cost">${label}</text>`;
  }

  // Draw nodes
  for(let city in nodes){
    const {x,y}=nodes[city];
    svg+=`<circle cx="${x}" cy="${y}" r="20"></circle>`;
    svg+=`<text x="${x}" y="${y}">${city[0]}</text>`;
  }

  svg+="</svg>";
  document.getElementById("graph").innerHTML=svg;
}

window.onload=drawGraph;
