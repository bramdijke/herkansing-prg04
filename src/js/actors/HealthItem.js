import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from "../resources";
export class HealthItem extends Actor {
  constructor(x, y) {
    super({
      name: "healthItem",
      pos: new Vector(x, y),
      width: 16, // Adjust based on your heart sprite's actual size
      height: 16,
      z: 1, // Draw below the player
    });
  }

  onInitialize(engine) {
    // Re-use your full heart UI icon for the drop!
    this.graphics.use(Resources.Heart.toSprite());

    // Passive collision means objects can walk through it, but it still triggers events
    this.body.collisionType = CollisionType.Passive;

    this.on("collisionstart", (evt) => {
      const hitActor = evt.other.owner || evt.other;

      // If the player touches it...
      if (hitActor.name === "player") {
        // Safety check to make sure the player has the heal function
        if (typeof hitActor.healHealth === "function") {
          // Heal the player for 1 heart
          hitActor.healHealth(1);

          // Remove the health item from the ground
          this.kill();
        }
      }
    });
  }
}
