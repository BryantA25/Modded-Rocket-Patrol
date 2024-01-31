class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)

        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)

        //add spaceships
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0)

        //add special spaceship
        this.ship0X = new Supership(this, game.config.width + borderUISize*9, borderUISize*4, 'supership', 0, 50).setOrigin(0,0)

        //define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keySPECIAL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)

        //initialize score
        this.p1Score = 0

        //display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, "Score: "+this.p1Score, this.scoreConfig)

        //initialize streak
        this.p1Streak = 0

        //display Streak *** CHANGE VALUES SO IT DOESN'T OVERLAP THE SCORE
        let streakConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }
        this.streakLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*4, "Streak: "+this.p1Streak, this.streakConfig)

        // streak clock
        //scoreConfig.fixedWidth = 0
        //this.streakclock = this.time.delayedCall(10000, () => {
        //    this.p1Streak = 0
        //}, null, this)
        

        //GAME OVER flag
        this.gameOver = false

        // play clock
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)


        //display clock
        let clockConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }
        this.clockRight = this.add.text(borderUISize + borderPadding*35, borderUISize + borderPadding*2, this.currentTime, this.clockConfig)
    }

    update() {
        //Display remaining time
        this.currentTime = Phaser.Math.RoundTo((game.settings.timeScale - (game.settings.timeScale * this.clock.getProgress())),  0)
        this.clockRight.text = "Remaining Time: "+this.currentTime

        //add time when ship is hit

        //check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }

        this.starfield.tilePositionX -= 4

        if(!this.gameOver){
            this.p1Rocket.update()  //update rocket sprite
            this.ship01.update()    //update spaceships (x3)
            this.ship02.update()
            this.ship03.update()

            this.ship0X.update()
        }

        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
        }
        if(this.checkCollision(this.p1Rocket, this.ship0X)) {
            this.p1Rocket.reset()
            this.supershipExplode(this.ship0X)
        }

        //record miss
        if(this.p1Rocket.y <= 110) {
            this.p1Streak = 0
            this.streakLeft.text = "Streak: "+this.p1Streak

            //subtract from remaining time
        }


        //activate special attack
        if(this.p1Streak >= 7 && Phaser.Input.Keyboard.JustDown(keySPECIAL)) {
            this.p1Streak -= 7

        }
    }

    checkCollision(rocket, ship) {
        //simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true
            } else {
                return false
        }
    }

    
    shipExplode(ship) {
        //temporarily hide ship
        ship.alpha = 0
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode')              //play explode animation
        boom.on('animationcomplete', () => {    //callback after anim completes
            ship.reset()                        //reset ship position
            ship.alpha = 1                      //make ship visable again
            boom.destroy()                      //remove explosion sprite
        })
        //particles emition
        const emitter = this.add.particles(ship.x, ship.y, 'bit', {
            frame: 0,
            lifespan: 4000,
            speed: {min: 150, max: 250},
            scale: {start: 0.8, end: 0},
            gravityY: 150,
            blendMode: 'ADD',
            emitting: false
        })
        emitter.explode(6)

        //score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = "Score: "+this.p1Score

        this.p1Streak += 1
        this.streakLeft.text = "Streak: "+this.p1Streak

        //sound handling
        var soundNum = Phaser.Math.Between(0,3)
        if (soundNum == 0) {
            this.sound.play('sfx-explosion0')
        } else if (soundNum == 1){
            this.sound.play('sfx-explosion1')
        } else if (soundNum == 2) {
            this.sound.play('sfx-explosion2')
        } else if (soundNum == 3) {
            this.sound.play('sfx-explosion3')
        }

        //add time
        //this.clock.update(3000)

    }

    supershipExplode(ship) {
        //temporarily hide ship
        ship.alpha = 0
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explode-red').setOrigin(0,0);
        boom.anims.play('explode-red')              //play explode animation
        boom.on('animationcomplete', () => {    //callback after anim completes
            ship.reset()                        //reset ship position
            ship.alpha = 1                      //make ship visable again
            boom.destroy()                      //remove explosion sprite
        })
        //score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = "Score: "+this.p1Score

        //sound handling
        this.sound.play('sfx-explosionS')

        //particles emition
        const emitter = this.add.particles(ship.x, ship.y, 'red-bit', {
            frame: 0,
            lifespan: 4000,
            speed: {min: 150, max: 250},
            scale: {start: 0.8, end: 0},
            gravityY: 150,
            blendMode: 'ADD',
            emitting: false
        })
        emitter.explode(10)

        //add +1 to streak
        this.p1Streak += 1

        //add time
        //this.clock += 5000
    }

    
}
