function View () {
    var me = this;

    me.rootContainer = new PIXI.Container();
    me.init();
    Stage.addChild(me.rootContainer);
}

View.prototype = Observable;

View.prototype.constructor = View;

View.prototype.init = function () {

}

View.prototype.show = function () {
    this.rootContainer.renderable = true;
}

View.prototype.hide = function () {
    this.rootContainer.renderable = false;
}

View.prototype.addContainer = function () {
    var container = new PIXI.Container();

    this.rootContainer.addChild(container);

    return container;
}