//-------------------------------------------------------------------------------------------------
//  Lance Dennison
//  Rebel Patrol
//  15 hours?
//
//  Mods
//  ****
//  * Implement the speed increase that happens after 30 seconds in the original game (5)
//  * Randomize each spaceship's movement direction at the start of each play (5)
//  * Create a new scrolling tile sprite for the background (5)
//  * Allow the player to control the Rocket after it's fired (5)
//  * Display the time remaining (in seconds) on the screen (10)
//  * Implement parallax scrolling for the background (10)
//  * Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
//      * It is actually larger just because the Millenium Falcon is a bigger ship
//  * Implement a new timing/scoring mechanism that adds time to the clock for successful hits (15)
//  
//  God Tier
//  ****
//  * Added two players with improved controls + secret score multiplier (15 pls)
//      * Two player simultanious competition
//      * Player can control rocket angle and code uses sin and cosine to determine velocity
//        and the rocket gets faster over time
//      * If you do a loop, you multiply your next points x2
//        this stacks until you die or score
//  * Beautification (15 pls)
//      * New font
//      * New ship sprite
//      * New rocket sprite with traveling animation
//      * Added sprite for where rocket is fired from to make more sense
//      * New explosion animation
//      * Cute UI display on clock when time is added
//      * Cute UI display for how many points you got from a destroying a ship next to explosion
//-------------------------------------------------------------------------------------------------
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
    fontFamily: 'CustomFont',
    fontSize: '28px',
    color: '#ffffff',
    shadow: {
        color: '#4682B4',
        offsetX: 4,
        offsetY: 4,
        fill: true
    },
    align: 'right',
    padding: {
    x: 20,
    y: 5
    },
    fixedWidth: 0
}
let scoreConfig = {
    fontFamily: 'CustomFont',
    fontSize: '28px',
    color: '#ffffff',
    shadow: {
        color: '#4682B4',
        offsetX: 4,
        offsetY: 4,
        fill: true
    },
    align: 'center',
    padding: {
    x: 10,
    y: 5
    },
    fixedWidth: 100
}
let timerConfig = {
    fontFamily: 'CustomFont',
    fontSize: '40px',
    color: '#ffffff',
    shadow: {
        color: '#4682B4',
        offsetX: 4,
        offsetY: 4,
        fill: true
    },
    align: 'right',
    fixedWidth: 0
}
