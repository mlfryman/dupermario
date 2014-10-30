var game = new Phaser.Game(800, 240, Phaser.CANVAS, 'duper-mario');

/*  MISC VARS  */
var map, layer, player;

/* AUDIO */
var level1Music, level2Music,
    coinSound;

/* TIME & SCORE */
var score, txtScore,
    time, timer, txtTime;

/* COLLECTABLES */

var coin, coins;

/* BADDIES */
var goombas;
