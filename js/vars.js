// canvas
var canvas;
const SCALE = 1.6;
const VARIABLE_SCALING = false;
const WIDTH = 600, HEIGHT = 600;

function limit (value, min, max) { return Math.min(Math.max(value, min), max); }

window.addEventListener("resize", function (ignored) {

  if (VARIABLE_SCALING) { resizeCanvas(Math.floor(limit(window.innerWidth / SCALE, 1000, 1200)), Math.floor(limit(window.innerWidth / SCALE, 580, 610))); }

}, true);

// site
var title = "maze generator & solver";
var version = "version 1.1.1";

window.onload = function () { document.title = title; document.getElementById("title").innerHTML = title + "  <span style=\"font-size: 30px;\"> " + version + "<\span>"; }

function createInputAndButton (buttonMessage, createMessage) {

  var input = document.createElement("input");
  input.type = "text";
  input.id = "inputField";
  input.className = "field";

  document.getElementById("main").appendChild(input);

  var button = document.createElement("button");
  button.addEventListener("click", inputButtonClicked());
  button.className = "field_button";
  button.textContent = buttonMessage;

  document.getElementById("main").appendChild(button);

  if (createMessage) {

    var message = document.createElement("p");
    message.id = "result";
    message.className = "message";
    message.innerHTML = createMessage;

    document.getElementById("main").appendChild(message);

  }

  return [input, button];

}

function createCornerButton (buttonText) {

  var button = document.createElement("button");
  button.className = "corner_button";
  button.textContent = buttonText;
  button.id = "corner_button";

  document.getElementById("main").appendChild(button);

  document.getElementById("corner_button").onclick = function (event) { cornerButtonClicked(); }

  return button;

}

function inputButtonClicked () {

  var input = document.getElementById("inputField").value;
  var message = document.getElementById("result");

  // start here...

}

function cornerButtonClicked () {

  // start here...

  maze = new Grid();
  next;
  stack = [];
  path = [];
  finished = false;

  maze.rows = floor(HEIGHT / CELL_SIZE);
  maze.columns = floor(WIDTH / CELL_SIZE);

  maze.populate();

  current = maze.data[0];
  start = current;
  start.visited = true;
  end = maze.data[maze.data.length - 1];

  loop();

}

function mouseClicked () {

}

// colors
const BACKGROUND_COLOR = getComputedStyle(document.querySelector(":root")).getPropertyValue("--background-color");
const ACCENT_1 = getComputedStyle(document.querySelector(":root")).getPropertyValue("--accent-1");
const ACCENT_2 = getComputedStyle(document.querySelector(":root")).getPropertyValue("--accent-2");

// project
const CELL_SIZE = WIDTH / 10;
const WALLS = {

  TOP    : 0,
  LEFT   : 1,
  BOTTOM : 2,
  RIGHT  : 3

}