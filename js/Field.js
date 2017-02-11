function Field(config){

    this.config = {
        tile: {
            width: 50,
            height: 50,
            textures: {
                up: {
                    background: "#9dc0f9",
                    stroke: {
                        width: 1,
                        alpha: 1, 
                        color: "#ffff00",
                    }
                },
                down: {
                    background: "#cccccc",
                    stroke: {
                        width: 1,
                        alpha: 1, 
                        color: "#ffff00",
                    }
                },
                hover: {
                    background: "#9df99d",
                    stroke: {
                        width: 1,
                        alpha: 1, 
                        color: "#ffff00",
                    }
                },
                disabled: {
                    background: "#cccccc",
                    stroke: {
                        width: 1,
                        alpha: 1, 
                        color: "#ffff00",
                    }
                }
            },
            text: {
                style: {
                    fontWeight: 'bold',
                    fontSize: 20,
                    fontFamily: 'Arial',
                    fill: '#000000',
                    align: 'center'
                }
            }
        }
    }
    this.container = new PIXI.Container();
    this.container.pivot = new PIXI.Point(0, 0);
    this.container.x = config.position.x;
    this.container.y = config.position.y;
    this.fieldSet = [];

    this.setUp();
    this.fill();
}

Field.prototype.constructor = Field;

Field.prototype.setUp = function () {
    var me = this,
        arr = [],
        size = 16,
        num, i;

    for (i = 0; i< size; i++) {
        num = Math.floor(Math.random() * size);
        while (arr.indexOf(num) !== -1) {
            num = Math.floor(Math.random() * size);
        }
        arr[i] = num;
    }

    for (i=0; i<4; i++){
        me.fieldSet.push(arr.slice(i*4, (i+1)*4));
    }
}

Field.prototype.fill = function () {
    var me = this,
        tileObject;

    me.fieldSet.forEach(function(row, rowIndex){
        row.forEach(function(tile, colIndex){
            if (tile !== 0) {
                tileObject = me.createTile(tile, rowIndex, colIndex);
                me.container.addChild(tileObject);
            }
            else {
                me.gapPosition = {x: colIndex, y: rowIndex}
            }
        })
    })
}

Field.prototype.createTile = function (num, rowIndex, colIndex) {
    var me = this,
        config = me.config.tile,
        tile;

    config.text.text = num;
    config.images = generateButtonTextures(config);
    config.clickCallback = function () {
        me.requestToMoveTile(this);
    }
    tile = new Button(config);
    tile.number = num;
    tile.x = colIndex * config.width;
    tile.y = rowIndex * config.height;
    tile.fieldPosition = {x: colIndex, y: rowIndex}

    return tile;
}

Field.prototype.requestToMoveTile = function (tile) {
    var me = this,
        row = tile.fieldPosition.y,
        col = tile.fieldPosition.x;

    if ((Math.abs(me.gapPosition.y - row) === 1 && me.gapPosition.x - col === 0)
    || (Math.abs(me.gapPosition.x - col) === 1 && me.gapPosition.y - row === 0)) {
        me.moveTile(tile);
    }
}

Field.prototype.moveTile = function (tile, isStepBack) {
    var me = this,
        row = me.gapPosition.y,
        col = me.gapPosition.x;

    me.gapPosition.x = tile.fieldPosition.x;
    me.gapPosition.y = tile.fieldPosition.y;
    tile.x = col * tile.width;
    tile.y = row * tile.height;
    tile.fieldPosition = {x: col, y: row};

    me.fieldSet[me.gapPosition.y][me.gapPosition.x] = 0;
    me.fieldSet[row][col] = tile.number;
    if (!isStepBack) {
        me.stepsCounter.doStep(me.fieldSet, {x: col, y: row}, {x: me.gapPosition.x, y: me.gapPosition.y}, tile.number);
        me.undoButton.enable();
    }
    if (me.gapPosition.x === me.fieldSet.length - 1 && me.gapPosition.y === me.fieldSet.length - 1){
        me.checkWin();
    }
}

Field.prototype.checkWin = function () {
    var me = this,
        checkArray = [],
        isWin = false;

    me.fieldSet.forEach(function(row){
        checkArray = checkArray.concat(row);
    })

    isWin = checkArray.pop().every(function(item, index){
        return item === index + 1;
    })

    if (isWin) {
        alert("Congrats")
    }
}