class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.speedUp = false;
    }
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/ship.png');
        this.load.image('falcon', './assets/falcon.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('background', './assets/background.png');
        this.load.image('starship', './assets/starship.png');
        this.load.image('light', './assets/light.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion1.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('rocketSheet', './assets/anims/rocketSheet.png', {frameWidth: 14, frameHeight: 26, startFrame: 0, endFrame: 5});
    }
    create() {
        // place tile sprite
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);

        this.starship = this.add.image(650, 700, 'starship');

        // define keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        // add rockets
        this.p1Rocket = new Rocket(this, 598, 690, 'rocketSheet', keyA, keyD, keyW).setOrigin(0.5, 0);
        this.p2Rocket = new Rocket(this, 762, 690, 'rocketSheet', keyLEFT, keyRIGHT, keyUP).setOrigin(0.5, 0);
        this.p1Rocket.scorePlayer.x -= 25;
        this.p2Rocket.scorePlayer.x += 25;
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 10, false).setOrigin(0, 0);
        this.ship01.setDisplaySize(64, 32);
        this.ship01.setSize(64, 32);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 10, false).setOrigin(0,0);
        this.ship02.setDisplaySize(64, 32);
        this.ship02.setSize(64, 32);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10, false).setOrigin(0,0);
        this.ship03.setDisplaySize(64, 32);
        this.ship03.setSize(64, 32);
        this.falcon = new Spaceship(this, game.config.width, 0, 'falcon', 0, 40, true).setOrigin(0,0);
        this.falcon.moveSpeed += 3;
        this.ship01.reset();
        this.ship02.reset();
        this.ship03.reset();
        this.falcon.reset();
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 60
        });
        // GAME OVER flag
        this.gameOver = false;
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            if(this.p1Rocket.Score > this.p2Rocket.Score)
            {
                this.add.text(game.config.width/2, game.config.height/2 + 32, 'Player 1 Wins!', scoreConfig).setOrigin(0.5);
            }
            else if(this.p2Rocket.Score > this.p1Rocket.Score)
            {
                this.add.text(game.config.width/2, game.config.height/2 + 32, 'Player 2 Wins!', scoreConfig).setOrigin(0.5);
            }
            else if(this.p2Rocket.Score == this.p1Rocket.Score)
            {
                this.add.text(game.config.width/2, game.config.height/2 + 32, 'Tie!', scoreConfig).setOrigin(0.5);
            }
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        this.timer = this.add.text(20, 20, Math.floor(this.clock.getRemainingSeconds()), timerConfig);
    }
    update() {
        this.timer.text = Math.floor(this.clock.getRemainingSeconds());
        // check key input for restart
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.background.tilePositionX += 2;
        this.starfield.tilePositionX += 4;
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.p2Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.falcon.update();
        } 
        // check collisions
        this.checkCollision(this.p1Rocket, this.ship01);
        this.checkCollision(this.p1Rocket, this.ship02);
        this.checkCollision(this.p1Rocket, this.ship03);
        this.checkCollision(this.p2Rocket, this.ship01);
        this.checkCollision(this.p2Rocket, this.ship02);
        this.checkCollision(this.p2Rocket, this.ship03);
        this.checkCollision(this.p1Rocket, this.falcon);
        this.checkCollision(this.p2Rocket, this.falcon);
        if(!this.speedUp && this.clock.getElapsed() > 5000) {
            this.speedUp = true;
            this.ship01.moveSpeed *= 1.5;
            this.ship02.moveSpeed *= 1.5;
            this.ship03.moveSpeed *= 1.5;
            this.falcon.moveSpeed *= 1.5;
        }
    }
    checkCollision(rocket, ship) {
        // simple AABB checking
        if(rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
            rocket.score(ship);
            this.shipExplode(ship);
            rocket.reset();
        }
        else {
          return false;
        }
    }
    shipExplode(ship) {
        // add 5 seconds to the clock when ship destroyed
        this.clock.delay += 2000;
        let text = this.add.text(this.timer.x + 60, this.timer.y, "+2!", scoreConfig);
        // add a tween to fade the text away
        this.tweens.add({
            targets: text,
            alpha: 0,
            duration: 1000, // duration in milliseconds
            ease: 'Linear',
            onComplete: () => { text.destroy() } // when the tween is complete
        });
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position\
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after ani completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });
        this.sound.play('sfx_explosion');     
    }
}