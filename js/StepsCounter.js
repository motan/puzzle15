function StepsCounter (config) {
    var me = this,
        background = {
            width: 100,
            height: 50,
            background: "#cccccc",
            stroke: {
                width: 2,
                alpha: 1, 
                color: "#ffff00",
            }
        },
        text = new PIXI.Text("0", {
            fontWeight: 'bold',
            fontSize: 30,
            fontFamily: 'Arial',
            fill: '#000000',
            align: 'center'
        });

    me.container = new PIXI.Sprite(createTexture(background));
    me.container.addChild(text);
    me.text = text;
    me.container.x = config.position.x;
    me.container.y = config.position.y;

    me.history = [{fieldSet: config.fieldSet}];
    me.currentStep = 0;

    me.updateView();
}

StepsCounter.prototype.constructor = StepsCounter;

StepsCounter.prototype.doStep = function(fieldSet, gapPosition, newGapPosition, tileNumber) {
    this.history.push({fieldSet: fieldSet, gapPosition: gapPosition, newGapPosition: newGapPosition, tileNumber: tileNumber});
    this.currentStep++;
    this.updateView();
}

StepsCounter.prototype.undoStep = function() {
    var me = this,
        step = this.history[this.history.length-1];

    if (me.history.length > 1){
        me.history.splice(-1, 1);
        me.currentStep--;
        me.updateView();
    }
    
    return {step: step, lastStep: me.currentStep === 0};
}

StepsCounter.prototype.updateView = function() {
    var me = this,
        str = me.text;

    str.text = me.currentStep.toString();
    str.x = (me.container.width - str.width) / 2;
    str.y = (me.container.height - str.height) / 2;
}