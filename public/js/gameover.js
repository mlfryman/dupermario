(function(){
  game.state.add('gameover', {create:create});

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    var title = game.add.text(400, 75, 'Game Over', {font: "65px super_plumber_brothersregular", fill: "#FCFCFC", align: "center" });
    title. anchor.setTo(0.5);

    var instructions = game.add.text(400, game.world.centerY + 70, 'Press SPACE to play again', {font: "14px press_start_kregular", fill: "#FCFCFC", align: "center" });
    instructions.anchor.setTo(0.5);

    txtScore = game.add.text(150, game.world.centerY + 20, 'Final Score: ' + score, {font: "12px press_start_kregular", fill: "#FCFCFC", align: "left"});
    txtScore.fixedToCamera = true  ;
    txtScore.anchor.setTo(0);

    txtTime = game.add.text(450, game.world.centerY + 20, 'Final Time: ' + time, {font: "12px press_start_kregular", fill: "#FCFCFC", align: "right"});
    txtTime.fixedToCamera = true  ;
    txtTime.anchor.setTo(0);

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(start);
  }

  function start(){
    game.state.start('lvl1');
  }
})();
