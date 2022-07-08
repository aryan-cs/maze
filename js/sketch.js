var maze = new Grid();
var rows, coloumns, currentCell;

function preload() { defaultFont = loadFont("assets/fonts/default.ttf"); }

function setup () {

  frameRate(30);

  createCanvas(WIDTH, HEIGHT);
  canvas = document.getElementById("defaultCanvas0").getContext("2d");

  // createInputAndButton("edit input button", "message text");
  createCornerButton("generate new maze");

  maze.rows = floor(HEIGHT / CELL_SIZE);
  maze.columns = floor(WIDTH / CELL_SIZE);

  maze.populate();

  currentCell = maze.data[0];

}

function draw () {

  background(ACCENT_2);

  currentCell.visited = true;

  var next = currentCell.checkNeighbors();
  if (next) {

    next.visited = true;

    maze.removeWalls(currentCell, next);

    currentCell = next;

  }

  maze.display();

}