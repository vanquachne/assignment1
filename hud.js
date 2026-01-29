class HUD {
  constructor(game) {
    this.game = game;
    this.removeFromWorld = false;

    // text config
    this.x = 18;
    this.y = 740; 
  }

  update() {}

  
    draw(ctx) {
  ctx.save();
  ctx.font = "16px 'Press Start 2P'";
  ctx.fillStyle = "#2b588f";
  ctx.fillText("← → MOVE", 20, 30);
  ctx.fillText("↓ SIT", 20, 55);
  ctx.fillText("L LIE DOWN", 20, 80);
  ctx.fillText("A ATTACK", 20, 105);
  ctx.fillText("S CARROT SKILL", 20, 130);
  ctx.restore();
  }
}
