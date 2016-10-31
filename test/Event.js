describe("Event", function() {
    it("Event is defined", function() {
        expect(Event).toBeDefined();
        expect(Event).toEqual(jasmine.any(Function));
    });

    it("we can use it to define objects", function() {
        var obj1 = new Event();

        expect(obj1.on ).toEqual(jasmine.any(Function));
        expect(obj1.trigger ).toEqual(jasmine.any(Function));
    });
});