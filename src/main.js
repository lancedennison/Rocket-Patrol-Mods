let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    pixelArt: true,
    // Sets game scaling
    scale: {
        // Fit to window
        mode: Phaser.Scale.FIT,
        // Center vertically and horizontally
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
// reserve keyboard vars
let keyR, keyLEFT, keyRIGHT, keyUP, keyA, keyD, keyW;
let scoreConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    backgroundColor: '#F3B141',
    color: '#843605',
    align: 'right',
    padding: {
    top: 5,
    bottom: 5,
    },
    fixedWidth: 100
}
