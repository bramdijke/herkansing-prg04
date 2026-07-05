import { Enemy } from "./Enemy.js";
import { Resources } from "../../resources.js";

export class Ogre extends Enemy {
  constructor(x, y, player) {
    super(x, y, 24, 24, player, 50, Resources.Ogre, 5, 75);
  }
}
