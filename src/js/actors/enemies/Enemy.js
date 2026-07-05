import { Vector, Actor, CollisionType } from "excalibur";
import { GameState } from "../../gamestate";
import { Resources } from "../../resources";
import { HealthItem } from "../HealthItem";

export class Enemy extends Actor {
  constructor(x, y, width, height, player, speed, spriteResource, hp, scoreValue) {
    super({
      name: "enemy",
      x,
      y,
      width,
      height,
    });
    this.player = player;
    this.speed = speed;
    this.spriteResource = spriteResource;
    this.hp = hp;
    this.scoreValue = scoreValue;
  }

  onInitialize(engine) {
    // this.body.collisionType = CollisionType.Active;

    this.sprite = this.spriteResource.toSprite();

    // Scale the sprite to the width and height
    this.sprite.scale = new Vector(
      this.width / this.sprite.width,
      this.height / this.sprite.height,
    );
    this.graphics.use(this.sprite);

    this.z = 1;

    if (this.player) {
      this.player.z = 2;
    }

    this.on("collisionstart", (evt) => {
      // Get the actor we hit (handling colliders safely)
      const hitActor = evt.other.owner || evt.other;

      // If the object we hit is the player, deal 1 damage
      if (hitActor.name === "player") {
        hitActor.takeDamage(1);
      }
    });
  }

  onPreUpdate(engine, delta) {
    if (this.player) {
      let direction = this.player.pos.sub(this.pos);

      if (direction.size > 0) {
        this.vel = direction.normalize().scale(this.speed);
      }
    }
  }

  takeDamage(amount) {
    this.hp -= amount;

    if (this.hp <= 0) {
      // Play shoot sfx at 20% volume
      if (Resources.DeathSound.isLoaded()) {
        Resources.DeathSound.play(0.2);
      }
      // Add score to the total score in the GameState
      GameState.score += this.scoreValue;

      // 20% chance to drop a health item
      if (Math.random() < 0.5) {
        const drop = new HealthItem(this.pos.x, this.pos.y);
        this.scene.add(drop);
      }

      // Removes the enemy from the scene entirely
      this.kill();
    }
  }
}
