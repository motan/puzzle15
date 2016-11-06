
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
        var data = Array.prototype.slice.call(arguments, 1)
        this.eventManager.triggerEvent(event, data);
    },

    extend: function () {

    }
};
