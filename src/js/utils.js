import * as PIXI from 'pixi.js';

function createTexture(config){
    var me = this,
        graphics = new PIXI.Graphics(),
        stroke = config.stroke,
        bg = config.background,
        width = config.width,
        height = config.height;

    // set a fill and line style
    graphics.beginFill("0x" + bg.replace("#", ""));
    if (stroke) {
        graphics.lineStyle(stroke.width, "0x" + stroke.color.replace("#", "") , stroke.alpha);
        width -= stroke.width;
        height -= stroke.width;
    }

    graphics.drawRect(0, 0, width, height);
    graphics.endFill();

    return renderer.generateTexture(graphics, 1, renderer.resolution);
}

function generateButtonTextures (config){
    var textures = {};

    Object.keys(config.textures).forEach(function(key){
        config.textures[key].width = config.width;
        config.textures[key].height = config.height;
        textures[key] = createTexture(config.textures[key]);
    })

    return textures;
}

export {generateButtonTextures, createTexture}