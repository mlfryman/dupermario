(function(){
  game.state.add('lvl1', {create:create, update:update});

  //variables are declared here
  var map;
  function create(){

    game.physics.startSystem(Phaser.Physics.ARCADE);
    map = game.add.tilemap('lvl1');
    map.addTilesetImage('SuperMarioBros-World1-1');
    layer = map.createLayer('World1');



    //reset score and time

    //create the game world
    //timers
  };
  function update(){
    //physics collisions declared here
    //input controls
  };
})();
