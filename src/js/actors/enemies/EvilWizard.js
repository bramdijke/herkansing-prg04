import { Enemy } from "./Enemy.js";
import { Resources } from "../../resources.js";
import { EnemyBullet } from "./EnemyBullet.js";

export class EvilWizard extends Enemy {
  constructor(x, y, player) {
    // Trage snelheid (30) zodat de speler zijn kogels kan ontwijken
    super(x, y, 16, 16, player, 30, Resources.EvilWizard, 3, 25);

    this.shootTimer = 0;
    this.shootCooldown = 2500; // Schiet elke 2.5 seconden
  }

  onPreUpdate(engine, delta) {
    // Standaard beweging naar de speler toe
    super.onPreUpdate(engine, delta);

    if (this.player) {
      this.shootTimer += delta;

      // Controleer of het tijd is om te schieten
      if (this.shootTimer >= this.shootCooldown) {
        this.shootAtPlayer();
        this.shootTimer = 0;
      }
    }
  }

  shootAtPlayer() {
    // 1. Bereken de richting naar de speler
    const direction = this.player.pos.sub(this.pos).normalize();

    // 2. Maak een vijandelijke kogel aan op de huidige positie
    const bullet = new EnemyBullet(this.pos.x, this.pos.y, direction);

    // 3. Voeg de kogel toe aan de scene
    this.scene.add(bullet);
  }
}
