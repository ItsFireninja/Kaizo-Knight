// This is really @aryan2010's game btw
export default function loadAssets() {
	loadSprite("bean", "sprites/bean.png");
	loadSprite("googoly", "sprites/googoly.png");
  loadSprite("fliboi", "sprites/fliboi.png");
	loadSprite("spike", "sprites/spike.png");
	loadSprite("grass", "sprites/grass.png");
	loadSprite("prize", "sprites/jumpy.png");
	loadSprite("apple", "sprites/apple.png");
  loadSprite("bg", "sprites/background.png");
	loadSprite("portal", "sprites/portal.png");
	loadSprite("coin", "sprites/coin.png");
	loadSound("coin", "sounds/score.mp3");
	loadSound("powerup", "sounds/powerup.mp3");
	loadSound("blip", "sounds/blip.mp3");
	loadSound("hit", "sounds/hit.mp3");
	loadSound("portal", "sounds/portal.mp3");
  loadSprite("dangergrass", "sprites/ded-grass.png");
}
//
import kaboom from "kaboom";
import patrol from "./patrol";
import patr from "./patr";
import big from "./big";



kaboom();
loadAssets();
const protocol = location.protocol === "https:" ? "wss" : "ws";
const ws = new WebSocket(`${protocol}://${location.host}/multiplayer`);

ws.onmessage = (msg) => {
	console.log(msg);
};
// define some constants
const JUMP_FORCE = 1320;
const MOVE_SPEED = 480;
const FALL_DEATH = 2400;

const LEVELS = [
	[
		"                           ",
		"                           ",
		"                           ",
		"                           ",
		"                      ^    ",
		"        ^^>^          =    ",
		"        ====          =    ",
		"                      =    ",
		"           $          =    ",
		"^ >^^^^^^^^^^^^^ > ^^^=^^@^",
		"===========================",
	],

  [
		"                           ",
		"   ^ >  >    > >        ^  ",
		"   ^^^^^^^^^^^^^^^^^^^^^^  ",
		"                           ",
		"                           ",
		"                           ",
		"                           ",
		" >^^^^^^^^^^^^^^^^^^^^^^^@^",
		"===========================",
	],
  [
		"                 ^         ",
		"                         ^ ",
		"                      ^    ",
		"       ^                   ",
		"                ^          ",
		"  ^      ^                 ",
		"                           ",
		"^^^>^^^^^^^>^^^^^^>^^^^@^^^",
		"===========================",
	],
  [
		"                                    @    ",
		"                                   ^^^   ",
		"                          ^> ^           ",
		"                          ^^^^           ",
		"                  ^>^                    ",
		"         ^>  ^    ^^^                    ",        
		"         ^^^^^               ========= ==",
		"                             ========= ==",
		"                           =========== ==",
		"^^>^^^^^^^^^^^^^^^>^^^^>^^>===========^==",
		"=========================================",
    ],
   
        [
		"                                                                                ",
		"                                                                                ",
		"                                ^                                               ",
		"                                                                                ",
		"               ====             =                                     = =       ",
		"                               ==         =                           = =       ",
		"                             ===          ==                          = =       ",
		" ^   $^^  >    >    >        ====   ^ >   ===     >>       ==  ^      =@=       ",
		"&==============&&&&&&&&&&&&&=========&&&&===========&&&&&&===============&&&&&&&",
	],
  	[
    "                &          ",
		"                           ",
		"                           ",
		"                           ",
		"                           ",
		"                      ^    ",
		"        & >&          =    ",
		"        &&&&          =    ",
		"                      = &  ",
		"                      =    ",
		"^ > ^^^^^^^^^^   > ^^^=^^@^",
		"====&&&&&&&&&&&&&&&========",
	],
	[ 
    "                        &  ",
		"                    ^ >^&  ",
		"                    ^^^^&  ",
		"                        &  ",
		"              &>  &     &  ",
		"              &&&&&     &  ",
		"                        &  ",
		"                        &  ",
		"      ^ > ^             &  ",
		"      ^^^^^             &  ",
		"                        & @",
		"==&&&&&&&&&&&&&&&&&&&&&&&&=",
	],
  [ 
    "            @               ",
    "                            ",
		"                            ",
		"    ^>^                     ",
		"    ^^^                     ",
		"	                           ",
		"      ^ >     >     >  ^    ",             "      ^^^^^^^^^^^^^^^^^^    ",
		"                            ",
		"                            ",
		"                            ",
		"                            ",
		"=           -            &>&",
		"===&&=================&&&===",
	],
];

