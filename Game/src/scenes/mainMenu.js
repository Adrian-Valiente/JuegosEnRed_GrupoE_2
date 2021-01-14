
const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;


class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: "MAINMENU" });
    }
    preload() {

    }
    init(data) {
        this.soundManager = data.soundManager
        console.log(this.soundManager)
    }
    create() {


        


        var that = this;

        let bg = this.add.image(0, 0, "menu").setOrigin(0, 0);
        bg.displayWidth = this.game.canvas.width;
        bg.displayHeight = this.game.canvas.height;
        //let container= document.getElementsByClassName('animated-button1');

        this.soundManager.play('Musica_fondo')

        //container.addEventListener('click',()=>{});
        //container.setOrigin(0,0);


        let hoverSprite = this.add.sprite(100, 100, "FlagSheet2");
        hoverSprite.setVisible(false);
        hoverSprite.setScale(0.80);

        //Bonton jugar
        let pb2 = this.add.sprite(200, 260, "buttonPlay");
        pb2.setFrame(0);
        //pb2.setScale(0.75);
        pb2.setScale(0.75);
        pb2.setOrigin(0.48, -0.1);
        pb2.setInteractive();

        pb2.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play("wave");
            hoverSprite.x = pb2.x + 10;
            hoverSprite.y = pb2.y - 40;
            pb2.setFrame(1);

        })

        pb2.on("pointerout", () => {
            hoverSprite.setVisible(false);
            pb2.setFrame(0);

        })

        pb2.on("pointerup", () => {
            /*this.scene.transition({
                target: "Scene_Play",
                duration:3000
            })*/
            //this.scene.sleep("MAINMENU")
            this.scene.start("SelectorDePartidas", { escena: null, soundManager: this.soundManager });
        })

        pb2.on("pointerdown", () => {
            pb2.setFrame(2);
        })

        this.playT = this.add.bitmapText(pb2.x - 50, pb2.y + 17 , "MotionControl", "", -60);
        this.playT.setText("Jugar");
        this.playT.tint = "#000000";


        //let soundM=this.add.sprite(950, 75, "Mute");
        //let pb= this.add.image(this.sys.game.canvas.width/2,this.sys.game.canvas.height/2,"playButton");

        //soundM.setScale(0.45);
        //soundM.setInteractive();

        //Boton como jugar

        let pbCM = this.add.sprite(200, 360, "buttonPlay");
        pbCM.setFrame(0);
        pbCM.setScale(0.75);
        pbCM.setOrigin(0.48, -0.1);
        pbCM.setInteractive();

        pbCM.on("pointerover", () => {
            pbCM.setFrame(1);
        })

        pbCM.on("pointerout", () => {
            pbCM.setFrame(0);
        })

        pbCM.on("pointerdown", () => {
            pbCM.setFrame(2);
        })

        pbCM.on("pointerup", () => {
            pbCM.setFrame(0);
            //this.scene.sleep("MAINMENU")
            this.scene.start("Tutorial", { escena: null, soundManager: this.soundManager });
        })

        this.cjT = this.add.bitmapText(pbCM.x - 111, pbCM.y + 20,  "MotionControl", "", -60);
        this.cjT.setText("Cómo Jugar");
        this.cjT.tint = "#000000";

        

        

        //Boton Score
        let botonHistorial = this.add.sprite(200, 460, "buttonPlay");
        botonHistorial.setFrame(0);
        botonHistorial.setScale(0.75);
        botonHistorial.setOrigin(0.48, -0.1);
        botonHistorial.setInteractive();

        botonHistorial.on("pointerover", () => {
            botonHistorial.setFrame(1);
        })

        botonHistorial.on("pointerout", () => {
            botonHistorial.setFrame(0);
        })

        botonHistorial.on("pointerdown", () => {
            botonHistorial.setFrame(2);
        })

        botonHistorial.on("pointerup", () => {
            botonHistorial.setFrame(0);
            this.scene.sleep("MAINMENU")
            this.scene.start("Historial", { escena: null, soundManager: this.soundManager });
        })

        this.historial = this.add.bitmapText(botonHistorial.x - 85, botonHistorial.y + 23, "MotionControl", "", -60);
        this.historial.setText("Historial");
        this.historial.tint = "#000000";

        






        //Boton sonido
        let pbCG = this.add.sprite(200, 560, "buttonPlay");
        pbCG.setFrame(0);
        pbCG.setScale(0.75);
        pbCG.setOrigin(0.48, -0.1);
        pbCG.setInteractive();

        pbCG.on("pointerover", () => {
            pbCG.setFrame(1);
        })

        pbCG.on("pointerout", () => {
            pbCG.setFrame(0);
        })

        pbCG.on("pointerdown", () => {
            pbCG.setFrame(2);
        })

        pbCG.on("pointerup", () => {
            pbCG.setFrame(0);
            //CODIGO MENU
            let pause = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, "sonido");
            pause.displayHeight = this.game.canvas.height * 0.85;
            pause.displayWidth = this.game.canvas.width * 0.65;

            let salir = this.add.image(this.game.canvas.width / 2 - 200, this.game.canvas.height * 0.5 - 200, "buttonPlay");
            salir.displayHeight = this.game.canvas.height * 0.1;
            salir.displayWidth = this.game.canvas.width * 0.2;
            salir.setInteractive();

            salir.on("pointerover", () => {
                salir.setFrame(1);
            })

            salir.on("pointerout", () => {
                salir.setFrame(0);
            })

            salir.on("pointerdown", () => {
                salir.setFrame(2);
            })

            let textoSalir = this.add.bitmapText(salir.x - 53, salir.y - 35, "MotionControl", "", -60);
            textoSalir.setText("Salir");
            textoSalir.tint = "#000000";

            



            var print0 = this.add.text(this.game.canvas.width / 2 - 75, this.game.canvas.height / 2 - 100, '').setFontSize(45);
            //this.cambiarSonido();
            //var cambiar= this.cambiarSonido;
            //cambiar();

            let form = "<input type=\"range\" min=\"1\" max=\"100\" value=\"50\"  id=\"myRange\">"
            var Slider = this.add.dom(this.game.canvas.width / 2, this.game.canvas.height / 2).createFromHTML(form)
            $('#myRange').change(function (e) {
                let valor = e.currentTarget.valueAsNumber;
                let newValue = valor / 100;
                that.cambiarSonido(newValue);
                print0.text = newValue;

            });

            salir.on("pointerup", () => {
                salir.destroy();
                pause.destroy();
                textoSalir.destroy();
                print0.text = ''
                Slider.destroy();
            })



        })

        this.cjCF = this.add.bitmapText(pbCG.x - 63, pbCG.y + 20, "MotionControl", "", -60);
        this.cjCF.setText("Sonido");
        this.cjCF.tint="#000000";

        



    }

    cambiarSonido(value) {
        console.log(value);
        this.soundManager.volume = value;
        this.soundManager.resumeAll();

    }


}
export default MainMenu;