import Field from './Field.js';
import StepsCounter from './StepsCounter.js';
import Scene from './Scene.js';
import Button from './Button.js';
import {generateButtonTextures} from './utils.js';

export default class MainGame extends Scene {
  constructor(Stage) {
    super(Stage);

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
              color: "#ffff00"
            }
          },
          down: {
            background: "#cccccc",
            stroke: {
              width: 1,
              alpha: 1, 
              color: "#ffff00"
            }
          },
          hover: {
            background: "#9df99d",
            stroke: {
              width: 1,
              alpha: 1, 
              color: "#ffff00"
            }
          },
          disabled: {
            background: "#cccccc",
            stroke: {
              width: 1,
              alpha: 1, 
              color: "#ffff00"
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

  createField () {
    this.field = new Field(this.config.field);
    this.addChild(this.field);
  }

  createStepsCounter (){
    let config = this.config.undoButton;

    this.stepsCounter = new StepsCounter({
      position: {
        x: 350,
        y: 25
      },
      fieldSet: this.field.fieldSet
    });

    config.clickCallback = () => {
      let pos = this.stepsCounter.undoStep(),
        tileNumber = pos.step.tileNumber,
        tile = this.field.container.children.find((el) => {//attention! find does not work in IE
          return el.number === tileNumber;
        });
          
      this.field.moveTile(tile, true);

      if (pos.lastStep){
        this.undoButton.disable();
      }
    }

    config.images = generateButtonTextures(config);
    this.undoButton = new Button(config);
    this.undoButton.x = config.position.x;
    this.undoButton.y = config.position.y;

    this.addChild(this.stepsCounter);
    this.addChild(this.undoButton);
    this.field.stepsCounter = this.stepsCounter;
    this.field.undoButton = this.undoButton;
    this.undoButton.disable();
  }

}