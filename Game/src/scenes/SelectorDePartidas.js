class SelectorDePartidas extends Phaser.Scene {
    constructor() {
        super({ key: "SelectorDePartidas" });

    }
    init(data) {
        this.soundManager = data.soundManager
    }

    preload() {

        this.load.html('Partidas', './API/partidas.html');
    }


    create() {


        let bc = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, 'Victoria').setDepth(-100);
        this.soundManager.play('Musica_fondo', { loop: true })
        let lobbyTxt = this.add.bitmapText(this.game.canvas.width / 2 - 90, 140, 'MotionControl', "Lobby", -70);
        lobbyTxt.tint = "#000000";

        let salirB = this.add.sprite(200, 30, "buttonPlay");
        salirB.setFrame(0);
        salirB.setScale(0.6, 0.6);
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
            this.borrarIntervalos();
            this.scene.stop("SelectorDePartidas")
            this.scene.start("MAINMENU", { escena: null, soundManager: this.soundManager });
        })


        let actualizar = this.add.sprite(2000, 10, "buttonPlay");
        actualizar.setFrame(0);
        actualizar.setScale(0.75);
        actualizar.setOrigin(0.48, -0.1);
        actualizar.setInteractive();

        actualizar.on("pointerover", () => {
            actualizar.setFrame(1);
        })

        actualizar.on("pointerout", () => {
            actualizar.setFrame(0);
        })

        actualizar.on("pointerdown", () => {
            actualizar.setFrame(2);
        })
        //Al presionar actualizar, si hay algún jugador dentro de una partida, se suma 1 al número de jugadores
        actualizar.on("pointerup", () => {
            actualizar.setFrame(0);

            that.getPartidas((partidas) => {
                that.mostarPartidas(partidas, () => { console.log("Partidas mostradas") })
            })

        })



        let salir = this.add.bitmapText(salirB.x - 55, salirB.y + 10, "MotionControl", "Salir", -60);
        salir.tint = "#000000";


        let act = this.add.text(actualizar.x - 130, actualizar.y + 30).setScrollFactor(0).setFontSize(45).setColor("#000000");
        act.setText("Actualizar");


        var that = this;

        this.arrayPartidas;

        //Cargamos HTML "partidas.html" y se superpone sobre el canvas
        this.partidas = this.add.dom(320, 350).createFromCache('Partidas');
        //Pide las partidas creadas en el servidor y las muestra en el div de "partidas.html"
        refrescarLobby();


        let offLineBoton = this.add.sprite(880, 30, "buttonPlay");
        offLineBoton.setFrame(0);
        offLineBoton.setScale(0.6);
        offLineBoton.setOrigin(0.48, -0.1);
        offLineBoton.setInteractive();

        offLineBoton.on("pointerover", () => {
            offLineBoton.setFrame(1);
        })

        offLineBoton.on("pointerout", () => {
            offLineBoton.setFrame(0);
        })

        offLineBoton.on("pointerdown", () => {
            offLineBoton.setFrame(2);
        })

        offLineBoton.on("pointerup", () => {
            offLineBoton.setFrame(0);
            this.borrarIntervalos();
            this.scene.start("Lobby", { escena: null, soundManager: this.soundManager });

        })

        let offLineTexto = this.add.bitmapText(offLineBoton.x - 105, offLineBoton.y + 15, 'MotionControl', "Jugar Offline", -50);
        offLineTexto.tint = "#000000";




        function refrescarLobby() {
            that.getPartidas((partidas) => {
                that.mostarPartidas(partidas, () => {
                    console.log("Partidas mostradas")
                    setTimeout(() => {
                        refrescarLobby();
                    }, 1000)
                })
            })
        }




    }



    update() {

    }


    //FUNCIONES DE TODA ESTA COSA
    //Metodos Get//



    //Método GET para cargar todas las partidas del servidor (getPartidas() en PartidaController.java)
    getPartidas(callback) {
        var that = this;
        $.ajax({
            url: 'http://localhost:8080/partida/',

        }).done(function (partidas) {
            console.log(partidas);
            //crea las partidas en el servidor

            if (typeof callback !== 'undefined') {
                callback(partidas)
            }
        }).fail(() => {
            //Si el servidor no está disponible, mandamos mensaje
            callback()
            $("#partidas").empty();
            $("#partidas").append("<p>El servidor no esta disponible</p>");

        })
    }

    //Funciones de apoyo

    //El jugador puede ver las partidas disponibles en el div de partidas.html
    mostarPartidas(partidas, callback) {
        var that = this
        this.arrayPartidas = partidas;
        console.log("Monstrando partidas", partidas)
        let test = this.partidas.getChildByID('partidas');
        console.log(partidas)
        $(test).empty();
        if (typeof partidas === 'undefined') {
            $("#partidas").append("<p>Los servidores no se encuentran disponibles</p>")
            if (typeof callback !== 'undefined') {
                callback()
            }

        } else {

            //Se añaden partidas al div junto a un botón para unirse
            for (let index = 0; index < partidas.length; index++) {

                $("#partidas").append("<p>" + partidas[index].nombre + ", Jugadores : " + partidas[index].num + "/2 </p>" +
                    "<input type=\"button\" value=\"Unirse" + "\" id=\"bp" + partidas[index].id + "\" class=\"botonJoin\">")
            }
            if (typeof callback !== 'undefined') {
                callback()
            }
            //Asigna a cada botón un "onclick" para meter a los jugadores en cada lobby correspondiente
            this.funcionBotones();


        }

    }


    //Función que aumenta el número de jugadores en una lobby según se le de click a un botón
    funcionBotones() {
        var that = this;
        //Para cada partida creada, aumentamos el número de jugadores en la lobby correspondiente (arrayPartidas[index].num)
        for (let index = 0; index < this.arrayPartidas.length; index++) {

            console.log("Asginando al boton : " + index + " la partida", this.arrayPartidas[index])
            //Botones debajo de cada partida
            let bid = "bp" + this.arrayPartidas[index].id;
            let bb = this.partidas.getChildByID(bid);
            console.log(bid)
            $(bb).click(function (e) {

                console.log("click")
                //Mientras que la lobby no supere los 2 jugadores
                if (that.arrayPartidas[index].num < 2) {
                    //Asigna un id a la partida y abre la lobby correspondiente
                    that.borrarIntervalos();
                    that.scene.stop("SelectorDePartidas")
                    //that.scene.start("LobbyOnlineWS", { escena: null, soundManager: that.soundManager, partida: that.arrayPartidas[index] });
                    that.scene.start("LobbyOnline", { escena: null, soundManager: that.soundManager, partida: that.arrayPartidas[index] });
                } else {
                    alert("Servidor completo, prueba mas tarde");
                }

            });

        }
    }

    borrarIntervalos() {

        var interval_id = window.setInterval("", 9999); // Get a reference to the last
        // interval +1

        for (var i = 1; i < interval_id; i++)
            window.clearInterval(i);
        //for clearing all intervals
    }


}
export default SelectorDePartidas;