const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

// queue bunny sprites
ASSET_MANAGER.queueDownload("./bunny/BunnyAttack-Sheet.png");
ASSET_MANAGER.queueDownload("./bunny/BunnyCarrotSkill-Sheet.png");
ASSET_MANAGER.queueDownload("./bunny/BunnyIdle-Sheet.png");
ASSET_MANAGER.queueDownload("./bunny/BunnyLieDown-Sheet.png");
ASSET_MANAGER.queueDownload("./bunny/BunnyRun-Sheet.png");
ASSET_MANAGER.queueDownload("./bunny/BunnySitting-Sheet.png");
ASSET_MANAGER.queueDownload("./bunny/background.png");

ASSET_MANAGER.downloadAll(() => {
  const canvas = document.getElementById("gameWorld");
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  gameEngine.init(ctx);
  canvas.focus();

  const bunny = new Bunny(gameEngine, 200, 600, {
  attack: ASSET_MANAGER.getAsset("./bunny/BunnyAttack-Sheet.png"),
  carrotSkill: ASSET_MANAGER.getAsset("./bunny/BunnyCarrotSkill-Sheet.png"),
  idle: ASSET_MANAGER.getAsset("./bunny/BunnyIdle-Sheet.png"),
  lieDown: ASSET_MANAGER.getAsset("./bunny/BunnyLieDown-Sheet.png"),
  run: ASSET_MANAGER.getAsset("./bunny/BunnyRun-Sheet.png"),
  sitting: ASSET_MANAGER.getAsset("./bunny/BunnySitting-Sheet.png"),
});

gameEngine.addEntity(bunny);


  const hud = new HUD(gameEngine);
  gameEngine.addEntity(hud);

  const bg = new Background(gameEngine, ASSET_MANAGER.getAsset("./bunny/background.png"));
  gameEngine.addEntity(bg);

  gameEngine.start();
});

