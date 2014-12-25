(function(){
  game.state.add('menu', {preload:preload, create:create, update:update});

  function preload(){
    /* NOTE: load ALL game assets here */
    // images
    game.load.image('bg',         'assets/img/menu-bg.png');
    game.load.image('bumper',     'assets/img/bumper.png');
    game.load.image('gold',       'assets/img/particles/gold.png');
    game.load.image('star-part',  'assets/img/particles/star_particle.png');
    game.load.image('diamond',    'assets/img/particles/diamond.png');
    game.load.image('1up',        'assets/img/particles/1up.png');
    game.load.image('star',       'assets/img/particles/star.png');
    game.load.image('fireball',   'assets/img/fireball.png ');
    game.load.image('trophy',     'assets/img/trophy.png ');

    // spritesheets
    game.load.spritesheet('dude',        'assets/img/dude.png', 32, 48);
    game.load.spritesheet('coin',        'assets/img/coin.png', 32, 32);
    game.load.spritesheet('giant_mario', 'assets/img/giantMario.png', 88.6666, 124);
    game.load.spritesheet('blooper',     'assets/img/enemy/blooper-sprite.png', 32, 48);
    game.load.atlas('goomba',            'assets/img/enemy/goomba.png', 'assets/img/enemy/goomba.json');

    // tiles & tile maps
    game.load.tilemap('level1',                 'assets/img/tiles/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
    // gameover uses the same tile sheet as level 1
    game.load.tilemap('gameover',               'assets/img/tiles/gameover.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('SuperMarioBros-World1-1',  'assets/img/tiles/super_mario.png');
    game.load.tilemap('level2',                 'assets/img/tiles/platform.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('platformer_tiles',         'assets/img/tiles/platformer_tiles.png');

    // audio
    game.load.audio('splash',       'assets/audio/splash.ogg');
    game.load.audio('jump',         'assets/audio/mario-woohoo.ogg');
    game.load.audio('fireball',     'assets/audio/cannon-shot.ogg');
    game.load.audio('bossdead',     'assets/audio/fireball.ogg');
    game.load.audio('swim',         'assets/audio/water.ogg');
    game.load.audio('haha',         'assets/audio/mario-haha.ogg');
    game.load.audio('pain',         'assets/audio/mario-pain.ogg');
    game.load.audio('coin',         'assets/audio/sonic_ring.ogg');
    game.load.audio('level1Music',  'assets/audio/level-one-theme.ogg');
    game.load.audio('level2Music',  'assets/audio/level-two-theme.ogg');
    game.load.audio('gameOver',     'assets/audio/game-over.ogg');
    game.load.audio('victory',      'assets/audio/victory.ogg');
  }

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    level1Music = game.add.audio('level1Music', 1, true);
    level1Music.play();

    game.add.sprite(0, 0, 'bg');

    var title = game.add.text(400, 75, 'Duper Mario!', {font: "75px super_plumber_brothersregular", fill: "#C64C1D", align: "center" });
    title.anchor.setTo(0.5);

    var instructions = game.add.text(400, game.world.centerY + 20, 'Press SPACE to play', {font: "15px press_start_kregular", fill: "#FCFCFC", align: "center" });
    instructions.anchor.setTo(0.5);

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(start);
    cursors = game.input.keyboard.createCursorKeys();

    bumper = game.add.sprite(0, 206, 'bumper');
    game.physics.arcade.enable(bumper);
    bumper.body.immovable = true;
    bumper.scale.x = 50;
    bumper.scale.y = 3;
    //game.debug.body(bumper);
    player = game.add.sprite(32, game.world.height - 150, 'dude');
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.anchor.setTo(0.5, 0.5);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.checkWorldBounds = true;
    player.body.collideWorldBounds = true;
    game.camera.follow(player);
    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
  }
  function update(){
    movePlayer();
    game.physics.arcade.collide(player, bumper);
  }
  function start(){
    game.state.start('lvl1');

  }
  function movePlayer(){
    //Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
      player.body.velocity.x = -150;
      player.animations.play('left');
    }else if (cursors.right.isDown){
        //  Move to the right
      player.body.velocity.x = 150;
      player.animations.play('right');
    }else{
      //  Stand still
      player.animations.stop();
      player.frame = 4;
    }
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.onFloor()){
      player.body.velocity.y = -200;
    }

  }
  function render(){
    game.debug.body(bumper);
  }
})();
