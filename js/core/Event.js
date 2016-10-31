
function EventSystem () {
    this._events = {};
}

EventSystem.prototype = {

    constructor: EventManager,

    addListener: function(context, event) {
        this.hasOwnProperty('_events') || (this._events = {});
        this._events.hasOwnProperty(event) || (this._events[event] = []);
        this._events[event].push(context);
    },

    triggerEvent: function(event) {
        var listeners = this._events[event] || [];

        listeners.forEach(function(listener){
            listener.events[event].apply(listener);
        });
    }
};

var EventManager = new EventSystem();


function Event() {
    this.events = {};
    this.eventManager = EventManager;
}

Event.prototype = {

    on: function(event, callback, context) {
      this.hasOwnProperty('events') || (this.events = {});
      this.events.hasOwnProperty(event) || (this.events[event] = []);
      this.events[event] = callback;
      this.eventManager.addListener(this, event);
    },

    trigger: function(event) {
        this.eventManager.triggerEvent(event);
    }
};

function MyObject(name){
    Event.call(this);
    this.name = name;
}

MyObject.prototype = new Event();
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