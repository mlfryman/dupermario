(function(){
  game.state.add('lvl1', {create:create, update:update, render:render});

  var positions = [{x:243, y:100},
                   {x:1253, y:192},
                   {x:1920, y:184},
                   {x:981, y:184.5},
                   {x:1369, y:52},
                   {x:1498, y:52},
                   {x:2080, y:185}];
  var bumps = [{x:1826, y:184},
               {x:1111, y:184.5},
               {x:1256, y:56},
               {x:1423, y:56},
               {x:1530, y:56}];
  function create(){
    bumpers = game.add.group();
    bumpers.enableBody = true;
    bumpers.physicsBodyType = Phaser.Physics.ARCADE;
    bumps.forEach(function(b){
      b = bumpers.create(b.x, b.y, 'bumper');
      b.body.immovable = true;
    }, this);

    coinSound = game.add.audio('coin');
    gameOver = game.add.audio('gameOver');
    bumpers.createMultiple(20, 'bumper');
    bumper = bumpers.getFirstDead();
    bumper.reset(1826, 184);
    bumper.body.immovable = true;

    fireBallSound = game.add.audio('fireball', 0.5);
    jumpSound     = game.add.audio('jump', 0.8);
    coinSound     = game.add.audio('coin', 0.5);
    haha          = game.add.audio('haha', 0.5);
    pain          = game.add.audio('pain', 0.5);
    bossKilled    = game.add.audio('bossdead', 0.5);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    map = game.add.tilemap('level1');
    map.addTilesetImage('SuperMarioBros-World1-1');
    layer = map.createLayer('World1');
    layer.resizeWorld();

    // layer.debug = true

    map.setCollisionBetween(14, 16);
    map.setCollisionBetween(21, 22);
    map.setCollisionBetween(27, 28);
    map.setCollision(40);

    // The player and its settings

    player = game.add.sprite(32, game.world.height - 150, 'dude');
    //player = game.add.sprite(1805, 120, 'dude');
    //coins
    coins = game.add.group();
    coins.enableBody = true;
    coins.physicsBodyType = Phaser.Physics.ARCADE;
    for(var i = 0; i < 100; i++){
      coins.create(game.world.randomX, 50 * Math.random(), 'coin', 0);
    };
    coins.setAll('body.gravity.y', 100 * Math.random() + 50);
    coins.setAll('body.bounce.y', 1);
    coins.setAll('scale.x', 0.5);
    coins.setAll('scale.y', 0.5);
    //make them spin
    coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    coins.callAll('animations.play', 'animations', 'spin');


    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    player.body.setSize(18, 39, -2, 4);
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
      goomba = goombas.create(p.x, p.y, 'goomba');
      goomba.anchor.setTo(0.5, 0.5);
      goomba.scale.x = 0.5;
      goomba.scale.y = 0.5;
      goomba.body.gravity.y = 900;
      goomba.animations.add('left', [0, 1], 4, true);
      goomba.animations.play('left');
      goomba.body.velocity.x = -100;
      goomba.body.bounce.x = 1;
    }, this);

    cursors = game.input.keyboard.createCursorKeys();


    player.checkWorldBounds = true;
    player.outOfBoundsKill = true;

    time = 0;
    timer = game.time.events.loop(1000, addTime);
    txtTime = game.add.text(20, 30, 'Time: 0', {font: "10px press_start_kregular", fill: "#FCFCFC"});
    txtTime.fixedToCamera = true  ;

    score = 0;
    txtScore = game.add.text(20, 10, 'Score: 0', {font: "10px press_start_kregular", fill: "#FCFCFC"});
    txtScore.fixedToCamera = true  ;

    spawnGiant();

    fireballs = game.add.group();
    game.physics.enable(fireballs, Phaser.Physics.ARCADE);
  };

  function update(){
    //physics collisions declared here
    game.physics.arcade.collide(giant, layer);
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(goombas, layer);
    game.physics.arcade.collide(goombas, bumpers);
    game.physics.arcade.collide(coins, layer);
    game.physics.arcade.overlap(player, goombas, bop, null, this);
    game.physics.arcade.overlap(player, giant, hitGiant, null, this);
    game.physics.arcade.overlap(player, coins, collectCoin);
    game.physics.arcade.collide(fireballs, layer);
    game.physics.arcade.collide(fireballs, player, killPlayer, null, this);

    //giant boss path
    pathCounter +=1;
    if (pathCounter >= 140){
      pathCounter = 0;
    }

    giantPath();

    if (giant.alive == true){
      giantShoots();
    }

    if (giantHP <= 0 ) {
      giant.kill();
      setTimeout(function() {
        game.state.start('win1');
        level1Music.stop();
        }, 3000);
      }

    //input controls
    movePlayer();
    if(player.alive == false){
      killPlayer();
    };
  }



  function killPlayer(){
    level1Music.stop()
    gameOver.play();
    //alert('you dun goofed');
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
      haha.play();
      player.body.velocity.y = -100;
    }else{
      pain.play();
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

  var giantHP = 100;
  function spawnGiant() {
    giant = game.add.sprite(2970, 50, 'giant_mario');
    game.physics.enable(giant, Phaser.Physics.ARCADE);
    giant.body.gravity.y=500;
    giant.body.collideWorldBounds = true;
    giant.body.fixedRotation = true;
    giant.frame = 1;
    giant.animations.add('walking_left', [0,1,2], 6, true);
    giant.animations.add('walking_right', [3,4,5], 6, true);
    //giant.Text = game.add.text(giant.body.x, giant.body.y - 30, giantHP);
  }

  var pathCounter = 0;
  function giantPath(){
    if (pathCounter < 70) {
    giant.animations.play('walking_left');
    giant.body.velocity.x = - 50;
    facingGiant = 'left';
  } else {
    giant.animations.play('walking_right');
    giant.body.velocity.x = 50;
    facingGiant = 'right';
      }
    }
    var shotTimerGiant = 0;
    function giantShoots(){

      if (shotTimerGiant < game.time.now) {
        shotTimerGiant = game.time.now + 3000;
        var fireball;
        if (facingGiant == 'right') {
          fireball = fireballs.create(giant.body.x + giant.body.width / 2 + 45, giant.body.y + giant.body.height / 2 + 5, 'fireball');
        } else {
        fireBallSound.play();
        fireball = fireballs.create(giant.body.x + giant.body.width / 2 - 40, giant.body.y + giant.body.height / 2 + 5, 'fireball');
        }
        game.physics.enable(fireball, Phaser.Physics.ARCADE);
        fireball.body.setSize(30, 35);
        fireball.body.gravity.y = 500;
        fireball.body.bounce.y = 1;
        fireball.outOfBoundsKill = true;
        fireball.anchor.setTo(0.5, 0.5);
        fireball.body.velocity.x = 0;
        if (facingGiant == 'right'){
          fireBallSound.play();
          fireball.body.velocity.x = 200;
        } else {
          fireBallSound.play();
        fireball.body.velocity.x = -200;
      }
    }
  }

  function hitGiant (player, enemy) {
    if(player.body.touching.down && enemy.body.touching.up){
      giantHP -= 25;
      bossKilled.play();
      player.body.velocity.y = -150;

    }else{
      killPlayer();
    }
  }

  function render(){
    /*
    game.debug.body(player);
    for (var i = 0; i < fireballs.length; i++){
      game.debug.body(fireballs.children[i]);
    }
    game.debug.body(player);
    for (var i = 0; i < bumpers.length; i++){
      game.debug.body(bumpers.children[i]);
    }
    */
  }

})();
