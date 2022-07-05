function Cell (r, c) {

    this.x = r;
    this.y = c;
    this.size = CELL_SIZE;
    this.visited = false;

              /* top, left, bottom, right */
    this.walls = [true, true, true, true];

}

Cell.prototype.show = function () {

    stroke(ACCENT_1);
    strokeWeight(1);

    if (this.walls[walls.top])    { line(this.y * this.size, this.x * this.size, this.y * this.size + this.size, this.x * this.size);                         } // top
    if (this.walls[walls.left])   { line(this.y * this.size, this.x * this.size, this.y * this.size, this.x * this.size + this.size);                         } // left
    if (this.walls[walls.bottom]) { line(this.y * this.size, this.x * this.size + this.size, this.y * this.size + this.size, this.x * this.size + this.size); } // bottom
    if (this.walls[walls.right])  { line(this.y * this.size + this.size, this.x * this.size, this.y * this.size + this.size, this.x * this.size + this.size); } // right

    if (this.visited) {

        strokeWeight(4);
        fill(ACCENT_1);
        rect(this.y * this.size + this.size / 6, this.x * this.size + this.size / 6, this.size / 1.5, this.size / 1.5, 5);

    }

}

Cell.prototype.checkNeighbors = function () {

    var neighbors = [];

    var right  = maze.data[this.x * maze.columns + this.y + 1];
    var left   = maze.data[this.x * maze.columns + this.y - 1];
    var top    = maze.data[(this.x - 1) * maze.columns + this.y];
    var bottom = maze.data[(this.x + 1) * maze.columns + this.y];

    if (right  && !right.visited)  { neighbors.push(right);  }
    if (left   && !left.visited)   { neighbors.push(left);   }
    if (top    && !top.visited)    { neighbors.push(top);    }
    if (bottom && !bottom.visited) { neighbors.push(bottom); }

    if (neighbors.length) {

        var nextNeighbor = neighbors[floor(random(0, neighbors.length))];
        nextNeighbor.visited = true;
        return nextNeighbor;

    }

    return null;

}