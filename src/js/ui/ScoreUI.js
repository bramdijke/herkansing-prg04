import { ScreenElement, Label, Font, FontUnit, Color, Vector } from "excalibur";
import { GameState } from "../gamestate";
export class ScoreUI extends ScreenElement {
  constructor() {
    super({
      x: 640 - 20, // Move it to the right side of the screen (assuming 800 width)
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
        color: Color.White, // Change this to Black if your background is light!
        bold: true,
        textAlign: "right", // Aligns text to the right so it expands backwards
      }),
    });

    this.addChild(this.scoreText);
  }

  onPreUpdate(engine, delta) {
    // Update the text every frame to match the GameState
    this.scoreText.text = `Score: ${GameState.score}`;
  }
}
