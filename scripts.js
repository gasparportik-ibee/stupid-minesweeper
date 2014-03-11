Array.prototype.fill = function(value) {
    var i = this.length;
    while (i-- > 0) {
        this[i] = value;
    }
}


function MineSweeper(width, height) {
    this.width = width;
    this.height = height;
    this.fieldCount = width*height;
    this.tileSize = 36;
    this.mineField = [];
    this.mineCounters = [];
    this.mineCount = 10;
    this.playing = false
    this.buttonsDown = 0;
    this.debug = false;
    var self = this;

    this.checkWin = function () {
        if (this.playing == false) return false;
        for (var i = 0; i < height; ++i) {
            for (var j = 0; j < width; ++j) {
                var elem = document.getElementById(j+","+i);
                if (this.mineField[j][i] == 'mine') {
                    if (elem.className != 'flag') {
                        return false;
                    }
                } else
                if (elem.className == 'none') {
                    return false;
                }
            }
        }
        return true;
    }

    var fill = function () {
        var board = document.querySelector(".board");
        while(board.hasChildNodes()) board.removeChild(board.firstChild);
        this.mineField = [];
        this.mineCounters = new Array(this.height);
        var mines = 0;
        for (var i = 0; i < height; ++i) {
            this.mineCounters[i] = new Array(this.width);
            this.mineCounters[i].fill(0);

        }
        for (var i = 0; i < height; ++i) {
            this.mineField.push([]);
            this.mineCounters.push([]);
            var mf = this.mineField[this.mineField.length-1];
            for (var j = 0; j < width; ++j) {
                var elem = 'none';
                if (mines < this.mineCount && Math.random()*this.fieldCount <= this.mineCount) {
                    elem = 'mine';
                    mines++;
                    this.fillMineCount(i, j);
                }
                this.mineCounters[this.mineCounters.length - 1] = 0;
                mf.push(elem);
                var div = document.createElement("div");
                div.id = i+","+j;
                if (elem == 'mine') {
                    div.style.borderColor = 'red';
                }
//                div.className = elem;
                div.className = 'none';
                div.addEventListener('mousedown', this.clickHandler,false);
                div.addEventListener('mouseup', this.mouseUp,false);
                board.appendChild(div);
            }
        }
        document.querySelector(".score").innerHTML = "";
        document.querySelector(".header > .mineCount").innerHTML = mines;
        board.style.width = (this.width*this.tileSize)+ 'px';
        board.style.height = (this.height*this.tileSize)+ 'px';

    }

    this.clickHandler = function(event) {
        var coords = event.target.id.split(',');
        if (event.button == 0) {
            self.buttons |= 1;
        }
        if (event.button == 2) {
            self.buttons |= 2;
        }
        if (!self.playing) {
            event.preventDefault();
            return;
        }
        if (self.buttons == 2) {
            if (self.buttons == 2) {
                if (event.target.className == 'flag') {
                    event.target.className = 'none';
                } else {
                    event.target.className = 'flag';
                }
            }
        }
        if (self.buttons == 1) {
            if (event.target.className == "flag") {
                return false;
            }
            if (self.mineField[coords[0]][coords[1]] == 'mine') {
                document.querySelector(".score").innerHTML = "GAME OVER!";
                self.showMines();
                self.playing = false;
            } else {
                event.target.className = "visited";
                event.target.dataset.number = self.mineCounters[coords[0]][coords[1]];
                if (event.target.dataset.number > 0) {
                    event.target.className = "number";
                }
            }

        }
        if (self.buttons == 3) {
            if (event.target.className != 'none') {
        }
        }
        if (self.checkWin()) {
            document.querySelector(".score").innerHTML = "YOU WON";
            this.playing = false;
        }
    }
    this.mouseUp = function (event) {
        if (event.button == 0) {
            self.buttons ^= 1;
        }
        if (event.button == 2) {
            self.buttons ^= 2;
        }
    }

    this.revealAll = function(x, y) {
    //        var elem = document.getElementById(x+","+y);
    //        if (elem.className == 'none' && this.mineField[x][y] == 'none') {
    //            event.target.className = "visited";
    //            event.target.dataset.number = self.mineCounters[coords[0]][coords[1]];
    //            if (event.target.dataset.number > 0) {
    //                event.target.className = "number";
    //            }
    //        }
    //        if (x > 0) {
    //
    //        }
    //        if (x < this.width) {
    //
    //        }
    //        if (y > 0) {
    //
    //        }
    //        if (y < this.height) {
    //    }
    }

    this.showMines = function () {
        for (var i = 0; i < height; ++i) {
            for (var j = 0; j < width; ++j) {
                if (this.mineField[j][i] == 'mine') {
                    document.getElementById(j+","+i).className = 'mine';
                }
            }
        }
    }

    this.fillMineCount = function (x, y) {
        if (x > 0) {
            this.mineCounters[x-1][y-1]++;
            this.mineCounters[x-1][y]++;
            this.mineCounters[x-1][y+1]++;
        }
        this.mineCounters[x][y-1]++;
        this.mineCounters[x][y+1]++;
        if (x < this.width) {
            this.mineCounters[x+1][y-1]++;
            this.mineCounters[x+1][y]++;
            this.mineCounters[x+1][y+1]++;
        }
    }



    this.newGame = function () {
        fill.call(this);
        this.playing = true;

    }
    this.newGame();

}

