
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

    triggerEvent: function(event, data) {
        var listeners = this._events[event] || [];

        listeners.forEach(function(listener){
            listener.events[event].apply(listener, data);
        });
    }
};

var EventManager = new EventSystem();