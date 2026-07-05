import { Vector, Actor, CollisionType } from "excalibur";

export class Enemy extends Actor {
  constructor(x, y, player, speed, spriteResource) {
    super({
    name: "enemy",
      x,
      y,
      width: 32,
      height: 32,
    });
    this.player = player;
    this.speed = speed;
    this.spriteResource = spriteResource;
  }

  onInitialize(engine) {
    // this.body.collisionType = CollisionType.Active;

    this.sprite = this.spriteResource.toSprite();
    this.graphics.use(this.sprite);

    this.z = 1;

    if (this.player) {
      this.player.z = 2;
    }
  }

  onPreUpdate(engine, delta) {
    if (this.player) {
      let direction = this.player.pos.sub(this.pos);

      if (direction.size > 0) {
        this.vel = direction.normalize().scale(this.speed);
      }
    }
  }
}
