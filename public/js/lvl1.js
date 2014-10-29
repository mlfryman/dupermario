(function(){
  game.state.add('lvl1', {create:create, update:update});

  //variables are declared here
  //var map;
  function create(){

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
    //  map.setCollisionByExclusion([1], true, 'Tile Layer 1');

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

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
    cursors = game.input.keyboard.createCursorKeys();

    //reset score and time

    //create the game world
    //timers
    //layer.fixedToCamera = false;
  };

  function update(){
    //physics collisions declared here
    //input controls
     //  Reset the players velocity (movement)

    //this.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);

    player.body.velocity.x = 0;

    game.physics.arcade.collide(player, layer);

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.onFloor())
    {
        player.body.velocity.y = -200;
    }
  };

})();
