import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from "../../resources.js";

export class EnemyBullet extends Actor {
  constructor(x, y, direction) {
    super({
      name: "enemyBullet",
      pos: new Vector(x, y),
      width: 16,
      height: 16,
      z: 3,
    });

    this.direction = direction;
    this.speed = 150;
  }

  onInitialize(engine) {
    this.graphics.use(Resources.BlueFireball.toSprite());
    this.body.collisionType = CollisionType.Passive;

    this.vel = this.direction.scale(this.speed);
    this.rotation = this.direction.toAngle();

    this.on("collisionstart", (evt) => {
      const hitActor = evt.other.owner || evt.other;

      // Ignore other enemies
      if (
        hitActor.name === "enemy" ||
        hitActor.name === "bullet" ||
        hitActor.name === "enemyBullet"
      ) {
        return;
      }

      // If it hits the player, he takes damage
      if (hitActor.name === "player") {
        hitActor.takeDamage(1);
      }

      // Remove the bullet
      this.kill();
    });
  }

  onPreUpdate(engine, delta) {
    if (
      this.pos.x < 0 ||
      this.pos.x > 800 ||
      this.pos.y < 0 ||
      this.pos.y > 600
    ) {
      this.kill();
    }
  }
}
