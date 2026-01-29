class Bunny {
  constructor(game, x, y, sheets) {
    this.game = game;
    this.x = x;
    this.y = y;

    // movement
    this.speed = 200; // px/sec
    this.facingLeft = false;

    // sprite constants (all your sheets are 32x32 per frame)
    this.FRAME_W = 32;
    this.FRAME_H = 32;
    this.SCALE = 4; // integer for pixel art

    const makeAnimator = (img, frames, frameDuration, loop = true) =>
      new Animator(img, 0, 0, this.FRAME_W, this.FRAME_H, frames, frameDuration, loop, this.SCALE);

    // animations (frame counts from YOU)
    this.anim = {
      idle: makeAnimator(sheets.idle, 8, 0.14, true),          // 8 frames (256x32)
      run: makeAnimator(sheets.run, 5, 0.08, true),            // 5 frames (160x32)
      sitting: makeAnimator(sheets.sitting, 3, 0.18, true),    // 3 frames (96x32)
      lieDown: makeAnimator(sheets.lieDown, 2, 0.25, true),    // 2 frames (64x32)

      // while-held actions: you said you want loop until release -> set loop = true
      attack: makeAnimator(sheets.attack, 7, 0.08, true),      // 7 frames (224x32)
      carrotSkill: makeAnimator(sheets.carrotSkill, 15, 0.07, true), // 15 frames (480x32)
    };

    // default state
    this.state = "idle";
  }

  setState(newState) {
    if (this.state === newState) return;
    this.state = newState;
    this.anim[this.state]?.reset();
  }

  update() {
    const dt = this.game.clockTick;

    const left = !!this.game.keys["ArrowLeft"];
    const right = !!this.game.keys["ArrowRight"];

    const attack = !!(this.game.keys["a"] || this.game.keys["A"]);
    const carrot = !!(this.game.keys["s"] || this.game.keys["S"]); // choose key S for skill
    const sit = !!(this.game.keys["ArrowDown"]);
    const lie = !!(this.game.keys["l"] || this.game.keys["L"]);    // optional key L

    // horizontal movement ALWAYS allowed (like your cat)
    if (left && !right) {
      this.facingLeft = true;
      this.x -= this.speed * dt;
    } else if (right && !left) {
      this.facingLeft = false;
      this.x += this.speed * dt;
    }

    // choose animation state (while held)
    // Priority: carrotSkill > attack > sit/lie > run > idle
    if (carrot) {
      this.setState("carrotSkill");
    } else if (attack) {
      this.setState("attack");
    } else if (sit) {
      this.setState("sitting");
    } else if (lie) {
      this.setState("lieDown");
    } else if (left || right) {
      this.setState("run");
    } else {
      this.setState("idle");
    }

    // keep on screen
    const canvas = this.game.ctx.canvas;
    const drawW = this.FRAME_W * this.SCALE;
    this.x = Math.max(0, Math.min(this.x, canvas.width - drawW));
  }

  draw(ctx) {
    const anim = this.anim[this.state] || this.anim.idle;
    anim.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.facingLeft);
  }
}
