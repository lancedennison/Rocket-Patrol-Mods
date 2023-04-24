// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        // add object to existing scene
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 2;
        this.acceleration = 0;
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update() {
        if(this.isFiring)
        {
            if(keyLEFT.isDown)
            {
                //this.x -= this.moveSpeed/2;
                this.angle -= 5;
            }
            else if(keyRIGHT.isDown)
            {
                //this.x += this.moveSpeed/2;
                this.angle += 5;
            }
        }
        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
            this.acceleration = 0;
        }
        // if fired, move up
        if(this.isFiring) {
            this.moveSpeed += this.acceleration;
            this.acceleration += 0.001;
            this.x += this.moveSpeed * Math.cos((this.angle - 90)*Math.PI/180);
            this.y += this.moveSpeed * Math.sin((this.angle - 90)*Math.PI/180);
        }
        // reset on miss
        if(this.y <= borderUISize * 3 - 100 || this.y >= game.config.height + 100) {
            this.reset();
        }
        if(this.x <= - 100 || this.x >= game.config.width + 100) {
            this.reset();
        }
        //this.p1Rocket.update();
    }
    reset() {
        this.isFiring = false;
        this.x = game.config.width/2
        this.y = game.config.height - borderUISize - borderPadding;
        this.rotation = 0;
        this.acceleration = 0;
        this.moveSpeed = 2;
    }
}