// define what each symbol means in the level graph
const levelConf = {
	// grid size
	width: 64,
	height: 64,
	// define each object as a list of components
	"=": () => [
		sprite("grass"),
		area(),
		solid(),
		origin("bot"),
	],
	"$": () => [
		sprite("coin"),
		area(),
		pos(0, -9),
		origin("bot"),
		"coin",
	],
	"%": () => [
		sprite("prize"),
		area(),
		solid(),
		origin("bot"),
		"prize",
	],
	"^": () => [
		sprite("spike"),
		area(),
		solid(),
		origin("bot"),
		"danger",
	],
	"#": () => [
		sprite("apple"),
		area(),
		origin("bot"),
		body(),
		"apple",
	],
	">": () => [
		sprite("googoly"),
		area(),
		origin("bot"),
   
		body(),
		patrol(),
		"enemy",
	],
  "-": () => [
		sprite("fliboi"),
		area(),
		origin("bot"),
   
		body(),
		patr(),
		"enemy1",
	],
  "&": () => [
		sprite("dangergrass"),
		area(),
		solid(),
		origin("bot"),
		"danger",
	],
	"@": () => [
		sprite("portal"),
		area({ scale: 0.5, }),
		origin("bot"),
		pos(0, -12),
		"portal",
	],
};

scene("game", ({ levelId, coins, levelnumb } = { levelId: 0, coins: 0, levelnumb: 1 }) => {
  const bg = add([
		sprite("bg"),
		pos(-1900, -999),
    scale(2),
        
	]);

	gravity(3200);

	// add level to scene
	const level = addLevel(LEVELS[levelId ?? 0], levelConf);

	// define player object
	const player = add([
		sprite("bean"),
		pos(0, 0),
  
		area(),
		scale(1),
		// makes it fall to gravity and jumpable
		body(),
		// the custom component we defined above
		big(),
		origin("bot"),
	]);


	// action() runs every frame
	player.action(() => {
		// center camera to player
		camPos(player.pos);
		// check fall death
		if (player.pos.y >= FALL_DEATH) {
			go("game", {
				levelId: levelId,
				coins: 0,
			});
		}
	});

	// if player collides with any obj with "danger" tag, lose
	player.collides("danger", () => {
		go("game", {
				levelId: levelId,
				coins: 0,
			});
		play("hit");
	});

	player.collides("portal", () => {
		play("portal");
		if (levelId + -5 < LEVELS.length) {
			go("game", {
				levelId: levelId + 1,
				coins: coins,
        
        
			});
      
		} else {
			go("win");
		}
	});
  player.collides("portal", (p) => {
    levelnumb: levelnumb+1,
    
		levelLabel.text = levelnumb;
	});
  const levelLabel = add([
		text(" ", levelnumb),
		pos(24, 7),
		fixed(),
	]);
	player.on("ground", (l) => {
		if (l.is("enemy")) {
			player.jump(JUMP_FORCE * 1.5);
			destroy(l);
			addKaboom(player.pos);
			play("powerup");
		}
	});

	player.collides("enemy", (e, side) => {
		if (side !== "bottom") {
			go("game", {
				levelId: levelId,
				coins: 0,
			});
			play("hit");
		}
	});

  	player.on("ground", (l) => {
		if (l.is("enemy1")) {
			player.jump(JUMP_FORCE * 2);
			destroy(5);
			addKaboom(player.pos);
			play("powerup");
		}
	});

	player.collides("enemy1", (e, side) => {
		if (side !== "bottom") {
			go("game", {
				levelId: levelId,
				coins: 0,
			});
			play("hit");
		}
	});

	let hasApple = false;

	// grow an apple if player's head bumps into an obj with "prize" tag
	player.on("headbutt", (obj) => {
		if (obj.is("prize") && !hasApple) {
			const apple = level.spawn("#", obj.gridPos.sub(0, 1));
			apple.jump();
			hasApple = true;
			play("blip");
		}
	});

	// player grows big collides with an "apple" obj
	player.collides("apple", (a) => {
		destroy(a);
		// as we defined in the big() component
		player.biggify(15);
		hasApple = false;
		play("powerup");
	});

	let coinPitch = 0;

	action(() => {
		if (coinPitch > 0) {
			coinPitch = Math.max(0, coinPitch - dt() * 100);
		}
	});

	player.collides("coin", (c) => {
		destroy(c);
		play("coin", {
			detune: coinPitch,
		});
		coinPitch += 100;
		coins += 1;
		coinsLabel.text = coins;
	});

	const coinsLabel = add([
		text("  ", coins),
		pos(24, 60),
		fixed(),
	]);


	// jump with space
	keyPress("space", () => {
		// these 2 functions are provided by body() component
		if (player.grounded()) {
			player.jump(JUMP_FORCE);
		}
	});

	keyDown("left", () => {
		player.move(-MOVE_SPEED, 0);
	});

	keyDown("right", () => {
		player.move(MOVE_SPEED, 0);
	});

	keyPress("down", () => {
		player.weight = 3;
	});

	keyRelease("down", () => {
		player.weight = 1;
	});

	keyPress("f", () => {
		fullscreen(!fullscreen());
	});

});

scene("lose", () => {
	add([
		text("You Lose"),
	]);
	keyPress(() => go("game"));
});

scene("win", () => {
	add([
		text("You Win"),
	]);
	keyPress(() => go("game"));
});

go("game");

