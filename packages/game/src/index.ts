import * as PIXI from 'pixi.js';
import { game as darkerGame } from "darker-engine";
import {SystemEnum} from "./game/system.enum";
import {ComponentEnum} from "./game/component.enum";
import {spiderSystem} from "./game/systems/spider.system";
import {spriteSystem} from "./game/systems/sprite.system";

// Check if canvas load (if it's red, not)
document.body.style.backgroundColor = 'black';
// Loads the pixi.js app
export const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0xFFFFFF,
    antialias: true,
    autoDensity: true
});

app.stage.sortableChildren = true;
app.stage.interactive = true;
// Renders crisp pixel textures
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

document.getElementById('root').appendChild(app.view);


const { innerWidth, innerHeight, devicePixelRatio } = window;

const scale = 2;

app.renderer.resolution = devicePixelRatio * scale;
// Stage resolution adjustment
app.renderer.plugins.interaction.resolution = app.renderer.resolution;
app.renderer.resize(innerWidth / scale, innerHeight / scale);

app.view.style.width = `${innerWidth}px`;
app.view.style.height = `${innerHeight}px`;

export const game = darkerGame<SystemEnum, ComponentEnum>();
// add systems
game.setSystems(
    spriteSystem,
    spiderSystem
);
// add pixi ticker
app.ticker.add(game.onLoop);
