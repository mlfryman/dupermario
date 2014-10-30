(function(){
  game.state.add('lvl2', {create:create, update:update});

  // variables are declared here

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    gameOver = game.add.audio('gameOver');
    coinSound = game.add.audio('coin');
    splashSound = game.add.audio('splash');
    level2Music = game.add.audio('level2Music', 1, true);
    level2Music.play();

    // game.add.tileSprite(0,0, 'bg2');
    // game.add.tileSprite(0, 0, 800, 600, 'bg2');

    map = game.add.tilemap('level2');
    map.addTilesetImage('platformer_tiles');
    // reset score and time
    layer = map.createLayer('world2');
    layer = map.createLayer(0);
    layer.resizeWorld();
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


    // The player and its settings
    player = game.add.sprite(32, game.world.height - 450, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

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
    // game.physics.arcade.collide(goombas, layer);
    game.physics.arcade.collide(coins, layer);
    // game.physics.arcade.overlap(player, goombas, bop, null, this);
    game.physics.arcade.overlap(player, coins, collectCoin);
    //input controls
    movePlayer();

    if(player.body.y <= 50){
      movePlayer();
    }else{
      splashSound.play();
      moverUnderwater();
    }
    // goombas.forEachAlive(moveEnemies, this);
    if(player.alive == false){
      killPlayer();
    };
  };
  function killPlayer(){
    //alert('you dun goofed');
    gameOver.play();
    game.state.start('menu');
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

  function bop(player, enemy){
    if(player.body.touching.down && enemy.body.touching.up){
      enemy.kill();
      player.body.velocity.y = -28;
    }else{
      killPlayer();
    }
  }
  function moveEnemies(g){
    if(g.x===g.bounceLeft){
      g.body.velocity.x = 100;
    }else if(g.x===g.bounceRight){
      g.body.velocity.x = -100;
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

  function moverUnderwater(){
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;


    if (cursors.up.isDown)
    {
        player.body.velocity.y = -250;
        // particleBurst();
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y = 100;
        // particleBurst();
    }

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -100;
        // player.scale.x = -1;
        player.animations.play('left');

        // particleBurst();
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 100;
        // player.scale.x = 1;
        player.animations.play('right');
        // particleBurst();
    }

  }

})();
