import { Actor, Keys, Vector, CollisionType, PointerButton } from "excalibur";
import { Resources } from "../resources";
import { Bullet } from "./Bullet";

export class Player extends Actor {
  constructor(x, y) {
    super({
      name: "player",
      pos: new Vector(x, y),
      width: Resources.Player.width,
      height: Resources.Player.height,
    });

    this.z = 2;

    // Timer to control fire rate
    this.shootCooldown = 0;

    // Is player holding shoot button?
    this.isShooting = false;

    // Health for player
    this.maxHealth = 3;
    this.health = 3;

    this.invincibilityTimer = 0;

    this.graphics.use(Resources.Player.toSprite());
  }

  onInitialize(engine) {
    this.body.collisionType = CollisionType.Active;

    // Listens for lmb clicks anywhere on screen to START shooting.
    engine.input.pointers.primary.on("down", (evt) => {
      if (evt.button === PointerButton.Left) {
        this.isShooting = true;
      }
    });

    // Listens for lmb release anywhere on screen to STOP shooting.
    engine.input.pointers.primary.on("up", (evt) => {
      if (evt.button === PointerButton.Left) {
        this.isShooting = false;
      }
    });
  }

  onPreUpdate(engine, delta) {
    let moveDirection = new Vector(0, 0);

    // Movement of the player
    if (engine.input.keyboard.isHeld(Keys.D)) {
      moveDirection.x = 1;
      this.scale = new Vector(1, 1);
    }
    if (engine.input.keyboard.isHeld(Keys.A)) {
      moveDirection.x = -1;
      this.scale = new Vector(-1, 1);
    }
    if (engine.input.keyboard.isHeld(Keys.W)) {
      moveDirection.y = -1;
    }
    if (engine.input.keyboard.isHeld(Keys.S)) {
      moveDirection.y = 1;
    }

    // Calculate correct speed when walking diagonally
    if (moveDirection.x !== 0 || moveDirection.y !== 0) {
      moveDirection = moveDirection.normalize();
      this.vel = moveDirection.scale(200);
    } else {
      this.vel = new Vector(0, 0);
    }

    if (this.invincibilityTimer > 0) {
      this.invincibilityTimer -= delta;
      this.graphics.opacity = 0.5; // Make player blink when invincible
    } else {
      this.graphics.opacity = 1; // Normal visibility
    }

    if (this.shootCooldown > 0) {
      this.shootCooldown -= delta;
    }

    // Check if the button is held down and then shoot
    if (this.isShooting && this.shootCooldown <= 0) {
      this.shootTowardsCursor(engine.input.pointers.primary.lastWorldPos);
      this.shootCooldown = 300;
    }
  }

  // Calculate direction and add bullet to scene
  shootTowardsCursor(targetPos) {
    const direction = targetPos.sub(this.pos).normalize();
    const bullet = new Bullet(this.pos.x, this.pos.y, direction);
    this.scene.add(bullet);

    // Play shoot sfx at 20% volume
    if (Resources.FireballSound.isLoaded()) {
      Resources.FireballSound.play(0.2);
    }
  }

  takeDamage(amount) {
    if (this.invincibilityTimer <= 0) {
      this.health -= amount;
      this.invincibilityTimer = 1000;
      if (Resources.TakeDamageSound.isLoaded()) {
        Resources.TakeDamageSound.play(0.2);
      }

      console.log("Player took damage! Health left:", this.health);

      if (this.health <= 0) {
        this.health = 0;
        this.scene.engine.goToScene("End");
      }
    }
  }

  healHealth(amount) {
    this.health += amount;

    // Prevent the player from having more than their maximum hearts
    if (this.health > this.maxHealth) {
      this.health = this.maxHealth;
    }

    console.log("Player healed! Current health:", this.health);
  }

  // Clamp the player pos inside this box
  onPostUpdate(engine, delta) {
    this.pos.x = Math.max(40, Math.min(this.pos.x, 600));
    this.pos.y = Math.max(56, Math.min(this.pos.y, 440));
  }
}
