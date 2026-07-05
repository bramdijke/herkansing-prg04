import { Scene } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/Player";
import { Cursor } from "../actors/Cursor";
import { Ogre } from "../actors/enemies/Ogre";

export class WorldScene extends Scene {
  onInitialize(engine) {
    Resources.WorldMap.addToScene(this);
    const player = new Player(engine.halfDrawWidth, engine.halfDrawHeight);

    this.add(player);

    const cursor = new Cursor();
    this.add(cursor);

    this.camera.zoom = 2;

    // Tell the camera to constantly follow the player actor
    this.camera.strategy.lockToActor(player);

    const bigOgre = new Ogre(200, 200, player);
    this.add(bigOgre);
  }
}
