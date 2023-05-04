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
// set text configs
let menuConfig = {
    //fontFamily: 'StarJedi',
    fontSize: '28px',
    color: '#ffffff',
    align: 'right',
    padding: {
    x: 20,
    y: 5
    },
    fixedWidth: 0
}
let scoreConfig = {
    //fontFamily: 'StarJedi',
    fontSize: '28px',
    color: '#ffffff',
    align: 'right',
    padding: {
    x: 10,
    y: 5
    },
    fixedWidth: 100
}
let timerConfig = {
    //fontFamily: 'StarJedi',
    fontSize: '28px',
    // shadow: {
    //     color: '#ffffff'
    // },
    color: '#ffffff',
    align: 'right',
    padding: {
    x: 10,
    y: 5
    },
    fixedWidth: 100
}
