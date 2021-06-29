import Phaser from 'phaser'

class Bomb extends Phaser.Physics.Arcade.Group{
    constructor(obj){
        super(obj.world,obj.scene)
        this.world = obj.world
    }

    spawnBomb(){
        var bomb = this.create(Phaser.Math.Between(20,780),20,'bomb')
        bomb.setBounce(1)
        bomb.setCollideWorldBounds(true)
        bomb.setVelocity(Phaser.Math.Between(-200,200),20)
        this.world.enable(bomb)
    }

}

export default Bomb