//Supership prefab
class Supership extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)        //ad to existing scene
        this.points = pointValue        //store pointValue
        this.moveSpeed = game.settings.supershipSpeed              //spupership speed in pixels/frame
        this.lanes = [borderUISize*6 + borderPadding*4, borderUISize*5 + borderPadding*2,  borderUISize*4]
    }

    update() {
        //move spaceship left
        this.x -= this.moveSpeed

        //wrap from left to right edge
        if(this.x <= 0 - this.width) {
            this.x = game.config.width *10
            this.y = this.lanes[Phaser.Math.Between(0,2)]
        }
    }

    //reset position
    reset() {
        this.x = game.config.width*10
    }
}