import { ScreenElement, Label, Font, FontUnit, Color, Vector } from "excalibur";
import { GameState } from "../gamestate";
export class ScoreUI extends ScreenElement {
  constructor() {
    super({
      x: 640 - 20, 
      y: 20,
      z: 999,
    });
  }

  onInitialize(engine) {
    // Create the text label
    this.scoreText = new Label({
      text: "Score: 0",
      pos: new Vector(0, 0),
      font: new Font({
        family: "PixelFont",
        size: 24,
        unit: FontUnit.Px,
        color: Color.White, 
        bold: true,
        textAlign: "right", 
      }),
    });

    this.addChild(this.scoreText);
  }

  onPreUpdate(engine, delta) {
    // Update the text every frame to match the GameState
    this.scoreText.text = `Score: ${GameState.score}`;
  }
}
