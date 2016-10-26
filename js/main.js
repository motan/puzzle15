var renderer = PIXI.autoDetectRenderer(500, 500);

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new PIXI.Container();

var START_BUTTON = {
    x: 100,
    y: 100,
    width: 200,
    height: 80,
    background: "#f0f0f0",
    text: {
        string: "start",
        size: 20,
        color: "#ff0000",
        font: "Arial"
    }
};
/**
 *
 * scene
 *
 **/
function Scene(){
    var me = this;

    me.init = function () {
        this.container = new PIXI.Container();
        stage.addChild(this.container)
    };

    /**
     *
     * @param {Object} config
     * @param {number} config.x Coordinate
     * @param {number} config.y Coordinate
     * @param {number} config.width
     * @param {number} config.height
     * @param {string} config.background
     * @param {Object} config.text
     * @param {string} config.text.string
     * @param {number} config.text.size
     * @param {string} config.text.color
     * @param {string} config.text.font
     */
    me.addButton = function (config) {
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
console.log(back)
        me.button = new PIXI.Sprite(back.generateTexture());
        me.container.addChild(me.button)
    };

    me.show = function () {
        this.container.visibility = true;
    };

    me.hide = function () {
        this.container.visibility = false;
    };

    me.init();
}

/**
 *
 * intro
 *
**/

var intro = new Scene();
intro.addButton(START_BUTTON);

/**
 *
 * game
 *
 **/

var game = new Scene();

/**
 *
 * outro
 *
 **/

var outro = new Scene();

intro.show();
//Tell the `renderer` to `render` the `stage`
renderer.render(stage);