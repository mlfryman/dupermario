(function(){
  game.state.add('lvl1', {create:create, update:update});

  var positions = [{x:243, y:100}];
  function create(){

    coinSound = game.add.audio('coin');
<<<<<<< HEAD
    level1music = game.add.audio('level1Music', 1, true);
    level1music.play();
=======
>>>>>>> e2255a8ff5fa436d724bc9e3039f86bab3e4f9e8

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
    txtTime = game.add.text(20, 30, 'Time: 0', {font: "20px Arial", fill: "#ffffff"});
    txtTime.fixedToCamera = true  ;

    score = 0;
    txtScore = game.add.text(20, 10, 'Score: 0', {font: "20px Arial", fill: "#ffffff"});
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
    setTimeout(function() {game.state.start('lvl2');}, 3000);
}

    //input controls
    movePlayer();
    goombas.forEachAlive(moveEnemies, this);
    if(player.alive == false){
      killPlayer();
    };
  };


  function killPlayer(){
    level1music.stop()
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
        fireball = fireballs.create(giant.body.x + giant.body.width / 2 - 40, giant.body.y + giant.body.height / 2 + 5, 'fireball');
        }
        game.physics.enable(fireball, Phaser.Physics.ARCADE);
        fireball.body.gravity.y = 500;
        fireball.body.bounce.y = 1;
        fireball.outOfBoundsKill = true;
        fireball.anchor.setTo(0.5, 0.5);
        fireball.body.velocity.x = 0;
        if (facingGiant == 'right'){
          fireball.body.velocity.x = 200;
      } else {
        fireball.body.velocity.x = -200;
      }
    }
  }

  function hitGiant (player, enemy) {
    if(player.body.touching.down && enemy.body.touching.up){
      giantHP -= 100;
      player.body.bounce.y = .7;
    }else{
      killPlayer();
    }
  }
})();
