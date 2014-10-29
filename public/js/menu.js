(function(){
  game.state.add('menu', {preload:preload, create:create});

  function preload(){
    //load ALL game assets here
    game.load.image('bg', '/assets/background.png');
    game.load.spritesheet('dude', '/assets/dude.png', 32, 48);
    game.load.spritesheet('coin', '/assets/coin.png', 32, 32);
    game.load.spritesheet('giant_mario', '/assets/giantMario.png', 88.6666, 124);

    game.load.tilemap('level1', 'assets/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('SuperMarioBros-World1-1', '/assets/super_mario.png');
    game.load.audio('coin', '/assets/sonic_ring.wav');
    //images
    //sounds
    //spritesheets
    game.load.atlas('goomba', '/assets/goomba.png', '/assets/goomba.json');
  }

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //add tile sprite background here
    game.add.tileSprite(0, 0, 800, 600, 'bg');

    var text = game.add.text(300, game.world.centerY, 'Duper Mario!\n Press SPACE to Begin!');
    text. anchor.setTo(0.5);

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(start);
  }

  function start(){
    game.state.start('lvl1');
  }
})();
