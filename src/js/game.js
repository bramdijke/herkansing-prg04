import "../css/style.css";
import { Actor, Engine, Vector, DisplayMode, Color } from "excalibur";
import { Resources, ResourceLoader } from "./resources";

//Scenes
import { StartScene } from "./scenes/StartScene";
import { WorldScene } from "./scenes/WorldScene";
import { EndScene } from "./scenes/EndScene";

export class Game extends Engine {
  constructor() {
    super({
      width: 640,
      height: 480,
      maxFps: 60,
      displayMode: DisplayMode.FitScreen,
      antialiasing: false,
      snapToPixel: true,
      backgroundColor: Color.fromHex("#763b36"),
    });

    this.addScene("Start", new StartScene());
    this.addScene("World", new WorldScene());
    this.addScene("End", new EndScene());   

    this.start(ResourceLoader).then(() => this.startGame());
  }

  startGame() {
      this.goToScene("Start");
  }
}

new Game();
