class Historial extends Phaser.Scene {
    constructor() {
        super({ key: "Historial" });

    }
    init(data) {
        this.soundManager = data.soundManager
    }

    preload() {
        
        this.load.html('Historial', './API/historial.html');
    }


    create() {

        let bc = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, 'Victoria').setDepth(-100);
        this.soundManager.play('Musica_fondo', { loop: true })
        let salirB = this.add.sprite(200, 10, "buttonPlay");
        salirB.setFrame(0);
        
        salirB.setScale(0.5, 0.75);
        salirB.setOrigin(0.48, -0.1);
        salirB.setInteractive();

        salirB.on("pointerover", () => {
            salirB.setFrame(1);
        })

        salirB.on("pointerout", () => {
            salirB.setFrame(0);
        })

        salirB.on("pointerdown", () => {
            salirB.setFrame(2);
        })

        salirB.on("pointerup", () => {
            salirB.setFrame(0);
            this.scene.stop("Historial")
            this.scene.start("MAINMENU", { escena: null, soundManager: this.soundManager });
        })

        this.historial = this.add.bitmapText(salirB.x - 50, salirB.y + 20, "MotionControl", "", -60);
        this.historial.setText("Salir");
        this.historial.tint="#000000";

        //salir.x - 53, salir.y - 35, "MotionControl", "", -60



        var that = this;
    
        console.log("CHAT")

        this.historial = this.add.dom(500, 350).createFromCache('Historial');



        that.getHistorial((mensajes) => {
            that.escribirHistorial(mensajes, () => { console.log("Historial escrito") })

        })
    }



    update() {

    }


    //FUNCIONES DE TODA ESTA COSA
    //Metodos Get//



    getHistorial(callback) {
        $.ajax({
            url: 'https://guindereis-server-final.herokuapp.com/historial/fileRead',

        }).done(function (mensajes) {
            console.log("Chat conseguido", callback)
            if (typeof callback !== 'undefined') {
                callback(mensajes)
            }
        })
    }



    //Funciones de apoyo


    escribirHistorial(mensajes, callback) {
        let test = this.historial.getChildByID('historial');
        $(test).empty();
        console.log("Antes del for")

        let index = mensajes.length - 1
        console.log(index + " tamaño mensajes: " + mensajes.length)
        for (index; index >= 0; index--) {

            $("#historial").append("<p>" + mensajes[index] + "</p>");
        }
        if (typeof callback !== 'undefined') {
            callback()
        }


    }






}
export default Historial;