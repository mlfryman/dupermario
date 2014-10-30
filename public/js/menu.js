(function(){
  game.state.add('menu', {preload:preload, create:create});

  function preload(){
    //load ALL game assets here
    game.load.image('bg', '/assets/background.png');
    game.load.spritesheet('dude', '/assets/dude.png', 32, 48);
    game.load.spritesheet('coin', '/assets/coin.png', 32, 32);

    game.load.tilemap('level1', 'assets/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('SuperMarioBros-World1-1', '/assets/super_mario.png');
    game.load.audio('coin', '/assets/sonic_ring.wav');
    game.load.audio('level1Music', '/assets/level-one-theme.ogg');
    //images
    //sounds
    //spritesheets
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
