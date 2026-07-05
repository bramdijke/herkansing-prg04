import { Enemy } from "./Enemy.js";
import { Resources } from "../../resources.js";

export class Ghost extends Enemy {
  constructor(x, y, player) {
    super(x, y, 16, 16, player, 80, Resources.Ghost, 2, 50) ;

    this.normalSpeed = 80;
    this.dashSpeed = 240;

    this.dashCooldown = 3000; 
    this.dashDuration = 300; 

    this.dashTimer = 0;
    this.isDashing = false;
  }

  onPreUpdate(engine, delta) {
    this.dashTimer += delta;

    if (!this.isDashing && this.dashTimer >= this.dashCooldown) {
      // Start the dash
      this.isDashing = true;
      this.dashTimer = 0;
      this.speed = this.dashSpeed;
    } else if (this.isDashing && this.dashTimer >= this.dashDuration) {
      // Stop the dash
      this.isDashing = false;
      this.dashTimer = 0;
      this.speed = this.normalSpeed;
    }

    super.onPreUpdate(engine, delta);
  }
}
