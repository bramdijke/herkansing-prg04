import { ScreenElement, Vector } from "excalibur";
import { Resources } from "../resources.js";

export class HealthUI extends ScreenElement {
  constructor(player) {
    super({
      x: 20,
      y: 20,
      z: 999,
    });

    this.player = player;
    this.hearts = [];
  }

  onInitialize(engine) {
    this.fullHeartSprite = Resources.Heart.toSprite();
    this.fullHeartSprite.scale = new Vector(2, 2);

    this.emptyHeartSprite = Resources.EmptyHeart.toSprite();
    this.emptyHeartSprite.scale = new Vector(2, 2);

    for (let i = 0; i < this.player.maxHealth; i++) {
      const heart = new ScreenElement({
        x: i * 32,
        y: 0,
      });

      // Default to full hearts
      heart.graphics.use(this.fullHeartSprite);

      this.addChild(heart);
      this.hearts.push(heart);
    }
  }

  onPreUpdate(engine, delta) {
    for (let i = 0; i < this.hearts.length; i++) {
      if (i < this.player.health) {
        // Use the cached full heart
        this.hearts[i].graphics.use(this.fullHeartSprite);
      } else {
        // Use the cached empty heart
        this.hearts[i].graphics.use(this.emptyHeartSprite);
      }
    }
  }
}
