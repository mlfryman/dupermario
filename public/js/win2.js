(function(){
  game.state.add('win2', {create:create});

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    var title2 = game.add.text(400, 75, 'Woooooo Hooooooo!', {font: "65px super_plumber_brothersregular", fill: "#FCFCFC", align: "center" });
    title2. anchor.setTo(0.5);

    txt2 = game.add.text(400, game.world.centerY + 20, 'Level 2 Complete!', {font: "16px press_start_kregular", fill: "#FCFCFC", align: "center"});
    txt2.fixedToCamera = true  ;

    var instructions2 = game.add.text(400, game.world.centerY + 70, 'Press SPACE to return to MENU', {font: "14px press_start_kregular", fill: "#FCFCFC", align: "center" });
    instructions2.anchor.setTo(0.5);

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(start);
  }

  function start(){
    game.state.start('menu');
  }
})();
