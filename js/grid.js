function Grid () {

    this.data = [];
    this.rows = 0;
    this.columns = 0;

}

Grid.prototype.display = function () { this.data.forEach(function (cell) { cell.show(); }); }