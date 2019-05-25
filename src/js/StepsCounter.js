export default class StepsCounter {

  constructor (config) {
    let background = {
      width: 100,
      height: 50,
      background: "#cccccc",
      stroke: {
        width: 2,
        alpha: 1, 
        color: "#ffff00",
      }
    };
    let text = new PIXI.Text("0", {
      fontWeight: 'bold',
      fontSize: 30,
      fontFamily: 'Arial',
      fill: '#000000',
      align: 'center'
    });

    this.container = new PIXI.Sprite(createTexture(background));
    this.container.addChild(text);
    this.text = text;
    this.container.x = config.position.x;
    this.container.y = config.position.y;

    this.history = [{fieldSet: config.fieldSet}];
    this.currentStep = 0;

    this.updateView();
  }

  doStep (fieldSet, gapPosition, newGapPosition, tileNumber) {
    this.history.push({fieldSet: fieldSet, gapPosition: gapPosition, newGapPosition: newGapPosition, tileNumber: tileNumber});
    this.currentStep++;
    this.updateView();
  }

  undoStep () {
    let step = this.history[this.history.length-1];

    if (this.history.length > 1){
      this.history.splice(-1, 1);
      this.currentStep--;
      this.updateView();
    }
    
    return {step: step, lastStep: this.currentStep === 0};
  }

  updateView () {
    let str = this.text;

    str.text = this.currentStep.toString();
    str.x = (this.container.width - str.width) / 2;
    str.y = (this.container.height - str.height) / 2;
  }

}