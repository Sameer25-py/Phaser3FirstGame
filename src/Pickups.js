import Phaser from 'phaser'

class Pickup extends Phaser.Physics.Arcade.Group{
    constructor(obj){
        super(obj.world,obj.scene)
        this.createMultiple({
            key:obj.key,
            repeat:obj.repeat,
            setXY: {x: obj.x,y: obj.y,stepX: obj.stepX}
        },true)
        obj.world.enable(this)
        
        this.children.iterate(child=>{
            child.setBounce(Phaser.Math.FloatBetween(0.2,0.4))
        })   
    }

    resetStars(){
        this.children.iterate(child=>{
            child.enableBody(true,child.x,0,true,true)
        })
    }
    
    
}
export default Pickup