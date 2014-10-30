(function(){
  game.state.add('win1', {create:create});

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    var title1 = game.add.text(400, 75, 'Bombdigity!', {font: "65px super_plumber_brothersregular", fill: "#FCFCFC", align: "center" });
    title1.anchor.setTo(0.5);

    txt1 = game.add.text(100, game.world.centerY + 20, 'Level 1 Complete!', {font: "16px press_start_kregular", fill: "#FCFCFC", align: "center"});
    txt1.fixedToCamera = true  ;

    var instructions1 = game.add.text(400, game.world.centerY + 70, 'Press SPACE to start Level 2', {font: "14px press_start_kregular", fill: "#FCFCFC", align: "center" });
    instructions1.anchor.setTo(0.5);

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(start);
  }

  function start(){
    game.state.start('lvl2');
  }
})();
