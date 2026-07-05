import { TiledResource } from "@excaliburjs/plugin-tiled";
import { ImageSource, Sound, Resource, Loader, FontSource } from "excalibur";

const Resources = {
  //Fonts
  PixelFont: new FontSource(
    "assets/fonts/PixelifySans-Regular.ttf",
    "PixelFont",
  ),

  // Maps
  WorldMap: new TiledResource("assets/maps/prg04-map.tmx"),

  // Sprites
  Player: new ImageSource("assets/images/player.png"),
  Cursor: new ImageSource("assets/images/cursor.png"),
  Fireball: new ImageSource("assets/images/fireball.png"),
  Ogre: new ImageSource("assets/images/ogre.png"),
  Ghost: new ImageSource("assets/images/ghost.png"),
  EvilWizard: new ImageSource("assets/images/evilwizard.png"),
  BlueFireball: new ImageSource("assets/images/blue-fireball.png"),

  // Icons
  Heart: new ImageSource("assets/icons/heart-icon.png"),
  EmptyHeart: new ImageSource("assets/icons/empty-heart-icon.png"),

  // Sounds
  FireballSound: new Sound("assets/audio/fireball-sfx.mp3"),
  DeathSound: new Sound("assets/audio/death.mp3"),
  TakeDamageSound: new Sound("assets/audio/takedamage.mp3"),
};

const ResourceLoader = new Loader();
ResourceLoader.suppressPlayButton = true;
for (let res of Object.values(Resources)) {
  ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader };
