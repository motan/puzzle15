
function Observable() {
    this.events = {};
    this.eventManager = EventManager;
}

Observable.prototype = {

    on: function(event, callback, context) {
        this.hasOwnProperty('events') || (this.events = {});
        this.events.hasOwnProperty(event) || (this.events[event] = []);
        this.events[event] = callback;
        this.eventManager.addListener(this, event);
    },

    trigger: function(event) {
        this.eventManager.triggerEvent(event);
    },

    extend: function () {

    }
};

function MyObject(name){
    Observable.call(this);
    this.name = name;
}

MyObject.prototype = Object.create(Observable.prototype);
MyObject.prototype.constructor = MyObject;
MyObject.prototype.foo = function(){
    this.trigger("foo");
};

var o = new MyObject("o");
var a = new MyObject("a");

o.on("foo", function(){
    console.log("foo received in o")
    console.log(this)
});

a.on("foo", function(){
    console.log("foo received in a")
    console.log(this)
});