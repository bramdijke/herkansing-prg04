import { Scene } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/Player";
import { Cursor } from "../actors/Cursor";
import { HealthUI } from "../ui/HealthUI";
import { ScoreUI } from "../ui/ScoreUI";
import { GameState } from "../gamestate";
import { Ogre } from "../actors/enemies/Ogre";
import { EvilWizard } from "../actors/enemies/EvilWizard";
import { Ghost } from "../actors/enemies/Ghost";

export class WorldScene extends Scene {
  onInitialize(engine) {
    Resources.WorldMap.addToScene(this);

    // Create the player
    const player = new Player(engine.halfDrawWidth, engine.halfDrawHeight);
    this.add(player);

    // Create the cursor
    const cursor = new Cursor();
    this.add(cursor);

    // Create the HealthUI
    const healthUI = new HealthUI(player);
    this.add(healthUI);

    const scoreUI = new ScoreUI();
    this.add(scoreUI);

    this.camera.zoom = 2;

    // Tell the camera to constantly follow the player actor
    this.camera.strategy.lockToActor(player);

    const bigOgre = new Ogre(200, 200, player);
    this.add(bigOgre);

    const Wizard = new EvilWizard(200, 300, player);
    this.add(Wizard);

    const GhostS = new Ghost(200, 300, player);
    this.add(GhostS);
  }
}
