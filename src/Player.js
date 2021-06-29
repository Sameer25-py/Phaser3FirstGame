import Phaser, { Physics } from 'phaser'
var jump_counter = 0
const jumps = 2
const velocity = 150
const gravity = 300

class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(obj){
        super(obj.scene,obj.x,obj.y,obj.key)
        obj.scene.add.existing(this)
        obj.world.enable(this)
        this.body.setBounce(obj.bounce)
        this.body.setCollideWorldBounds(true)
        this.body.setGravityY(gravity)
        this.scene = obj.scene
    }
    update(cursors){
        //this movement controller
        if(this.body.touching.down) jump_counter = 0
        
        //movement
        if(cursors.left.isDown){
            if (this.body.touching.down) //checking whether the this in jump state
                this.anims.play('move_left',true)
            else this.anims.play('jump_left',true)
            
            this.setVelocityX(-velocity)  //horizontal velocity
        }
        else if(cursors.right.isDown){
            if (this.body.touching.down) //checking whether the this in jump state
                this.anims.play('move_right',true)
            else this.anims.play('jump_right',true)
            
            this.setVelocityX(velocity) //horizontal velocity
        }
        else{
            this.anims.play('turn',true) //idle animation
            this.setVelocityX(0)  
        }
        var canDoubleJump = jump_counter < jumps
        //jump
        if (Phaser.Input.Keyboard.JustDown(cursors.up) && (this.body.touching.down || canDoubleJump)){
            if (this.anims.currentAnim.key == 'move_left')
                this.anims.play('jump_left',true)                    //checking which side this is facing
            else if(this.anims.currentAnim.key == 'move_right')  
                this.anims.play('jump_right',true)  
            
            jump_counter+=1
            this.setVelocityY(-velocity*2.3) //vertical velocity
        } 
        
        
    }
    kill(){
        this.scene.physics.pause()
        this.setTint(0xff0000)
        this.anims.play('turn')
    }
}

export default Player