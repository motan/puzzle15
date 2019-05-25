import Button from './Button.js';
import MainGame from './MainGame.js';
import Scene from './Scene.js';
import utils from './utils.js';

let renderer = PIXI.autoDetectRenderer(500, 500);

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
let Stage = new PIXI.Container();

let Game = {

    config: {
        width: 500,
        height: 500,
    },

    activeScene: false,

    start: function () {
        this.createScenes();
        this.switchScenes("intro");
    },

    createScenes: function () {

        this.scenes = {
            intro: this.createIntro(),
            mainGame: new MainGame(),
            outro: new Scene()
        }
           
    },

    switchScenes: function (newActiveScene) {
        let me = this;

        if (me.activeScene && me.activeScene !== newActiveScene) {
            me.scenes[me.activeScene].hide();
            me.scenes[newActiveScene].show();
            me.activeScene = newActiveScene;
        }
        else if (!me.activeScene) {
            Object.keys(me.scenes).forEach(function(scene){
                if (scene !== newActiveScene) {
                    me.scenes[scene].hide();
                }
            })
            me.activeScene = newActiveScene;
        }
    },

    createIntro: function () {
        let me = this,
            config = me.config,
            buttonConfig = {
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
                    text: "Start",
                    style: {
                        fontWeight: 'bold',
                        fontSize: 15,
                        fontFamily: 'Arial',
                        fill: '#000000',
                        align: 'center'
                    }
                },
                position: {
                    x: 250,
                    y: 250
                },
                clickCallback: function () {
                    me.switchScenes("mainGame");
                }
            },
            intro = new Scene(),
            bg = new PIXI.Sprite(createTexture({
                background: "#cccccc",
                width: config.width,
                height: config.height
            })),
            button;

        buttonConfig.images = generateButtonTextures(buttonConfig);
        button = new Button(buttonConfig);
        button.position.x = buttonConfig.position.x;
        button.position.y = buttonConfig.position.y;

        intro.addChild(bg);
        intro.addChild(button);

        return intro;
    }
}

function animate() {
    // render the stage
    renderer.render(Stage);

    requestAnimationFrame(animate);
}

window.onload = function () {
    animate();
    Game.start();
}