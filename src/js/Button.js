const ACTIONS = {
  tintDownFactor: 0x0000FF,
  tintHoverFactor: 0xFF0000,
  tintIdle: 0xFFFFFF,
  disabledAlpha: 0.4
};

const LABEL_PADDING = 3

export default class Button extends PIXI.Sprite
{
  constructor(config) {
        
    this.ACTIONS 

    if (config.text) {
      this.createText(config.text)
    }
    this.generateTexturesForButton(config);
    this.anchor.set(0.5);
    this.setPosition(config);
    this.setListeners();
    this.clickCallback = config.clickCallback;
    this.enable();
  }

  createText (config) {
    this.text = new PIXI.Text(config.text, config.style);
    this.addChild(this.text);
    this.text.anchor.set(0.5);
  }

  setText (text) {
    if (typeof text === "string") {
      this.text.text = text;
    }
  }

  fitText () {
    let maxWidth = this.width - 2 * LABEL_PADDING,
        scale;

    if (maxWidth < this.text.width && maxWidth > 0) {
      scale = maxWidth / this.text.width;
      this.text.scale.x = scale;
      this.text.scale.y = scale;
    }
  }

  generateTexturesForButton (config) {
    let textures;

    let getRightTexture = (t) => {
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
        this.texture = config.texture;
      }
      this.useTint = true;
    }

    this.textures = textures;
  }

  setListeners () {
    this.mouseup = this.onButtonUp;
    this.mousedown = this.onButtonDown;
    this.mouseover = this.onButtonOver;
    this.mouseout = this.onButtonOut;
    this.click = this.onButtonClicked;
    // EVENTS - TOUCH
    this.touchstart = this.onButtonDown;
    this.touchend = this.onButtonClicked;
    this.touchendoutside = this.onButtonOut;
  }

  setPosition (config) {
    if (!config.dimensions) {
        return;
    }

    this.x = config.dimensions.x;
    this.y = config.dimensions.y;
  }

  /**
   * Setting of image for button
   * @param state  String : 'idle', 'down', 'hover', 'disable'
   */
  setButtonState (state) {
    if (!this.isEnabled) {
      return;
    }

    if (this.useTint) {
      switch (state) {
        case 'idle' :
          this.tint = ACTIONS.tintIdle;
          this.alpha = 1;
          break;

        case 'disable' :
          this.alpha = ACTIONS.disabledAlpha;
          this.tint = ACTIONS.tintIdle;
          break;

        case 'down' :
          this.tint = ACTIONS.tintDownFactor;
          break;

        case 'hover' :
          this.tint = ACTIONS.tintHoverFactor;
          break;
      }

    } else {
        this.texture = this.textures[state];
    }
  }

  onButtonDown (data) {
    if (data) {
      data.stopPropagation();
    }

    this.isdown = true;

    this.setButtonState('down');
    this.alpha = 1;
  }

  onButtonUp (data) {
    this.isdown = false;
    if (this.isOut) {
      this.isOut = false;
    }

    if (this.isOver) {
      this.setButtonState('hover');
    }
    else {
      this.setButtonState('idle');
    }
  }

  onButtonOver () {
    this.isOver = true;
    this.setButtonState('hover');

    if (this.isOut) {
      this.isOut = false;
    }
};

  onButtonOut () {
    this.isOver = false;

    if (this.isdown) {
      this.isOut = true;
    }
    this.setButtonState('idle');
};

  onButtonClicked (data) {
    if (this.clickCallback && this.isEnabled) {
      if (data) {
        data.stopPropagation();
      }
      this.clickCallback();
      this.setButtonState('idle');
    }
}

  /**
   * SUGAR for overriding of Canvas buttons
   */

  disable () {
    this.setButtonState('disable');
    this.isEnabled = false;
    this.interactive = false;
  }

  enable () {
    this.interactive = true;
    this.isEnabled = true;
    this.setButtonState('idle');
  }

  show () {
    this.visible = true;
  }

  hide () {
    this.visible = false;
  }
}