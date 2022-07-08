function Grid () {

    this.data = [];
    this.rows = 0;
    this.columns = 0;

}

Grid.prototype.display = function () { this.data.forEach(function (cell) { cell.show(); }); }

Grid.prototype.populate = function () {

    for (var r = 0; r < this.rows; r++) {

        for (var c = 0; c < this.columns; c++) {
    
            this.data.push(new Cell(r, c));
    
        }
    
      }

}

Grid.prototype.removeWalls = function (current, next) {

    var verticalDifference = current.x - next.x;
    var horizontalDifference = current.y - next.y;

         if (horizontalDifference === 1)  { current.walls[WALLS.LEFT]   = false; next.walls[WALLS.RIGHT]  = false; }
    else if (horizontalDifference === -1) { current.walls[WALLS.RIGHT]  = false; next.walls[WALLS.LEFT]   = false; }
    else if (verticalDifference   === 1)  { current.walls[WALLS.TOP]    = false; next.walls[WALLS.BOTTOM] = false; }
    else if (verticalDifference   === -1) { current.walls[WALLS.BOTTOM] = false; next.walls[WALLS.TOP]    = false; }

    current.visited = true;

}