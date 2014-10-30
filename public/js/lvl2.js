(function(){
  game.state.add('lvl2', {create:create, update:update});

  var positions = [{x:243, y:244, iT:220, fT:464},
                   {x:928, y:178, iT:800, fT:977},
                   {x:982, y:286, iT:864, fT:1136},
                   {x:2950, y:93, iT:2673, fT:3166},
                   {x:2833, y:257, iT:2640, fT:3136},
                   {x:3184, y:198, iT:3008, fT:3183},
                   {x:2495, y:295, iT:2352, fT:2656}];

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    gameOver = game.add.audio('gameOver');
    coinSound = game.add.audio('coin');
    splashSound = game.add.audio('splash');
    swim        = game.add.audio('swim', 1);
    jumpSound     = game.add.audio('jump', 0.8);
    pain          = game.add.audio('pain', 0.5);
    victory     = game.add.audio('victory', 1);
    level2Music = game.add.audio('level2Music', 1, true);
    level2Music.play();

    map = game.add.tilemap('level2');
    map.addTilesetImage('platformer_tiles');
    // reset score and time
    layer = map.createLayer('world2');
    layer = map.createLayer(0);
    layer.resizeWorld();
    //layer.debug = true;
    map.setCollisionBetween(60, 62);
    map.setCollisionBetween(4, 5);
    map.setCollisionBetween(9, 11);
    map.setCollisionBetween(41, 44);
    map.setCollisionBetween(105, 107);
    map.setCollision(79);

    // coins
    coins = game.add.group();
    coins.enableBody = true;
    coins.physicsBodyType = Phaser.Physics.ARCADE;
    for(var i = 0; i < 50; i++){
      coins.create(game.world.randomX, game.world.randomY, 'coin', 0);
      // coins.create(game.world.randomY, 100, 'coin', 0);

    };

    coins.setAll('body.gravity.y', 100);
    coins.setAll('body.bounce.y', 1);
    coins.setAll('scale.x', 0.5);
    coins.setAll('scale.y', 0.5);
    //make them spin
    coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    coins.callAll('animations.play', 'animations', 'spin');

          //trophy to end lvl2
    trophy = game.add.sprite(3242 , 216, 'trophy');
    trophy.anchor.setTo(1, 1);
    game.physics.arcade.enable(trophy);
    trophy.physicsBodyType = Phaser.Physics.ARCADE;
    trophy.scale.setTo(0.2,0.2);

    trophy.body.gravity.y = 100;
    //trophy.body.bounce.y = .2;

    // The player and its settings
    player = game.add.sprite(30, 30, 'dude');
    //bloopers
    bloopers = game.add.group();
    bloopers.enableBody = true;
    bloopers.physicsBodyType = Phaser.Physics.ARCADE;
    positions.forEach(function(p){
      blooper = bloopers.create(p.x, p.y, 'blooper');
      blooper.anchor.setTo(0.5, 0.5);
      blooper.scale.x = 0.5;
      blooper.scale.y = 0.5;
      blooper.animations.add('left', [0, 1], 4, true);
      blooper.animations.play('left');
      var tween = game.add.tween(blooper)
                 .to({x:p.iT}, 2000, Phaser.Easing.Linear.None)
                 .to({x:p.fT}, 2000, Phaser.Easing.Linear.None)
                 .loop()
                 .start();
    }, this);

    // The player and its settings
    //player = game.add.sprite(2948, 130, 'dude');


    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    player.body.setSize(18, 39, -2, 4);
    //  Player physics properties. Give the little guy a slight bounce and camera follow.
    player.anchor.setTo(0.5, 0.5);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.checkWorldBounds = true;
    player.body.collideWorldBounds = false;
    game.camera.follow(player);
    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    cursors = game.input.keyboard.createCursorKeys();

    time = 0;
    timer = game.time.events.loop(1000, addTime);
    txtTime = game.add.text(20, 30, 'Time: ' + time, {font: "20px Arial", fill: "#ffffff"});
    txtTime.fixedToCamera = true  ;

    txtScore = game.add.text(20, 10, 'Score: ' + score, {font: "20px Arial", fill: "#ffffff"});
    txtScore.fixedToCamera = true  ;

    //timers
  };

  function update(){
    //physics collisions declared here
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(bloopers, layer);
    game.physics.arcade.collide(coins, layer);
    game.physics.arcade.overlap(player, bloopers, bop, null, this);
    game.physics.arcade.overlap(player, coins, collectCoin);
    //trophy collide
    game.physics.arcade.collide(trophy, layer);
    game.physics.arcade.overlap(player, trophy, collectTrophy);
    //input controls
    movePlayer();

    if(player.body.y <= 50){
      movePlayer();
    }else{
      splashSound.play();
      moverUnderwater();
    }
    if(player.alive == false){
      killPlayer();
    };
  };
  function killPlayer(){
    //alert('you dun goofed');
    level2Music.stop()
    gameOver.play();
    game.state.start('gameover');
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
      jumpSound.play();
      player.body.velocity.y = -200;
    }


  }

  function bop(player, enemy){
    if(player.body.touching.down && enemy.body.touching.up){
      enemy.kill();
      player.body.velocity.y = -100;
    }else{
      killPlayer();
    }
  }

  function addTime(){
    time ++
    txtTime.text = 'Time: ' + time;
  }

  function collectCoin(player, coin){
    coin.kill();
    score += 10;
    txtScore.text = 'Score: ' + score;
    coinSound.play();
  }

function collectTrophy(player, trophy){
  level2Music.stop()
  trophy.kill();
  victory.play();
  score += 100;
  txtScore.text = 'Score: ' + score;
  coinSound.play();
setTimeout(function() {
  game.state.start('win2');}, 1);
}
  function moverUnderwater(){
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    // swim.play();

    if (cursors.up.isDown)
    {
        player.body.velocity.y = -250;
        swim.play();
        // particleBurst();
    }
    else if (cursors.down.isDown)
    {

        player.body.velocity.y = 100;
        swim.play();
        // particleBurst();
    }

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -100;
        swim.play();
        // player.scale.x = -1;
        player.animations.play('left');

        // particleBurst();
    }
    else if (cursors.right.isDown)
    {

        player.body.velocity.x = 100;
        swim.play();
        // player.scale.x = 1;
        player.animations.play('right');
        // particleBurst();
    }

  }
})();
