import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from "../../resources.js";

export class EnemyBullet extends Actor {
  constructor(x, y, direction) {
    super({
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

      // Negeer andere vijanden
      if (hitActor.name === "enemy") {
        return;
      }

      // Als de kogel de speler raakt, haal er health af
      if (hitActor.name === "player") {
        hitActor.takeDamage(1);
      }

      // Despawn de kogel bij het raken van de speler of een muur
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
