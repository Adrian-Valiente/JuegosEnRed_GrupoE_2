class CintaP1V2 extends Phaser.Scene {
    constructor() {
        super({ key: "CintaP1V2" });

    }
    init(data) {
        this.data = data;
        this.soundManager = data.soundManager
        this.online = this.data.escena.online;
    }

    preload() {
        this.data.escena.blurGU.alpha = 1;
    }


    create() {


        console.log("Se iniciaaaaa")


        this.cinta = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 4, 'CintaA');
        this.cinta.play('CintaA');
        this.cinta.displayHeight = this.cinta.height * 0.55
        this.cinta.displayWidth = this.cinta.width * 0.55



        this.keyboard = this.input.stopPropagation().keyboard.addKeys('A,D,E');




        this.input.keyboard.on('keyup-' + 'A', this.unlock.bind(this));
        this.input.keyboard.on('keyup-' + 'D', this.unlock.bind(this));
        this.teclado = new Array();

        this.contF = 0;
        this.puntuacion = 0;
        this.keyLock = false;
        this.tope = 50;
        this.texto = this.add.text(this.game.canvas.width / 2 - 30, 75).setScrollFactor(0).setFontSize(21).setColor('#2874A6');
        this.keyLock = false;

        if (this.online && this.data.escena.yo.side == 2) {
            this.onMensajeHandler()
        }


    }
    unlock() {
        console.log("unlock")

        if (this.online) {
            var msg = {
                tipo: "PRUEBA",
                a: false,
                d: false,
                w: false,
                s: false,
                e: false

            }
            this.data.escena.handler.send(JSON.stringify(msg));
        }
        this.keyLock = false;
    }


    update() {


        if (this.online && this.data.escena.yo.side == 1) {
            if (this.keyboard.A.isDown == true && this.keyLock == false) {

                this.keyLock = true;
                this.teclado.push('A');

                if (this.online) {
                    var msg = {
                        tipo: "PRUEBA",
                        a: true,
                        d: false,
                        w: false,
                        s: false,
                        e: false

                    }
                    this.data.escena.handler.send(JSON.stringify(msg));
                }
            }
            if (this.keyboard.D.isDown == true && this.keyLock == false) {
                this.keyLock = true;
                this.teclado.push('D');

                if (this.online) {
                    var msg = {
                        tipo: "PRUEBA",
                        a: false,
                        d: true,
                        w: false,
                        s: false,
                        e: false

                    }
                    this.data.escena.handler.send(JSON.stringify(msg));
                }

            }
        } else if (this.online === null || !this.online || this.online === undefined) {
            if (this.keyboard.A.isDown == true && this.keyLock == false) {

                this.keyLock = true;
                this.teclado.push('A');


            }
            if (this.keyboard.D.isDown == true && this.keyLock == false) {
                this.keyLock = true;
                this.teclado.push('D');



            }

        }

        //Salir prueba

        /*
        if (this.keyboard.E.isDown === true) {

            this.data.escena.escenasActivas[this.data.id] = false;
            this.data.escena.blurGU.alpha = 0;
            this.scene.stop(this);
        }
        //*/


        if (this.teclado[0] == 'A' || this.teclado[0] == 'D') {

            if (this.ultimaL != this.teclado[0]) {

                this.cinta.setFrame(this.contF)
                this.contF++;
                this.puntuacion++;


                this.soundManager.play('Paso1');

                if (this.contF >= 3)
                    this.contF = 0;
            } if (this.ultimaL == 'A' && this.teclado[0] == 'A') {

                this.cinta.setFrame(3);
                this.puntuacion = 0;
            }
            if (this.ultimaL == 'D' && this.teclado[0] == 'D') {
                this.cinta.setFrame(3);
                this.puntuacion = 0;

            }
            this.ultimaL = this.teclado.shift();
            this.teclaChupa = this.teclado[0];

        }
        if (this.puntuacion >= this.tope) {

            this.data.escena.escenasActivas[0] = false;
            this.data.escena.blurGU.alpha = 0;
            this.data.escena.escenarios[0].completadoP1D = true;
            this.data.escena.particlesCPU.destroy()
            this.data.escena.CP1.destroy()
            this.data.escena.crearRayosP1()
            if (this.data.escena.online) {

                if  (this.online && this.data.escena.yo.side == 2) {
                    this.data.escena.onMensajeHandler();

                }
            }



            console.log("Saliendo")
            this.scene.stop(this);
        }
        //console.log(this.keyLock)
        this.texto.setText([this.puntuacion + '/' + this.tope])
    }


    onMensajeHandler() {
        var that = this;
        this.data.escena.handler.onmessage = function (msg) {

            var message = JSON.parse(msg.data)
            //console.log("message, "+ message.tipo ,message);
            if (message.tipo === "POSICION") {
                that.data.escena.PlayerPositionMnj(message);
            } else if (message.tipo === "BOTONES") {
                that.data.escena.playerPulseMnj(message);
            } else if (message.tipo === "EVENTOS") {
                that.data.escena.gameEventMnj(message);
            } else if (message.tipo === "PRUEBA") {

                if (message.a === true) {
                    console.log("AAAAAAA")
                    that.teclado.push('A');
                }
                if (message.d === true) {
                    that.teclado.push('D');
                }
            }

        }


    }





}
export default CintaP1V2;