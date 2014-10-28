(function(){
  game.state.add('menu', {preload:preload, create:create});

  function preload(){
    //load ALL game assets here
    game.load.image('bg', '/assets/background.png');
    //images
    //sounds
    //spritesheets
  }

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //add tile sprite background here
    game.add.tileSprite(0, 0, 800, 600, 'bg');

    var text = game.add.text(game.world.centerX, game.world.centerY, 'Duper Mario!\n Press SPACE to Begin!');
    text. anchor.setTo(0.5);

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(start);
  }

  function start(){
    game.state.start('lvl1');
  }
})();
