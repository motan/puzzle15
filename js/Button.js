function Button(config){
    var me = this;

    PIXI.Sprite.call(this);

    if (config.text) {
            me.createText(config.text)
        }

        me.generateTexturesForButton(config);
        me.anchor.set(0.5);
        me.setPosition(config);

        me.setListeners();

        me.clickCallback = config.clickCallback;
        me.enable();
}

Button.prototype = Object.create(PIXI.Sprite.prototype);
Button.prototype.constructor = Button;

Button.prototype.ACTIONS = {
        tintDownFactor: 0x0000FF,
        tintHoverFactor: 0xFF0000,
        tintIdle: 0xFFFFFF,
        disabledAlpha: 0.4
    };

Button.prototype.LABEL_PADDING = 3

Button.prototype.createText = function (config) {
    var me = this;

    me.text = new PIXI.Text(config.text, config.style);
    me.addChild(me.text);
    me.text.anchor.set(0.5);
},

Button.prototype.setText = function (text) {
    if (typeof text === "string") {
        this.text.text = text;
    }
};

    //call it manually to fit text to container
Button.prototype.fitText = function () {
    var me = this,
        maxWidth = me.width - 2 * me.LABEL_PADDING,
        scale;

    if (maxWidth < me.text.width && maxWidth > 0) {
        scale = maxWidth / me.text.width;
        me.text.scale.x = scale;
        me.text.scale.y = scale;
    }
};

Button.prototype.generateTexturesForButton = function (config) {
    var me = this,
        textures;

    function getRightTexture(t) {
        return 'string' === typeof t ? Resources.readData("animationImages")[t] : t instanceof PIXI.Texture ? t : undefined;
    }

    if (!config) return;

    if (config.images) { //case of separate images
        textures = {
            idle: getRightTexture(config.images.up),
            down: getRightTexture(config.images.down),
            hover: getRightTexture(config.images.hover),
            disable: getRightTexture(config.images.disabled)
        };
    } else if (config.textures) { //case of separate images
        textures = config.textures;
    }
    else {//no images. default button images setting
        if (config.texture) { //case of one texture
            me.texture = config.texture;
        }
        me.useTint = true;
    }

    me.textures = textures;
};

Button.prototype.setListeners = function () {
    var me = this;
    me.mouseup = me.onButtonUp;
    me.mousedown = me.onButtonDown;
    me.mouseover = me.onButtonOver;
    me.mouseout = me.onButtonOut;
    me.click = me.onButtonClicked;
    // EVENTS - TOUCH
    me.touchstart = me.onButtonDown;
    me.touchend = me.onButtonClicked;
    me.touchendoutside = me.onButtonOut;
};

Button.prototype.setPosition = function (config) {
    var me = this;

    if (!config.dimensions) {
        return;
    }

    me.x = config.dimensions.x;
    me.y = config.dimensions.y;
};

/**
 * Setting of image for button
 * @param state  String : 'idle', 'down', 'hover', 'disable'
 */
Button.prototype.setButtonState = function (state) {
    var me = this;

    if (!me.isEnabled) {
        return
    }

    if (me.useTint) {
        switch (state) {
            case 'idle' :
                me.tint = me.ACTIONS.tintIdle;
                me.alpha = 1;
                break;

            case 'disable' :
                me.alpha = me.ACTIONS.disabledAlpha;
                me.tint = me.ACTIONS.tintIdle;
                break;

            case 'down' :
                me.tint = me.ACTIONS.tintDownFactor;
                break;

            case 'hover' :
                me.tint = me.ACTIONS.tintHoverFactor;
                break;
        }

    } else {
        me.texture = me.textures[state];
    }
};

Button.prototype.onButtonDown = function (data) {
    var me = this;

    if (data) {
        data.stopPropagation();
    }

    me.isdown = true;

    me.setButtonState('down');
    me.alpha = 1;
};

Button.prototype.onButtonUp = function (data) {
    var me = this;
    me.isdown = false;
    if (me.isOut) {
        me.isOut = false;
    }

    if (me.isOver) {
        me.setButtonState('hover');
    }
    else {
        me.setButtonState('idle');
    }
};

Button.prototype.onButtonOver = function () {
    var me = this;
    me.isOver = true;

    //if (arguments[0] && arguments[0].data.originalEvent.buttons == 1) {
    //    me.setButtonState('down');
    //} else {
    me.setButtonState('hover');
    //}
    if (me.isOut) {
        me.isOut = false;
    }
    //me.setButtonState('hover');
};

Button.prototype.onButtonOut = function () {
    var me = this;
    me.isOver = false;

    if (me.isdown) {
        me.isOut = true;
    }
    me.setButtonState('idle');
};

Button.prototype.onButtonClicked = function (data) {
    var me = this;
    if (me.clickCallback && me.isEnabled) {
        if (data) {
            data.stopPropagation();
        }
        me.clickCallback();
        me.setButtonState('idle');
    }
}

/**
 * SUGAR for overriding of Canvas buttons
 */

Button.prototype.disable = function () {
    var me = this;
    me.setButtonState('disable');
    me.isEnabled = false;
    me.interactive = false;
}

Button.prototype.enable = function () {
    var me = this;
    me.interactive = true;
    me.isEnabled = true;
    me.setButtonState('idle');
}

Button.prototype.show = function () {
    this.visible = true;
}

Button.prototype.hide = function () {
    this.visible = false;
}