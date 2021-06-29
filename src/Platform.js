import Phaser from 'phaser'

class Platform extends Phaser.Physics.Arcade.StaticGroup{
    constructor(obj){
        super(obj.world,obj.scene)
        let platforms = obj.platforms
        
        for(let p of platforms){
            this.create(p.x,p.y,p.key).setScale(p.scale).refreshBody()
        }
        
        obj.world.enable(this)
    }

    
}

export default Platform