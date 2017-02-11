function MainGame () {
    Scene.call(this);

    this.config = {
        field: {
            position: {
                x: 100,
                y: 100
            }
        },
        undoButton: {
            width: 120,
            height: 60,
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
                text: "Step Back",
                style: {
                    fontWeight: 'bold',
                    fontSize: 15,
                    fontFamily: 'Arial',
                    fill: '#000000',
                    align: 'center'
                }
            },
            position: {
                x: 400,
                y: 120
            }
        }
    }

    this.createField();
    this.createStepsCounter();
}

MainGame.prototype = Object.create(Scene.prototype);
MainGame.prototype.constructor = MainGame;

MainGame.prototype.createField = function () {
    this.field = new Field(this.config.field);
    this.addChild(this.field);
}

MainGame.prototype.createStepsCounter = function (){
    var me = this,
        config = me.config.undoButton;

    me.stepsCounter = new StepsCounter({
        position: {
            x: 350,
            y: 25
        },
        fieldSet: this.field.fieldSet
    });

    config.clickCallback = function () {
        var pos = me.stepsCounter.undoStep(),
            tileNumber = pos.step.tileNumber,
            tile = me.field.container.children.find(function(el){//attention! find does not work in IE
                return el.number === tileNumber;
            });
            
        me.field.moveTile(tile, true);

        if (pos.lastStep){
            me.undoButton.disable();
        }
    }

    config.images = generateButtonTextures(config);
    me.undoButton = new Button(config);
    me.undoButton.x = config.position.x;
    me.undoButton.y = config.position.y;

    me.addChild(me.stepsCounter);
    me.addChild(me.undoButton);
    me.field.stepsCounter = me.stepsCounter;
    me.field.undoButton = me.undoButton;
    me.undoButton.disable();
}