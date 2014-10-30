(function(){
  game.state.add('menu', {preload:preload, create:create});

  function preload(){
    /* NOTE: load ALL game assets here */
    // images
    game.load.image('bg', '/assets/background.png');
    game.load.image('bumper', '/assets/bumper.png');
    game.load.spritesheet('dude', '/assets/dude.png', 32, 48);

    game.load.spritesheet('coin', '/assets/coin.png', 32, 32);
    game.load.spritesheet('giant_mario', '/assets/giantMario.png', 88.6666, 124);

    // tiles & tile maps
    game.load.tilemap('level1', 'assets/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
    // gameover uses the same tile sheet as level 1
    game.load.tilemap('gameover', 'assets/gameover.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('SuperMarioBros-World1-1', '/assets/super_mario.png');

    game.load.tilemap('level2', 'assets/platform.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('platformer_tiles', '/assets/platformer_tiles.png');
    game.load.image('fireball', '/assets/fireball.png ');

    game.load.audio('splash', '/assets/splash.mp3');
    game.load.audio('coin', ['/assets/audio/sonic_ring.wav', '/assets/audio/sonic_ring.wav']);
    game.load.audio('level1Music', '/assets/audio/level-one-theme.ogg');
    game.load.audio('level2Music', '/assets/audio/level-one-theme.ogg');

    game.load.spritesheet('dude', '/assets/dude.png', 32, 48);
    game.load.spritesheet('coin', '/assets/coin.png', 32, 32);
    game.load.atlas('goomba', '/assets/goomba.png', '/assets/goomba.json');
  }

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //add tile sprite background here
    game.add.tileSprite(0, 0, 800, 600, 'bg');

    var title = game.add.text(400, 75, 'Duper Mario!', {font: "65px super_plumber_brothersregular", fill: "#C64C1D", align: "center" });
    title. anchor.setTo(0.5);

    var instructions = game.add.text(400, game.world.centerY + 20, 'Press SPACE to play', {font: "15px press_start_kregular", fill: "#FCFCFC", align: "center" });
    instructions.anchor.setTo(0.5);

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(start);
  }

  function start(){
    game.state.start('lvl1');

  }

})();
