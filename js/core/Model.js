function Model() {
    this.data = {};
}

Model.prototype = {

    constructor: Model,

    storeData: function ( key, value ) {
        this.data[key] = value;
    },

    readData: function (key) {
        return this.data[key];
    }
}