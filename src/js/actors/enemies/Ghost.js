import { Enemy } from "./Enemy.js";
import { Resources } from "../../resources.js";

export class Ghost extends Enemy {
  constructor(x, y, player) {
    // Start met een lagere basissnelheid (bijv. 40)
    super(x, y, 16, 16, player, 80, Resources.Ghost, 2, 50) ;

    // Dash instellingen
    this.normalSpeed = 80;
    this.dashSpeed = 240;

    this.dashCooldown = 3000; // Wacht 3 seconden tussen elke dash
    this.dashDuration = 300; // De dash duurt 0.3 seconden

    this.dashTimer = 0;
    this.isDashing = false;
  }

  onPreUpdate(engine, delta) {
    this.dashTimer += delta;

    if (!this.isDashing && this.dashTimer >= this.dashCooldown) {
      // Start de dash
      this.isDashing = true;
      this.dashTimer = 0;
      this.speed = this.dashSpeed;
    } else if (this.isDashing && this.dashTimer >= this.dashDuration) {
      // Stop de dash
      this.isDashing = false;
      this.dashTimer = 0;
      this.speed = this.normalSpeed;
    }

    // Laat de originele Enemy.js code bepalen welke kant we op moeten lopen
    super.onPreUpdate(engine, delta);
  }
}
