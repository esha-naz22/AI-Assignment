// -------------------------------
// Graph Representation
// -------------------------------
const graph = {
  Islamabad: [
    { city: "Lahore", cost: 5 },
    { city: "Peshawar", cost: 4 }
  ],
  Lahore: [
    { city: "Islamabad", cost: 5 },
    { city: "Multan", cost: 6 }
  ],
  Peshawar: [
    { city: "Islamabad", cost: 4 },
    { city: "Quetta", cost: 7 }
  ],
  Multan: [
    { city: "Lahore", cost: 6 },
    { city: "Karachi", cost: 8 }
  ],
  Quetta: [
    { city: "Peshawar", cost: 7 },
    { city: "Karachi", cost: 9 }
  ],
  Karachi: []
};

// -------------------------------
// BFS Algorithm
// -------------------------------
function bfs(start, goal) {
  let queue = [[start]];
  let visited = new Set();
  let steps = 0;

  while (queue.length > 0) {
    const path = queue.shift();
    const node = path[path.length - 1];
    steps++;

    if (node === goal) {
      return { path, cost: path.length - 1, steps };
    }

    if (!visited.has(node)) {
      visited.add(node);
      for (let neighbor of graph[node]) {
        queue.push([...path, neighbor.city]);
      }
    }
  }
  return null;
}

// -------------------------------
// DFS Algorithm
// -------------------------------
function dfs(start, goal) {
  let stack = [[start]];
  let visited = new Set();
  let steps = 0;

  while (stack.length > 0) {
    const path = stack.pop();
    const node = path[path.length - 1];
    steps++;

    if (node === goal) {
      return { path, cost: path.length - 1, steps };
    }

    if (!visited.has(node)) {
      visited.add(node);
      for (let neighbor of graph[node]) {
        stack.push([...path, neighbor.city]);
      }
    }
  }
  return null;
}

// -------------------------------
// UCS Algorithm
// -------------------------------
function ucs(start, goal) {
  let pq = [{ path: [start], cost: 0 }];
  let visited = new Set();
  let steps = 0;

  while (pq.length > 0) {
    pq.sort((a, b) => a.cost - b.cost); // Priority Queue by cost
    const current = pq.shift();
    const node = current.path[current.path.length - 1];
    steps++;

    if (node === goal) {
      return { path: current.path, cost: current.cost, steps };
    }

    if (!visited.has(node)) {
      visited.add(node);
      for (let neighbor of graph[node]) {
        pq.push({
          path: [...current.path, neighbor.city],
          cost: current.cost + neighbor.cost
        });
      }
    }
  }
  return null;
}

// -------------------------------
// Run Algorithm & Display Output
// -------------------------------
function run(type) {
  let result;

  if (type === 'bfs') result = bfs('Islamabad', 'Karachi');
  if (type === 'dfs') result = dfs('Islamabad', 'Karachi');
  if (type === 'ucs') result = ucs('Islamabad', 'Karachi');

  if (result) {
    document.getElementById('output').innerHTML = `
      <h3>${type.toUpperCase()} Result</h3>
      <p><b>Path:</b> ${result.path.join(' → ')}</p>
      <p><b>Total Cost:</b> ${result.cost}</p>
      <p><b>Steps Taken:</b> ${result.steps}</p>
    `;
  } else {
    document.getElementById('output').innerHTML = `<p>No path found!</p>`;
  }
}
