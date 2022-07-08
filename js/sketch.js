var maze = new Grid();
var start, end, current, next, stack = [], path = [], finished = false;

function preload() { defaultFont = loadFont("assets/fonts/default.ttf"); }

function setup () {

  frameRate(999);

  createCanvas(WIDTH, HEIGHT);
  canvas = document.getElementById("defaultCanvas0").getContext("2d");

  // createInputAndButton("edit input button", "message text");
  createCornerButton("generate new maze");

  maze.rows = floor(HEIGHT / CELL_SIZE);
  maze.columns = floor(WIDTH / CELL_SIZE);

  maze.populate();

  current = maze.data[0];
  start = current;
  start.visited = true;
  end = maze.data[maze.data.length - 1];

}

function draw () {

  background(ACCENT_2);

  createMaze();
  maze.data.forEach(function (cell) { cell.findNeighbors(maze); });

  pathFind();

}

function createMaze () {

  if (!finished) {

    current.visited = true;

    var next = current.checkNeighbors();
    
    if (next) {

      next.visited = true;
      stack.push(current);
      maze.removeWalls(current, next);

      current = next;

    }

    else if (stack.length) { current = stack.pop(); }

    else { finished = true; maze.resetVisits(); }

  }

  maze.display(stack, finished);

}

function pathFind () {

  if (finished) {

    pathfinding = true;

    frameRate(999);

    path.push(current);

    next = null;

    for (var n = 0; n < current.neighbors.length; n++) { if (!current.neighbors[n].visited) { next = current.neighbors[n]; } }

    if (next && !next.visited) {

      next.visited = true;
      next.previous = current;
      current = next;

    }

    else { current = path.pop(); current = path.pop(); }
    
    path.forEach(function (cell) { cell.point("path", path); });
    start.point("start");
    end.point("end");

    if (current == end) {
      
      current.path(path[path.length - 1]); end.point("end"); path[path.length - 1].point("path"); 
      noLoop(); console.log("finished");
    
    }

  }

}