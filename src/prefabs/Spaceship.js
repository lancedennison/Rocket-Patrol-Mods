// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x ,y ,texture, frame, pointValue, randY) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.points = pointValue;   // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed;         // pixels per frame
        this.rand = randY
        this.flipped = false;
    }

    update() {
        // move spaceship left
        this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        if(!this.flipped && this.x <= 0 - this.width) {
            this.reset();
        }
        else if(this.flipped && this.x > game.config.width + this.width) {
            this.reset();
        }
    }
    // position reset
    reset() {
        this.x = game.config.width;
        this.flipped = Math.round((Math.random())) == 1;
        if(this.flipped)
        {
            this.x = 0 - this.width;
            this.flipX = true;
            this.moveSpeed = Math.abs(this.moveSpeed) * -1;
        }
        else
        {
            this.flipX = false;
            this.moveSpeed = Math.abs(this.moveSpeed);
        }
        if(this.rand) {
            this.y = (Math.random() * 600) + 20;
        }

    }
}