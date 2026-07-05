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

    // Geef de kogel snelheid in de berekende richting
    this.vel = this.direction.scale(this.speed);

    // Optioneel: roteer de kogel in de vliegrichting
    this.rotation = this.direction.toAngle();

    // Collision logic
    this.on("collisionstart", (evt) => {
      // 1. Haal de Actor op die bij de collider hoort
      const hitActor = evt.other.owner;

      // 2. Controleer of het geraakte object de speler is
      if (
        hitActor.name === "player" ||
        hitActor.name === "bullet" ||
        hitActor.name === "enemyBullet" ||
        hitActor.name === "healthItem"
      ) {
        return;
      }

      if (hitActor && hitActor.name === "enemy") {
        // Veiligheidscheck: Heeft deze vijand de takeDamage functie?
        hitActor.takeDamage(1);
      }

      // 3. Als we iets anders raken (Muur of Enemy), despawn de kogel
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
