function Button (config) {
    //this.init(config)
}

Button.prototype = Object.create(PIXI.Sprite.prototype);

/* 
 * @param {object} config The config of the button
 * @param {object} config.text
 * @param {object} config.back
 *
*/
Button.prototype.init = function ( config ) {
    var me = this,
        back = new PIXI.Graphics(),
        text = new PIXI.Text("Start");

    back.clear();
    back.beginFill(0xFF3300);
    back.drawRect(0,
        0,
        config.width,
        config.height);
    back.endFill();

    me.texture = back.generateCanvasTexture();
}
