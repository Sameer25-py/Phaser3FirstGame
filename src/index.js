import Phaser from 'phaser';
import mainScene from './MainScene.js'
import vars from './vars.js'


const config = {
    type : Phaser.AUTO,
    width: vars.width,
    height: vars.height,
    autoCenter:true,
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    loader:{
        baseURL:'src/',
        path: "assets/",
        
    },

    physics:{
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: true
        }

    },
    scene: [mainScene]
}

var game = new Phaser.Game(config)


