import * as PIXI from 'pixi.js';

export default class Scene {
  constructor (Stage) {
    this.container = new PIXI.Container();
    this.container.pivot = new PIXI.Point(0, 0);
    Stage.addChild(this.container);
  }

  show () {
    this.container.visible = true;
 }

  hide () {
    this.container.visible = false;
  }

  addChild (element) {
    this.container.addChild(element.container || element);
  }
}