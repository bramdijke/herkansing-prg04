import { Actor } from "excalibur";
import { GameState } from "../../gameState.js";
import { Ogre } from "./Ogre.js";
import { Ghost } from "./Ghost.js";
import { EvilWizard } from "./EvilWizard.js";

export class EnemySpawner extends Actor {
  constructor(player) {
    super({ name: "spawner" });
    this.player = player;

    // Timers
    this.spawnTimer = 0;
    this.sessionTime = 0; 

    // Difficulty Settings
    this.baseSpawnDelay = 3000; 
    this.minSpawnDelay = 500; 
  }

  onPreUpdate(engine, delta) {
    this.spawnTimer += delta;
    this.sessionTime += delta;

    // For every 5000ms (5 seconds) survived, reduce the delay by 100ms
    const delayReduction = Math.floor(this.sessionTime / 5000) * 100;
    const currentSpawnDelay = Math.max(
      this.minSpawnDelay,
      this.baseSpawnDelay - delayReduction,
    );

    // If enough time has passed based on currentSpawnDelay, spawn an enemy
    if (this.spawnTimer >= currentSpawnDelay) {
      this.spawnRandomEnemy();
      this.spawnTimer = 0; // Reset the spawn timer
    }
  }

  spawnRandomEnemy() {
    let spawnX, spawnY;
    const edge = Math.floor(Math.random() * 4);

    // Where the enemies can spawn
    const minX = 40;
    const maxX = 600;
    const minY = 56;
    const maxY = 440;

    // Pick a random edge exactly on the boundary
    if (edge === 0) {
      // Top edge
      spawnX = minX + Math.random() * (maxX - minX);
      spawnY = minY;
    } else if (edge === 1) {
      // Bottom edge
      spawnX = minX + Math.random() * (maxX - minX);
      spawnY = maxY;
    } else if (edge === 2) {
      // Left edge
      spawnX = minX;
      spawnY = minY + Math.random() * (maxY - minY);
    } else {
      // Right edge
      spawnX = maxX;
      spawnY = minY + Math.random() * (maxY - minY);
    }

    // Pick a random enemy to spawn
    const enemyRoll = Math.random();
    let enemy;

    if (enemyRoll < 0.4) {
      enemy = new Ghost(spawnX, spawnY, this.player);
    } else if (enemyRoll < 0.8) {
      enemy = new Ogre(spawnX, spawnY, this.player);
    } else {
      enemy = new EvilWizard(spawnX, spawnY, this.player);
    }

    // Add the new enemy to the game
    this.scene.add(enemy);
  }
}
