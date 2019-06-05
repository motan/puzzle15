import * as PIXI from 'pixi.js';
import Game from './Game.js';

let app = new PIXI.Application({ width: 500, height: 500 });
window.renderer = app.renderer;
window.PIXI = PIXI;

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
let Stage = new PIXI.Container();

let game = new Game(Stage);

function animate() {
  // render the stage
  app.renderer.render(Stage);

  requestAnimationFrame(animate);
}

window.onload = function () {
  animate();
  game.start();
}