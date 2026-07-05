import { Scene, Label, Font, Color, Vector, Keys, Actor } from "excalibur";
import { Resources } from "../resources.js";

export class StartScene extends Scene {
  onInitialize(engine) {
    const logo = new Actor({
      pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight - 50),
    });

    logo.graphics.use(Resources.GameLogo.toSprite());

    this.add(logo);

    const startLabel = new Label({
      text: "Press SPACE to Start",
      pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight + 120),
      font: new Font({
        family: "PixelFont",
        size: 32,
        color: Color.Yellow,
        textAlign: "center",
      }),
    });

    this.add(startLabel);
  }

  onPreUpdate(engine) {
    // Listen for the spacebar to transition to the main game scene
    if (engine.input.keyboard.wasPressed(Keys.Space)) {
      engine.goToScene("World");
    }
  }
}
