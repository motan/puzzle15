function Module (name) {
    this._name = name;
}

Module.prototype = {

    constructor: Module,

    setParts: function (config) {
        this.controller = config.controller;
        this.model = config.model;
        this.view = config.view;
    }
};