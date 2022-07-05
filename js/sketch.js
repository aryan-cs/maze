var maze = new Grid();
var rows, coloumns, currentCell;

function preload() { defaultFont = loadFont("assets/fonts/default.ttf"); }

function setup () {

  frameRate(5);

  createCanvas(WIDTH, HEIGHT);
  canvas = document.getElementById("defaultCanvas0").getContext("2d");

  // createInputAndButton("edit input button", "message text");
  createCornerButton("generate new maze");

  maze.rows = floor(HEIGHT / CELL_SIZE);
  maze.columns = floor(WIDTH / CELL_SIZE);

  for (var r = 0; r < maze.rows; r++) {

    for (var c = 0; c < maze.columns; c++) {

      maze.data.push(new Cell(r, c));

    }

  }

  currentCell = maze.data[0];

}

function draw () {

  background(ACCENT_2);

  currentCell.visited = true;

  var next = currentCell.checkNeighbors();
  if (next) {

    currentCell = next;
    currentCell.visited = true;

  }

  maze.display();

}