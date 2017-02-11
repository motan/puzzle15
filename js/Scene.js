function Scene(){
    this.container = new PIXI.Container();
    this.container.pivot = new PIXI.Point(0, 0);
    Stage.addChild(this.container);
}

Scene.prototype.constructor = Scene;

Scene.prototype.show = function () {
    this.container.visible = true;
}

Scene.prototype.hide = function () {
    this.container.visible = false;
}

Scene.prototype.addChild = function (element) {
    this.container.addChild(element.container || element);
}