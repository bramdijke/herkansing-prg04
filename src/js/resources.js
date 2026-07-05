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
};

const ResourceLoader = new Loader();
ResourceLoader.suppressPlayButton = true;
for (let res of Object.values(Resources)) {
  ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader };
