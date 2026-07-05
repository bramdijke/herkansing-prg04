import { Enemy } from "./Enemy.js";
import { Resources } from "../../resources.js";

export class Ogre extends Enemy {
  constructor(x, y, player) {
    super(x, y, player, 50, Resources.Ogre);
  }
}
