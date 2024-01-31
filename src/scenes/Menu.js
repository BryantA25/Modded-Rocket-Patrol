class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload(){
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('spaceship', './assets/spaceship.png')
        this.load.image('starfield', './assets/starfield.png')
        this.load.image('supership', './assets/supership.png')
        this.load.image('bit', './assets/bit.png')
        this.load.image('red-bit', './assets/red-bit.png')

        //load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })

        //load red spritesheet
        this.load.spritesheet('explosion-red', './assets/explosion-red.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })

        //load laser spritesheet
        this.load.spritesheet('laser', './assets/laser.png', {
            frameWidth: 100,
            frameHeight: 300,
            startFrame: 0,
            endFrame: 2
        })

        //load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion0', './assets/sfx-explosion0.wav')
        this.load.audio('sfx-explosion1', './assets/sfx-explosion1.wav')
        this.load.audio('sfx-explosion2', './assets/sfx-explosion2.wav')
        this.load.audio('sfx-explosion3', './assets/sfx-explosion3.wav')
        this.load.audio('sfx-explosionS', './assets/sfx-explosionS.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
        this.load.audio('sfx-laser', './assets/sfx-laser.wav')
    }

    create() {
        //animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        })

        //alt animation
        this.anims.create({
            key: 'explode-red',
            frames: this.anims.generateFrameNumbers('explosion-red', {start: 0, end: 9, first: 0}),
            frameRate: 30
        })

        //laser animation
        this.anims.create({
            key: 'laser-anim',
            frames: this.anims.generateFrameNumbers('laser', {start: 0, end: 2, first: 0}),
            frameRate: 12,
            repeat:-1
        })

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        }
        //display menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*3 - borderPadding*3, 'ROCKET PATROL', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'When your streak is high enough,', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 + borderPadding*2, 'Press (S) to acivate the laser', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*4 + borderPadding*4, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5)

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy mode
            game.settings = {
                spaceshipSpeed: 3,
                supershipSpeed: 5,
                gameTimer: 60000,
                timeScale: 60
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
                spaceshipSpeed: 4,
                supershipSpeed: 6,
                gameTimer: 45000,
                timeScale: 45
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
    }
}
