import { ScreenElement } from "excalibur";
import { Resources } from "../resources";

export class Cursor extends ScreenElement {
  constructor() {
    super({
      x: 0,
      y: 0,
      z: 999,
    });
  }
  onInitialize(engine) {
    // Hide default cursor
    engine.canvas.style.cursor = "none";

    // Custom cursor sprite
    this.graphics.use(Resources.Cursor.toSprite());
  }

  onPreUpdate(engine) {
    // Update position of cursor 
    this.pos = engine.input.pointers.primary.lastScreenPos;
  }
}
