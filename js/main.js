var renderer = PIXI.autoDetectRenderer(500, 500);

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var Stage = new PIXI.Container();

var START_BUTTON = {
    x: 100,
    y: 100,
    width: 200,
    height: 80,
    background: "#f0f0f0",
    text: {
        string: "start",
        size: 20,
        color: "#ff0000",
        font: "Arial"
    }
};

var Game = {
    modules: {}
}


function animate() {
    // render the stage
    renderer.render(Stage);

    requestAnimationFrame(animate);
}

animate();