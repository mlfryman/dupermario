(function(){
  game.state.add('gameover', {create:create});

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // add tile sprite background here
    // game.add.tileSprite(0, 0, 800, 600, 'bg');

    var title = game.add.text(400, 75, 'Game Over', {font: "65px super_plumber_brothersregular", fill: "#FCFCFC", align: "center" });
    title. anchor.setTo(0.5);

    var instructions = game.add.text(400, game.world.centerY + 20, 'Press SPACE to play again', {font: "15px press_start_kregular", fill: "#FCFCFC", align: "center" });
    instructions.anchor.setTo(0.5);

    time = 0;
    timer = game.time.events.loop(1000, addTime);
    txtTime = game.add.text(20, 30, 'Time: 0', {font: "10px press_start_kregular", fill: "#FCFCFC"});
    txtTime.fixedToCamera = true  ;

    score = 0;
    txtScore = game.add.text(20, 10, 'Score: 0', {font: "10px press_start_kregular", fill: "#FCFCFC"});
    txtScore.fixedToCamera = true  ;

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(start);
  }

  function start(){
    game.state.start('lvl1');
  }
})();
