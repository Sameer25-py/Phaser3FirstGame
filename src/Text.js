import Phaser from 'phaser'

class Text extends Phaser.GameObjects.Text{
    constructor(obj){
        super(obj.scene,obj.x,obj.y,obj.string,obj.style)
        obj.scene.add.existing(this)
    }
    
}

export default Text