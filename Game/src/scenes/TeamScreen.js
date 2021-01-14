class TeamScreen extends Phaser.Scene {
    constructor() {
        super({ key: "TeamScreen" });

    }
    init(data) {
        this.data = data;
        this.soundManager = data.soundManager
        
    }

    preload() {
     
    }


    create() {
        let fondo=this.add.image(0,0,"Presentacion_3").setOrigin(0,0)
        fondo.displayHeight=this.game.canvas.height;
        fondo.displayWidth=this.game.canvas.width;

        

        this.cameras.main.once('camerafadeincomplete', ()=>{this.iniciar();});

        this.cameras.main.fadeIn(4000);

        this.input.keyboard.once('keyup',()=>{this.scene.start("MAINMENU", { escena: null, soundManager: this.soundManager })})

    }
    iniciar(){
        setTimeout(()=>{this.scene.start("MAINMENU", { escena: null, soundManager: this.soundManager })},2000)
        
    }
    


}
export default TeamScreen;