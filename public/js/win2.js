(function(){
  game.state.add('win2', {create:create});

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    var emitter1 = game.add.emitter(100, 0, 0);
    emitter1.makeParticles(['diamond', 'star', 'star-part', '1up', 'gold']);
    emitter1.start(false, 4000, 100);

    var emitter2 = game.add.emitter(700, 0, 0);
    emitter2.makeParticles(['diamond', 'star', 'star-part', '1up', 'gold']);
    emitter2.start(false, 4000, 100);

    var title2 = game.add.text(400, 75, 'Woooooo Hooooooo!', {font: "65px super_plumber_brothersregular", fill: "#FCFCFC", align: "center" });
    title2. anchor.setTo(0.5);

    txt2 = game.add.text(400, game.world.centerY + 20, 'Level 2 Complete', {font: "18px press_start_kregular", fill: "#FCFCFC", align: "center"});
    txt2.fixedToCamera = true  ;
    txt2. anchor.setTo(0.5);

    var instructions2 = game.add.text(400, game.world.centerY + 70, 'Press SPACE to return to MENU', {font: "14px press_start_kregular", fill: "#FCFCFC", align: "center" });
    instructions2.anchor.setTo(0.5);

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(start);
  }

  function start(){
    game.state.start('menu');
  }
})();
