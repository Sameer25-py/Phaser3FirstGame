import Phaser from 'phaser';
import vars from './vars.js'
import Player from './Player.js'
import Platform from './Platform.js';
import Pickup from './Pickups.js';
import Text from './Text.js'
import Bomb from './Bomb.js'

const center_x = vars.width/2
const center_y = vars.height/2
var cursors,player
var score = 0


function updateScore(p,s,scoreBar,starGroup,bombGroup){
    s.disableBody(true,true)
    scoreBar.setText('Score:' + ++score)
    if(!starGroup.countActive(true)){
        starGroup.resetStars()
        
        //spawn a bomb
        bombGroup.spawnBomb()
    }

}

class MainScene extends Phaser.Scene{
    constructor(){
        super('MainScene')
    }

    preload(){
        this.load.image('sky',"sky.png")
        this.load.image('star','star.png')
        this.load.image('platform','platform.png')
        this.load.spritesheet('player', 'dude.png',{ frameWidth: 32, frameHeight: 48})
        this.load.image('bomb','bomb.png')
    }
    create(){
        
        this.add.image(center_x,center_y,'sky')
        
        //adding static platformGroup
        this.platformGroup = new Platform({
            "platforms":[
                {
                    x:center_x,
                    y:center_y+270,
                    key:'platform',
                    scale:2

                },
                {
                    x:center_x + 200,
                    y:center_y + 150,
                    key:'platform'

                },
                {
                    x:50,
                    y:center_y,
                    key:'platform'
                },
                {
                    x:center_x + 300,
                    y:center_y - 50,
                    key:'platform'
                }
            ],
            "world":this.physics.world,
            "scene":this

        })
        
        //add player container
        player = new Player({
            x: 0,
            y: center_y + 100,
            key:'player',
            scene:this,
            world:this.physics.world,
            bounce:0.2
        })
        //add stars
        this.starGroup = new Pickup({
            world:this.physics.world,
            scene:this,
            repeat:5,
            x:12,
            y:0,
            stepX:70,
            key:'star',
        })

        //adding bombs
        this.bombGroup = new Bomb({world:this.physics.world,scene:this})

        //adding collider b/w stars and platforms
        this.physics.add.collider(this.starGroup,this.platformGroup)

        //creating input key objects
        cursors = this.input.keyboard.createCursorKeys()

        //binding player animations
            this.anims.create({
            key: 'move_left', //left walk anim
            frames: this.anims.generateFrameNumbers('player',{start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'turn', //90deg turn anim
            frames: [{key: 'player', frame:4}],
            frameRate:20
        })

        this.anims.create({
            key: 'move_right', //right walk anim
            frames: this.anims.generateFrameNames('player',{start: 5,end: 8}),
            frameRate: 10,
            repeat: -1
        })
        
        this.anims.create({
            key:'jump_left', //jumping while moving left anim
            frames: [{key:'player',frame:1}],
            frameRate: 1,
            repeat: -1
        })

        this.anims.create({
            key: 'jump_right', //jumping while moving right anim
            frames: [{key: 'player', frame : 6}],
            frameRate: 1,
            repeat: -1
        })

        //adding collider b/w platforms and player
        this.physics.add.collider(player,this.platformGroup)

        //adding scoreBar
        this.scoreBar = new Text({scene:this,x:16,y:16,string:'score: 0',style:{fontSize: '32px',fill: '#000' }})
         
        //adding collider b/w stars and player
        this.physics.add.overlap(player,this.starGroup,(p,s)=>{
            updateScore(p,s,this.scoreBar,this.starGroup,this.bombGroup)
        })

        //adding collider b/w bomb and platforms
        this.physics.add.collider(this.bombGroup,this.platformGroup)

        //adding collider b/w bomb and player
        this.physics.add.collider(player,this.bombGroup,(p,b)=>{
            p.kill()
            
            //restart scene
            this.time.addEvent({
                delay:1500,
                callback: this.scene.restart,
                loop: false
            })
        })

    }
    update(){
        player.update(cursors)

    }   
}


export default MainScene