class Victoria extends Phaser.Scene {
    constructor() {
        super({ key: "Victoria" });

    }
    init(data) {
        this.data = data;
        this.soundManager = data.soundManager
        this.ganador = data.ganador
        this.online = this.data.online;


    }

    preload() {

    }


    create() {

        let victoria = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, 'Victoria');
        victoria.displayHeight = this.game.canvas.height
        victoria.displayWidth = this.game.canvas.width;

        if (this.ganador === 1) {
            console.log("Ha ganado el jugador 1")
            this.texto = this.add.text(this.game.canvas.width / 2 - 500, this.game.canvas.height / 2).setScrollFactor(0).setFontSize(75).setColor("#000000");
            this.texto.setText("Ganador " + this.data.nameP1);
        }
        if (this.ganador === 2) {
            console.log("Ha ganado el jugador 2")
            this.texto = this.add.text(this.game.canvas.width / 2 - 500, this.game.canvas.height / 2).setScrollFactor(0).setFontSize(75).setColor("#000000");
            this.texto.setText("Ganador " + this.data.nameP2);
        }

        if (this.online) {
            this.writeHistorial();
        } else {
            console.log("No se guarda");
            setTimeout(() => {
                this.scene.start("MAINMENU", { escena: null, soundManager: this.soundManager });
            }, 3000)
        }


    }
    unlock() {

    }


    update() {


    }


    writeHistorial() {

        let Mensaje;
        var date = new Date;


        if (this.ganador === 1) {
            Mensaje = (date.getDate() + "/" + (date.getMonth() + 1) + " | " + "Ha ganado el jugador : " + this.data.nameP1 + " con un tiempo de: " + this.data.tiempoP1.mn + " : " + this.data.tiempoP1.sg + " : " + this.data.tiempoP1.cs);
        } else {
            Mensaje = (date.getDate() + "/" + (date.getMonth() + 1) + " | " + "Ha ganado el jugador : " + this.data.nameP2 + " con un tiempo de: " + this.data.tiempoP2.mn + " : " + this.data.tiempoP2.sg + " : " + this.data.tiempoP2.cs);
        }


        this.sendHistorail(() => { console.log("Todo enviado") }, Mensaje)

    }


    sendHistorail(callback, mensaje) {
        var that = this;
        $.ajax({
            method: "POST",
            url: 'http://localhost:8080/historial/fileWrite',
            data: mensaje,
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function () {
            if (typeof callback !== 'undefined') {
                callback(mensaje)
                setTimeout(() => {
                    that.scene.start("MAINMENU", { escena: null, soundManager: that.soundManager });
                }, 3000)
            }
        }).fail(() => {
            alert("Los servidores no se encuentran disponibles, No se ha podido guardar los resultados");
            this.scene.start("MAINMENU", { escena: null, soundManager: that.soundManager });
        })
    }
}
export default Victoria;