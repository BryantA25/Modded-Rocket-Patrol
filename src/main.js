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
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, keySPECIAL