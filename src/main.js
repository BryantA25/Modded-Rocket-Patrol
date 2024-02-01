//Bryant Aberin
//Mod title: UltraPatrol
//Time to complete: approximately 12-15 hours

//Mods:
//Allow the player to control the Rocket after it's fired (1)
//Create 4 new explosion sound effects and randomize which one plays on impact (3)
//Display the time remaining (in seconds) on the screen (3)
//Create a new title screen (e.g., new artwork, typography, layout) (3)
//Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
//Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (5)

//Added a Streak counter that goes up on consecutive hits and resets on a miss (S)
//  * Streak goes up on shipExplode function
//  * Streak is set to 0 when y-coordinate of rocket reaches a certain value
//Added a special laser attack that can be activated when the streak reaches a certain amount (S)
//  * When the streak is 10 or higher, the player is allowed to fire the laser using (S)
//  * Any ship whose x-coordinate is in close proximity to the x-coordinate of the laser explotdes
//  * Ships destroyed by the laser do not count toward the streak count.
//  * The higher the streak before firing the laser, the longer the laser will linger. 

//Custom mods were looked at by TA, but not given a value as sufficient points were already achieved

//Citation:
// Particle Emition: https://phaser.io/examples/v3/view/game-objects/particle-emitter/explode-emitter
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config)

//set UI Sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

//reserve keyboard binidngs
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, keySPECIAL, keyMENU