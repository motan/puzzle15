import Button from './Button.js';

export default class Tile extends Button {
  constructor({ num, rowIndex, colIndex, config, cb }){
    super(config);
    
    this.clickCallback = () => cb(this);
    
    this.number = config.text.text;
    this.x = colIndex * config.width;
    this.y = rowIndex * config.height;
    this.fieldPosition = { x: colIndex, y: rowIndex }
  }
}