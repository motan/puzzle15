function Module(name) {
    this._name = name;
    Game.modules[name] = this;
}

Module.prototype = {
    
    constructor: Module,

    init: function (config) {
        this.model = config.model;
        this.controller = config.controller;
        this.view = config.view;
    }
}