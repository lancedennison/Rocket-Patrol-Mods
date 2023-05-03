// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, key1, key2, key3, frame) {
        super(scene, x, y, texture, frame);
        // add object to existing scene
        scene.add.existing(this);
        this.setSize(8, 8);
        this.setDisplaySize(14, 26);
        this.isFiring = false;
        this.moveSpeed = 2;
        this.acceleration = 0;
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
        this.orign = {
            x: this.x,
            y: this.y
        };
        this.key = {
            L: key1,
            R: key2,
            F: key3
        };
        this.change = 0;
        this.scoreMultiplier = 1;
        this.points = 10;
        this.create();
    }
    create() {
        // initialize score
        this.Score = 0;
        this.scorePlayer = this.scene.add.text(this.orign.x - 50, borderUISize, this.Score, scoreConfig);
        this.anims.create({
            key: 'shoot',
            frames: this.anims.generateFrameNumbers('rocketSheet', { start: 1, end: 5, first: 1}),
            frameRate: 60
        });
    }
    update() {
        if(this.isFiring)
        {
            this.anims.play('shoot', true);
            if(this.key.L.isDown)
            {
                this.angle -= 5;
                this.change -= 5;
            }
            else if(this.key.R.isDown)
            {
                this.angle += 5;
                this.change += 5;
            }
            if(this.change > 350 || this.change < -350)
            {
                this.scoreMultiplier *= 2;
                this.change = 0;
            }
        }
        // fire button
        if(Phaser.Input.Keyboard.JustDown(this.key.F) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
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
    }
    reset() {
        this.isFiring = false;
        this.x = this.orign.x;
        this.y = this.orign.y;
        this.rotation = 0;
        this.acceleration = 0;
        this.moveSpeed = 2;
        this.change = 0;
        this.scoreMultiplier = 1;
    }
    score(ship) {
        this.Score += (ship.points * this.scoreMultiplier);
        this.scorePlayer.text = this.Score;
    }
}