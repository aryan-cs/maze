function Cell (r, c) {

    this.x = r;
    this.y = c;
    this.size = CELL_SIZE;
    this.visited = false;

              /* top, left, bottom, right */
    this.walls = [true, true, true, true];

}

Cell.prototype.show = function () {

    if (this.visited) {

        noStroke();
        fill(49, 93, 163);
        rect(this.y * this.size + this.size / 6, this.x * this.size + this.size / 6, this.size / 1.5, this.size / 1.5, 5);
        // rect(this.y * this.size, this.x * this.size, this.size, this.size);

    }

    stroke(ACCENT_1);
    strokeWeight(5);
    strokeCap(ROUND);

    if (this.walls[WALLS.TOP])    { line(this.y * this.size, this.x * this.size, this.y * this.size + this.size, this.x * this.size);                         } // top
    if (this.walls[WALLS.LEFT])   { line(this.y * this.size, this.x * this.size, this.y * this.size, this.x * this.size + this.size);                         } // left
    if (this.walls[WALLS.BOTTOM]) { line(this.y * this.size, this.x * this.size + this.size, this.y * this.size + this.size, this.x * this.size + this.size); } // bottom
    if (this.walls[WALLS.RIGHT])  { line(this.y * this.size + this.size, this.x * this.size, this.y * this.size + this.size, this.x * this.size + this.size); } // right

    fill("rgba(0, 0, 0, 0)");
    rect(2, 2, WIDTH - 5, HEIGHT - 5, 5);

}

Cell.prototype.checkNeighbors = function () {

    var neighbors = [];

    var right  = maze.data[this.x * maze.columns + this.y + 1];
    var left   = maze.data[this.x * maze.columns + this.y - 1];
    var top    = maze.data[(this.x - 1) * maze.columns + this.y];
    var bottom = maze.data[(this.x + 1) * maze.columns + this.y];

    if (right  && !right.visited  && right.y  == this.y + 1) { neighbors.push(right);  }
    if (left   && !left.visited   && left.y   == this.y - 1) { neighbors.push(left);   }
    if (top    && !top.visited    && top.x    == this.x - 1) { neighbors.push(top);    }
    if (bottom && !bottom.visited && bottom.x == this.x + 1) { neighbors.push(bottom); }

    if (neighbors.length) {

        var nextNeighbor = neighbors[floor(random(0, neighbors.length))];
        nextNeighbor.visited = true;

        // to-do: adjust this code to connect all items in stack
        stroke(49, 93, 163);
        strokeWeight(this.size - 20);
        line(this.y * this.size + this.size / 2, this.x * this.size + this.size / 2, nextNeighbor.y * nextNeighbor.size + nextNeighbor.size / 2, nextNeighbor.x * nextNeighbor.size + nextNeighbor.size / 2);

        return nextNeighbor;

    }

    return null;

}