//export assets
export default function loadAssets() {
	loadSprite("bean", "sprites/princess.png");
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
  loadSprite("TroubleMan", "sprites/bossman.png");
  loadSprite("BGrass", "sprites/Bgrass.png");
  loadSprite("IGrass","sprites/invisible.png");
}
//scripts go brrr
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
const JUMP_FORCE = 1400;
MOVE_SPEED = 550
const FALL_DEATH = 2400;
LevelId = 0;

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
		"      ^                  ^ ",
		"                      ^    ",
		"                           ",
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
    "     @                      ",
    "                            ",
		"                            ",
		"    ^>^                     ",
		"    ^^^                     ",
		"	                           ",
		"      ^ >     >  >   > ^    ",   
		"      ^^^^^^^^^^^^^^^^^^    ",
		"                            ",
		"                            ",
		"                            ",
		"=                        &>&",
		"===&&==================&&===",
	],
	[
  	"                           ",
		"                           ",
		"                           ",
		"                           ",
		"     =@       -        &   ",
		"     ===================   ",
		"                           ",
		"                           ",
		"                           ",
		"&           -           &>&",
		"===&====&&======&&===&=====",
    ],	
    
    
    [
		"  &&&&                     ",
		"  &                        ",
		"  &                        ",
		"  &                        ",
		"  &@$+                &    ",
		"  =====================    ",
		"                           ",
		"  #                        ",
		"                           ",
		"                        ^>^",
		"===========================",
	],
  [
    "                           ",
    "                           ",
		"                        = =",
		"             &>&        =@=",
		"              &          & ",
		"                           ",
		"       ^>^                 ",
		"        ^                  ",
		"   &>&                     ",
		"    &                      ",
		"                           ",
		"^>^                        ",
		"^^^                        ",
	],
    [
    "                ^              ^ @ ",               
    "   ^^                            = ",
    " ^  ^>^^^^^^^  ^^>^^^^^^  ^^^^>^^^^",
    " ^   ^^^^^^^  >^^^^^^^^^  ^^^^^^^^^",
    ">^>^^^^^^^^^^^^^       ^> ^        ",
    "===================================",
    ], 
    //Test Level  
    [
		"==?=============?==========",
		"==             & &        =",
		"===? =?==?======&==========",
		"=== == == =================",
		"=== == == =================",
		"=== == == =================",
		"===&==&== =================",
		"&                         &",
		"=========?=================",
    "&                         &",
		"&=?============?=======?===",
    "  &                    &   ",
		"=========@=================",
	],
	[
		"                           ",
		"                           ",
		"                           ",
		"@                          ",
		"^       +               =  ",
		"?????????????????????????  ",
		"                           ",
		"                           ",
		"                          ?",
		"=  >        ^     >       ^",
		"^^^^^^^^^^^^^^^^^^^^^^^^^^^",
	],
        
  [
"                                                                              ^  ",
"                                                                              @ ",
"                                                                    ",
"                  ^      ^^^^^>^^^^^^>^^^^^^>^^^^^>^^^^>^^^^^^^^^               ",
"                 ===     ========================================     =         ",
"                                                                      &    ^>^  ",
"                                                                       &    ^   ",
"             =>>=     ^       ^         >>>>                       ^>^  &  ^@^  ",
"======================&&&&=&&&&==============================&&&&===============",
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
  "+": () => [
		sprite("TroubleMan"),
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
  "?": () => [
		sprite("BGrass"),
		area(),
		solid(),
		origin("bot"),
    "enemy",
	],
  	
};

scene("game", ({ levelId, coins, levelnumb, rank } = { coins: 0, levelnumb: 1 ,rank:"Recruit"}) => {
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
		levelId = LevelId;
		camPos(player.pos);
		// check fall death
		if (player.pos.y >= FALL_DEATH) {
			go("game", {
				levelId: LevelId,
				coins: 0,
        rank: "Recruit",
			});
		}
	});

	// if player collides with any obj with "danger" tag, lose
	player.collides("danger", () => {
		go("game", {
				levelId: levelId,
				coins: 0,
        rank: "Recruit",
			});
		play("hit");
    levelLabel.text = levelId+1;
	});

	player.collides("portal", () => {
		play("portal");
		if (LevelId + 1 < LEVELS.length) {
			go("TitlePortal", {
			LevelId: LevelId+1
   
        
        
        
			});
      
		} else {
			go("win");
		}
	});
  player.collides("portal", (p) => {
    LevelId= LevelId+1;
    levelId= LevelId;
    levelLabel.text = levelId+1;
    
		
    
  });
  

	player.on("ground", (l) => {
		if (l.is("enemy")) {
			player.jump(JUMP_FORCE * 1.5);
			destroy(l);
			addKaboom(player.pos);
			play("powerup");
      levelLabel.text = levelId+1;
		}
	});
   player.collides("BGrass", (e) => {
		  player.jump(JUMP_FORCE * 2);
			destroy(1);
			addKaboom(player.pos);
			play("powerup");
      levelLabel.text = levelId+1;
		  MOVE_SPEED= 480;
	});

	player.collides("enemy", (e, side) => {
		if (side !== "bottom") {
			go("game", {
				levelId: levelId,
				coins: 0,
        rank: "Recruit",
			});
			play("hit");
      levelLabel.text = levelId+1;
		}
	});

  player.on("ground", (l) => {
		if (l.is("enemy1")) {
			player.jump(JUMP_FORCE * 2);
			destroy(1);
			addKaboom(player.pos);
			play("powerup");
      levelLabel.text = levelId+1;
		}
	});

	player.collides("enemy1", (e, side) => {
		if (side !== "bottom") {
			go("game", {
				levelId: levelId,
				coins: 0,
        rank: "Recruit",
        
			});
      levelLabel.text = levelId+1;
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
		coinsLabel.text = coins,"k gold";
    levelLabel.text = levelId+1;
	});

	const coinsLabel = add([
		text("Coins", coins/5),
		pos(24, 60),
		fixed(),
	]);
  const levelLabel = add([
		text("Level", levelId),
		pos(24, 7),
		fixed(),
	]);


	// jump with space
	keyPress("space", () => {
		// these 2 functions are provided by body() component
		if (player.grounded()) {
			player.jump(JUMP_FORCE);
		}
	});
  keyPress("up", () => {
		// these 2 functions are provided by body() component
		if (player.grounded()) {
			player.jump(JUMP_FORCE);
		}
	});
  keyPress("w", () => {
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
  keyDown("a", () => {
		player.move(-MOVE_SPEED, 0);
	});
  keyDown("d", () => {
		player.move(MOVE_SPEED, 0);
	});
  keyPress("s", () => {
		player.weight = 3;
	});
  keyRelease("s", () => {
		player.weight = 1;
	});

});

scene("Title", () => {
  const bgt = add([
		sprite("bg"),
		pos(-1900, -999),
    scale(2),
        
	]);
	add([
    
		text("A Tilscena the Princess Fan Game: Kaizo Knight"),
    pos(0, height()-300)
    
	]);
  add([
    rect(48, -120),
    pos(-96, height() - 48),
    outline(4),
    area(),
    solid(),
    color(127, 200, 255),
    
  ])
  add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    solid(),
    color(127, 200, 255),
    "Neutral",
  ])
  add([
    rect(width(), 48),
    pos(width(), height() - 48),
    outline(4),
    area(),
    solid(),
    color(67, 200, 255),
    "Collidable",
  ])
  
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
	keyPress("f", () => {
		fullscreen(!fullscreen());
	});
  	// action() runs every frame
	player.action(() => {
		// center camera to player
		camPos(player.pos);
		// check fall death
		if (player.pos.y >= FALL_DEATH) {
			go("Title", {
				
				
        
			});
		}
	});

	player.collides("Collidable", () => {
    addKaboom(player.pos);
    shake();
    go("game"); // go to "lose" scene here
  });
});
scene("TitlePortal", ({ levelId, coins, levelnumb, rank } = { levelId: LevelId, coins: 0, levelnumb: 1 ,rank:"Recruit"} ) => {
  const bgt = add([
		sprite("bg"),
		pos(-1900, -999),
    scale(2),
        
	]);
	add([
    
		text("You have reached Level"),
    pos(0, height()-300)
    
	]);
  add([
    
		text( LevelId+1),
    pos(1200, height()-300)
    
	]);


  add([
    rect(width()+100, 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    solid(),
    color(127, 200, 255),
    "Neutral",
  ])
  add([
    rect(width(), 48),
    pos(width(), height() - 48),
    outline(4),
    area(),
    solid(),
    color(67, 200, 255),
    "Collidable",
  ])



	keyPress("down", () => {
		player.weight = 3;
	});

	keyRelease("down", () => {
		player.weight = 1;
	});
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
	keyPress("f", () => {
		fullscreen(!fullscreen());
	});
  	// action() runs every frame
	player.action(() => {
		// center camera to player
		camPos(player.pos);
    player.move(MOVE_SPEED, 0);
		// check fall death
		if (player.pos.y >= FALL_DEATH) {
			go("Title", {
				
				
        
			});
		}
	});

	player.collides("Collidable", () => {
    addKaboom(player.pos);
    shake();
    go("game", {
        
				levelId: LevelId,
				coins: coins,
   
        
        
        
			}); // go to "lose" scene here
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

go("Title");

