import {
  Scene,
  Label,
  Font,
  FontUnit,
  Color,
  Vector,
  TextAlign,
  Keys,
} from "excalibur"; 
import { GameState } from "../gamestate";
import { Resources } from "../resources";
export class EndScene extends Scene {
  onInitialize(engine) {
    const gameOverText = new Label({
      text: "GAME OVER",
      pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight - 80),
      font: new Font({
        family: "PixelFont",
        size: 60,
        unit: FontUnit.Px,
        color: Color.Red,
        textAlign: TextAlign.Center,
        bold: true,
      }),
    });

    this.finalScoreText = new Label({
      text: "Final Score: 0",
      pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight),
      font: new Font({
        family: "PixelFont",
        size: 40,
        unit: FontUnit.Px,
        color: Color.White,
        textAlign: TextAlign.Center,
        bold: true,
      }),
    });

    this.highScoreText = new Label({
      text: "High Score: 0",
      pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight + 60),
      font: new Font({
        family: "PixelFont",
        size: 40,
        unit: FontUnit.Px,
        color: Color.White,
        textAlign: TextAlign.Center,
        bold: true,
      }),
    });

    // 2. Create the instructional text for the player
    const retryText = new Label({
      text: "Press SPACE to retry",
      pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight + 130),
      font: new Font({
        family: "PixelFont",
        size: 24,
        unit: FontUnit.Px,
        color: Color.White,
        textAlign: TextAlign.Center,
      }),
    });

    this.add(gameOverText);
    this.add(this.finalScoreText);
    this.add(this.highScoreText);
    this.add(retryText); // Don't forget to add the text to the scene!
  }

  onActivate(engine) {
    GameState.checkHighScore();
    this.finalScoreText.text = `Final Score: ${GameState.score}`;
    this.highScoreText.text = `High Score: ${GameState.highScore}`;
  }

  // 3. Check for the Spacebar press every frame
  onPreUpdate(engine, delta) {
    // using "wasPressed" ensures it only triggers exactly once per tap
    if (engine.input.keyboard.wasPressed(Keys.Space)) {
      // Instantly refresh the page to completely reset the game!
      window.location.reload();
    }
  }
}
