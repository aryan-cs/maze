function Cell (r, c) {

    this.x = r;
    this.y = c;
    this.size = CELL_SIZE;
    this.visited = false;
    this.neighbors = [];
    this.previous;

              /* top, left, bottom, right */
    this.walls = [true, true, true, true];

}

Cell.prototype.show = function (finished) {

    if (this.visited && !finished) {

        noStroke();
        fill(49, 93, 163);
        rect(this.y * this.size + this.size / 6, this.x * this.size + this.size / 6, this.size / 1.5, this.size / 1.5, 5);

    }

    stroke(ACCENT_1);
    strokeWeight(5);
    strokeCap(ROUND);

    if (this.walls[WALLS.TOP])    { line(this.y * this.size, this.x * this.size, this.y * this.size + this.size, this.x * this.size);                         } // top
    if (this.walls[WALLS.LEFT])   { line(this.y * this.size, this.x * this.size, this.y * this.size, this.x * this.size + this.size);                         } // left
    if (this.walls[WALLS.BOTTOM]) { line(this.y * this.size, this.x * this.size + this.size, this.y * this.size + this.size, this.x * this.size + this.size); } // bottom
    if (this.walls[WALLS.RIGHT])  { line(this.y * this.size + this.size, this.x * this.size, this.y * this.size + this.size, this.x * this.size + this.size); } // right

}

Cell.prototype.findNeighbors = function (maze) {

    this.neighbors = [];

    var right  = maze.data[this.x * maze.columns + this.y + 1];
    var left   = maze.data[this.x * maze.columns + this.y - 1];
    var top    = maze.data[(this.x - 1) * maze.columns + this.y];
    var bottom = maze.data[(this.x + 1) * maze.columns + this.y];

    if (right  && right.y  == this.y + 1) { if (!this.walls[WALLS.RIGHT]  && !right.walls[WALLS.LEFT]) { this.neighbors.push(right);  } }
    if (left   && left.y   == this.y - 1) { if (!this.walls[WALLS.LEFT]   && !left.walls[WALLS.RIGHT]) { this.neighbors.push(left);   } }
    if (top    && top.x    == this.x - 1) { if (!this.walls[WALLS.TOP]    && !top.walls[WALLS.BOTTOM]) { this.neighbors.push(top);    } }
    if (bottom && bottom.x == this.x + 1) { if (!this.walls[WALLS.BOTTOM] && !bottom.walls[WALLS.TOP]) { this.neighbors.push(bottom); } }

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
        return nextNeighbor;

    }

    return null;

}

Cell.prototype.connect = function (cell) {

    if (cell) {

        stroke(92, 139, 214);
        strokeWeight(this.size * (1 / 3));
        line(this.y * this.size + this.size / 2, this.x * this.size + this.size / 2, cell.y * cell.size + cell.size / 2, cell.x * cell.size + cell.size / 2);
        
    }

}

Cell.prototype.path = function (cell) {

    if (cell) {

        stroke(209, 158, 31);
        strokeWeight(this.size * (1 / 3));
        line(this.y * this.size + this.size / 2, this.x * this.size + this.size / 2, cell.y * cell.size + cell.size / 2, cell.x * cell.size + cell.size / 2);
        
    }

}

Cell.prototype.clear = function () {

    noStroke();
    fill(ACCENT_2);
    rect(this.y * this.size + this.size, this.x * this.size + this.size, this.size, this.size, 3);

}

Cell.prototype.point = function (flag, queue) {

    if (flag == "start") { fill(82, 209, 97); }
    else if (flag == "end") { fill(255, 54, 93); }
    else if (flag == "path") {
        
        fill(255, 199, 59);
        if (queue && queue.length) {
         
            for (var n = 0; n < queue.length; n++) {
                
                queue[n].path(queue[n + 1]);
                queue[n].point(flag, []);
                
            }

        }
    
    }

    noStroke();
    rect(this.y * this.size + this.size / 6, this.x * this.size + this.size / 6, this.size / 1.5, this.size / 1.5, 5);

}