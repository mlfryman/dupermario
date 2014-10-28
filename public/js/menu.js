(function(){
  game.state.add('menu', {preload:preload, create:create});

  function preload(){
    //load ALL game assets here
    //images
    //sounds
    //spritesheets
  }

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //add tile sprite here

    var text = game.add.text(game.world.centerX, game.worldcenterYm 'Duper Mario!\n Press SPACE to Begin!');
    text. anchor.setTo(0.5);

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(start);
  }

  function start(){
    game.state.start('lvl1');
  }
})();
