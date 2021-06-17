class CharacterSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        this.setScale(2);
        scene.physics.world.enableBody(this);
        this.body.onWorldBounds=true;
        this.setImmovable(true);
    }
}
export default CharacterSprite;