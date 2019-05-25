export default class Field {
  constructor (config){
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

  setUp () {
    let arr = [],
        size = 16,
        num, i;

    for (i = 0; i < size; i++) {
      num = Math.floor(Math.random() * size);
      while (arr.indexOf(num) !== -1) {
          num = Math.floor(Math.random() * size);
      }
      arr[i] = num;
    }

    for (i = 0; i < 4; i++) {
      this.fieldSet.push(arr.slice(i * 4, (i + 1) * 4));
    }
  }

  fill () {
    let tileObject;

    this.fieldSet.forEach(function (row, rowIndex) {
      row.forEach(function (tile, colIndex) {
        if (tile !== 0) {
          tileObject = this.createTile(tile, rowIndex, colIndex);
          this.container.addChild(tileObject);
        }
        else {
          this.gapPosition = { x: colIndex, y: rowIndex }
        }
      })
    })
  }

  createTile (num, rowIndex, colIndex) {
    let config = this.config.tile,
        tile;

    config.text.text = num;
    config.images = generateButtonTextures(config);
    config.clickCallback = function () {
        this.requestToMoveTile(this);
    }
    tile = new Button(config);
    tile.number = num;
    tile.x = colIndex * config.width;
    tile.y = rowIndex * config.height;
    tile.fieldPosition = { x: colIndex, y: rowIndex }

    return tile;
  }

  requestToMoveTile (tile) {
    let row = tile.fieldPosition.y,
        col = tile.fieldPosition.x;

    if ((Math.abs(this.gapPosition.y - row) === 1 && this.gapPosition.x - col === 0)
        || (Math.abs(this.gapPosition.x - col) === 1 && this.gapPosition.y - row === 0)) {
          this.moveTile(tile);
    }
  }

  moveTile (tile, isStepBack) {
    let row = this.gapPosition.y,
        col = this.gapPosition.x;

    this.gapPosition.x = tile.fieldPosition.x;
    this.gapPosition.y = tile.fieldPosition.y;
    tile.x = col * tile.width;
    tile.y = row * tile.height;
    tile.fieldPosition = { x: col, y: row };

    this.fieldSet[this.gapPosition.y][this.gapPosition.x] = 0;
    this.fieldSet[row][col] = tile.number;
    if (!isStepBack) {
        this.stepsCounter.doStep(this.fieldSet, { x: col, y: row }, { x: this.gapPosition.x, y: this.gapPosition.y }, tile.number);
        this.undoButton.enable();
    }
    if (this.gapPosition.x === this.fieldSet.length - 1 && this.gapPosition.y === this.fieldSet.length - 1) {
        this.checkWin();
    }
  }

  checkWin () {
    let checkArray = [],
        isWin = false;

    this.fieldSet.forEach(function (row) {
      checkArray = checkArray.concat(row);
    })

    isWin = checkArray.pop().every(function (item, index) {
      return item === index + 1;
    })

    if (isWin) {
      alert("Congrats")
    }
  }

}