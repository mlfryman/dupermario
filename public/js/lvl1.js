(function(){
  game.state.add('lvl1', {create:create, update:update});

  var positions = [{x:243, y:100}];
  function create(){

    coinSound = game.add.audio('coin');
    game.physics.startSystem(Phaser.Physics.ARCADE);
    map = game.add.tilemap('level1');
    map.addTilesetImage('SuperMarioBros-World1-1');

    layer = map.createLayer('World1');

    layer = map.createLayer(0);
    layer.resizeWorld();

    map.setCollisionBetween(14, 16);
    map.setCollisionBetween(21, 22);
    map.setCollisionBetween(27, 28);
    map.setCollision(40);

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');
    //  We need to enable physics on the player


    //coins
    coins = game.add.group();
    coins.enableBody = true;
    coins.physicsBodyType = Phaser.Physics.ARCADE;
    for(var i = 0; i < 40; i++){
      coins.create(game.world.randomX, 30, 'coin', 0);
    };
    coins.setAll('body.gravity.y', 100);
    coins.setAll('body.bounce.y', 1);
    coins.setAll('scale.x', 0.5);
    coins.setAll('scale.y', 0.5);
    //make them spin
    coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    coins.callAll('animations.play', 'animations', 'spin');


    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.anchor.setTo(0.5, 0.5);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.checkWorldBounds = true;
    player.body.collideWorldBounds = false;
    game.camera.follow(player);
    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //goombas
    goombas = game.add.group();
    goombas.enableBody = true;
    goombas.physicsBodyType = Phaser.Physics.ARCADE;
    positions.forEach(function(p){
      var goomba = goombas.create(p.x, p.y, 'goomba');
      goomba.anchor.setTo(0.5, 0.5);
      goomba.scale.x = 0.5;
      goomba.scale.y = 0.5;
      goomba.body.gravity.y = 900;
      //goomba.body.setSize(32, 50, 0, 5);
      goomba.animations.add('left', [0, 1], 4, true);
      goomba.animations.play('left');
      goomba.body.velocity.x = -100;
      goomba.bounceLeft = 144.25;
      goomba.bounceRight = 431.75;
    }, this);


    cursors = game.input.keyboard.createCursorKeys();


    player.checkWorldBounds = true;
    player.outOfBoundsKill = true;

    time = 0;
    timer = game.time.events.loop(1000, addTime);
    txtTime = game.add.text(20, 30, 'Time: 0', {font: "20px press_startregular", fill: "#FCFCFC"});
    txtTime.fixedToCamera = true  ;

    score = 0;
    txtScore = game.add.text(20, 10, 'Score: 0', {font: "20px press_startregular", fill: "#FCFCFC"});
    txtScore.fixedToCamera = true  ;
  };

  function update(){
    //physics collisions declared here
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(goombas, layer);
    game.physics.arcade.collide(coins, layer);
    game.physics.arcade.overlap(player, goombas, bop, null, this);
    game.physics.arcade.overlap(player, coins, collectCoin);
    //input controls
    movePlayer();
    goombas.forEachAlive(moveEnemies, this);
    if(player.alive == false){
      killPlayer();
    };
  };

  function killPlayer(){
    alert('you dun goofed');
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
})();
