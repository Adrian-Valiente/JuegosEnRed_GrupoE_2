class ContadorP2 extends Phaser.Scene {
    constructor() {
        super({ key: "ContadorP2" });

    }
    init(data) {
        this.data = data;
        this.soundManager = data.soundManager
        this.online = this.data.escena.online;
    }

    preload() {
        this.data.escena.escBU22.alpha = 1;
    }


    create() {

        this.pulsador = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 4 * 3, 'Pulsador');
        this.pulsador.displayHeight = this.pulsador.height * 0.55;
        this.pulsador.displayWidth = this.pulsador.width * 0.55;

        this.pulsadorA = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 4 * 3, 'PulsadorC').setDepth(100);
        this.pulsadorA.play('PulsadorP')

        this.pulsadorA.displayHeight = this.pulsadorA.height * 0.55;
        this.pulsadorA.displayWidth = this.pulsadorA.width * 0.55;

        this.pulsar = false




        this.cursor = this.input.keyboard.createCursorKeys();
        // ? this.keyboard = this.input.keyboard.addKeys('DOWN,RIGHT');

        // ? this.input.keyboard.on('keyup-' + 'DOWN', this.unlock.bind(this));
        // ? this.input.keyboard.on('keyup-' + 'RIGHT', this.unlock.bind(this));

        if (this.online && this.data.escena.yo.side == 2) {
            this.keyboard = this.input.stopPropagation().keyboard.addKeys('S,E');
            this.input.keyboard.on('keyup-' + 'S', this.unlock.bind(this));
            this.input.keyboard.on('keyup-' + 'E', this.unlock.bind(this));

        } else if (this.online && this.data.escena.yo.side == 1) {

            this.onMensajeHandler();
        } else {

            this.keyboard = this.input.keyboard.addKeys('DOWN');

            this.input.keyboard.on('keyup-' + 'DOWN', this.unlock.bind(this));

        }

        this.play = false;
        this.cro = 0;

        this.textoCronometro = this.add.text(32, 32).setScrollFactor(0).setFontSize(32).setColor('#ffffff').setDepth(-1);


        this.TiempoP1 = this.add.bitmapText(this.game.canvas.width * 0.46, this.game.canvas.height * 0.28 + this.game.canvas.height / 2, 'Digitalism', "00 : 00", 45);



        this.keyLock = false;

        setTimeout(() => { this.empezar() }, 1200);


    }
    unlock() {
        console.log("unlock")

        if (this.online && this.data.escena.yo.side === 2) {
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
        if (this.online) {
            if (this.data.escena.yo.side === 2) {
                if ((this.keyboard.S.isDown === true && this.keyLock === false && this.pulsar === true && this.pulsadorA.frame.name === 3)) {
                    this.keyLock = true
                    this.parar();
                    this.pintarTiempo();
                    this.pulsadorA.play('PulsadorB');

                    this.pulsar = false;

                    if (this.online && this.data.escena.yo.side === 2) {



                        var msg = {
                            tipo: "PRUEBA",
                            a: false,
                            d: false,
                            w: false,
                            s: true,
                            e: false,
                            dato: this.Marca

                        }
                        this.data.escena.handler.send(JSON.stringify(msg));
                    }

                    console.log(this.Marca)
                    if (this.Marca >= 650 && this.Marca <= 750) {
                        console.log("Has ganadoun abrazo");
                        this.completado = true
                        this.data.escena.particlesContPD.destroy();



                        if (this.Marca >= 698 && this.Marca <= 702) {
                            console.log("Practicamente clavao si no clavao")
                            this.data.escena.crearMasTP2();

                        }


                    }
                    else {
                        console.log("te toca probar de nuevo")
                    }

                    setTimeout(() => {
                        this.data.escena.escenasActivas[1] = false;
                        this.data.escena.escBU22.alpha = 0;


                        if (this.completado === true) {
                            this.data.escena.escenarios[1].completadoP2U = true;
                            this.data.escena.CoP2.destroy();
                            this.data.escena.crearPortalPulsadorP2();
                        }

                        if (this.online && this.data.escena.yo.side == 1) {

                            this.onMensajeHandler();
                        }

                        this.scene.stop(this)
                    }, 1200);

                }
            }
        } else {
            if (this.keyboard.DOWN.isDown === true && this.keyLock === false && this.pulsar === true && this.pulsadorA.frame.name === 3) {
                this.keyLock = true
                this.parar();
                this.pintarTiempo();
                this.pulsadorA.play('PulsadorB');
                this.pulsar = false;


                console.log(this.Marca)
                if (this.Marca >= 650 && this.Marca <= 750) {
                    console.log("Has ganadoun abrazo");
                    this.completado = true
                    this.data.escena.particlesContPD.destroy();



                    if (this.Marca >= 698 && this.Marca <= 702) {
                        console.log("Practicamente clavao si no clavao")
                        this.data.escena.crearMasTP2();

                    }


                }
                else {
                    console.log("Loose te toca probar de nuevo")
                }

                setTimeout(() => {
                    this.data.escena.escenasActivas[1] = false;
                    this.data.escena.escBU22.alpha = 0;


                    if (this.completado === true) {
                        this.data.escena.escenarios[1].completadoP2U = true;
                        this.data.escena.CoP2.destroy();
                        this.data.escena.crearPortalPulsadorP2();
                    }
                   


                    this.scene.stop(this)
                }, 1200);


            }

        }



    }

    empezar() {
        if (this.play == false) {
            this.emp = new Date();                      //Fecha en la que empezamos
            this.elcrono = setInterval(() => { this.tiempo() }, 10);   //Funcion temporizador cada 10 ms llama a la funcion tiempo
            this.play = true;                         //Reloj puesta en marcha
            this.soundManager.play('Reloj');                  //Sonido
        }
    }

    tiempo() {
        let actual = new Date();                    //Tiempo actual
        this.cro = actual - this.emp;                     //Tiempo transcurrido
        let cr = new Date();                        //Por si se para para continuar                        
        cr.setTime(this.cro);                        //Coje el tiempo actual
        //Transformar
        this.cs = cr.getMilliseconds();
        this.cs = this.cs / 10;
        this.cs = Math.round(this.cs);
        this.sg = cr.getSeconds();
        this.Marca = this.sg * 100 + this.cs;
        if (this.cs < 10) {
            this.cs = "0" + this.cs;
        }
        if (this.sg < 10) {
            this.sg = "0" + this.sg;
        }
        if (this.Marca < 400) {
            this.pintarTiempo();

        }
        if (this.Marca >= 400 && this.Marca <= 401) {
            this.pulsar = true;
            setTimeout(() => { this.pulsadorA.play('PulsadorC'); }, 100);
            this.TiempoP1.setText([
                "4" + " : " + "00"
            ]);
        }
    }



    pintarTiempo(sg, cs) {
        if (sg !== undefined && sg !== null) {
            if (sg <= 9) {
                this.TiempoP1.setText([
                    "0" + sg + " : " + cs
                ]);
            } else {
                this.TiempoP1.setText([
                    sg + " : " + cs
                ]);
            }
        } else {
            this.TiempoP1.setText([
                this.sg + " : " + this.cs
            ]);

        }

    }

    parar() {
        if (this.play == true) {
            clearInterval(this.elcrono);
            this.play = false;
        }
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


                // * PRUEBA

                if (message.s === true) {
                    that.parar();
                    that.Marca = message.dato;
                    let sg = Math.floor(that.Marca / 100)
                    let cg = that.Marca % 100;

                    that.pintarTiempo(sg, cg);
                    that.pulsadorA.play('PulsadorB');

                    console.log(that.Marca)
                    if (that.Marca >= 650 && that.Marca <= 750) {
                        console.log("Has ganadoun abrazo");
                        that.completado = true
                        that.data.escena.particlesContPD.destroy();



                        if (that.Marca >= 698 && that.Marca <= 702) {
                            console.log("Practicamente clavao si no clavao")
                            that.data.escena.crearMasTP2();

                        }


                    }
                    else {
                        console.log("te toca probar de nuevo")
                    }

                    setTimeout(() => {
                        that.data.escena.escenasActivas[1] = false;
                        that.data.escena.escBU22.alpha = 0;


                        if (that.completado === true) {
                            that.data.escena.escenarios[1].completadoP2U = true;
                            that.data.escena.CoP2.destroy();
                            that.data.escena.crearPortalPulsadorP2();
                        }
                        that.scene.stop(that)
                    }, 1200);

                }

            }

        }

    }


}
export default ContadorP2;