import { Actor, Vector, CollisionType, Color } from "excalibur";
import { Resources } from "../resources";

export class Bullet extends Actor {
  constructor(x, y, direction) {
    super({
      name: "bullet",
      pos: new Vector(x, y),
      width: 16,
      height: 16,
      z: 3,
    });

    this.direction = direction;
    this.speed = 200;
  }

  onInitialize(engine) {
    this.graphics.use(Resources.Fireball.toSprite());

    this.body.collisionType = CollisionType.Passive;

    // Give bullet trajectory
    this.vel = this.direction.scale(this.speed);

    // Rotate the bullet
    this.rotation = this.direction.toAngle();

    // Collision logic
    this.on("collisionstart", (evt) => {
      const hitActor = evt.other.owner;

      // Ignore some actors when colliding
      if (
        hitActor.name === "player" ||
        hitActor.name === "bullet" ||
        hitActor.name === "enemyBullet" ||
        hitActor.name === "healthItem"
      ) {
        return;
      }

      // Enemy take damage
      if (hitActor && hitActor.name === "enemy") {
        hitActor.takeDamage(1);
      }

      // Remove bullet
      this.kill();
    });
  }

  onPreUpdate(engine, delta) {
    // Last resort to remove the bullet if the previous removal didn't work
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
