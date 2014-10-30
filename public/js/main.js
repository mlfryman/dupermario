var game = new Phaser.Game(800, 240, Phaser.CANVAS, 'duper-mario');

/*  MISC VARS  */
var map, layer, player;

/* AUDIO */
var level1Music, level2Music,
    coinSound, gameOver;

/* TIME & SCORE */
var score = 0, txtScore,
    time = 0, timer, txtTime;

/* COLLECTABLES */

var coin, coins, trophy;

/* BADDIES */
var goombas;
