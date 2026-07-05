import { Enemy } from "./Enemy.js";
import { Resources } from "../../resources.js";
import { EnemyBullet } from "./EnemyBullet.js";

export class EvilWizard extends Enemy {
  constructor(x, y, player) {
    super(x, y, 16, 16, player, 30, Resources.EvilWizard, 3, 25);

    this.shootTimer = 0;
    this.shootCooldown = 2500; 
  }

  onPreUpdate(engine, delta) {
    super.onPreUpdate(engine, delta);

    if (this.player) {
      this.shootTimer += delta;

      // Checks if it is time to shoot
      if (this.shootTimer >= this.shootCooldown) {
        this.shootAtPlayer();
        this.shootTimer = 0;
      }
    }
  }

  shootAtPlayer() {
    // Calculates the direction of the player
    const direction = this.player.pos.sub(this.pos).normalize();

    // Create a bullet with the correct pos and direction
    const bullet = new EnemyBullet(this.pos.x, this.pos.y, direction);

    // Add bullet to scene
    this.scene.add(bullet);
  }
}
