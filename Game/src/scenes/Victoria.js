let dir="https://guindereis-server-final.herokuapp.com/"

class Victoria extends Phaser.Scene {
    constructor() {
        super({ key: "Victoria" });

    }
    init(data) {
        this.data = data;
        this.soundManager = data.soundManager
        this.ganador = data.ganador
        this.online = this.data.online;
        this.partidaDatos = this.data.lobby;

        console.log(data);

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


            if (this.online && this.data.yo.user === this.data.nameP1) {
                console.log("Mandando resultados al historial");
                this.writeHistorial();
            } else {
                console.log("No se guarda");
                setTimeout(() => {
                    this.scene.start("MAINMENU", { escena: null, soundManager: this.soundManager });
                }, 3000)
            }


        }
        if (this.ganador === 2) {
            console.log("Ha ganado el jugador 2")
            this.texto = this.add.text(this.game.canvas.width / 2 - 500, this.game.canvas.height / 2).setScrollFactor(0).setFontSize(75).setColor("#000000");
            this.texto.setText("Ganador " + this.data.nameP2);


            if (this.online && this.data.yo.user === this.data.nameP2) {
                console.log("Mandando resultados al historial");
                this.writeHistorial();
            } else {
                console.log("No se guarda");
                setTimeout(() => {
                    this.scene.start("MAINMENU", { escena: null, soundManager: this.soundManager });
                }, 3000)
            }

        }

        if (this.online) {
            this.desconectarUsuario(this.data.yo);
        }


    }
    unlock() {

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
            url: dir + 'historial/fileWrite',
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


    desconectarUsuario(player, callback) {


        var that = this;
        console.log(player)
        //Si todavía el jugador no está desconectado 
        if (player.status !== 'disconected' && (player.user !== '' && player.user !== null)) {
            //variable que servirá para comprobar si vamos a desconectar a un jugador que exista o a uno que no exista
           
            //Pedimos los jugadores al servidor y vemos si existe el jugador
            Desconectar(true)
        } else {
            console.log("Algo malo ha ocurrido en desconectar")
            if (typeof callback !== 'undefined') {

                callback(player)
            }
        }
        //Función para cambiar el estado del jugador (en el json) a "disconnected" y lo modifica en el servidor (PUT)
        function Desconectar(existe) {
            //Si el jugador existe (valor obtenido con la función existe())
            if (existe) {

                //console.log(player)
                //Cambiamos el estado del JSON
                player.status = "disconected"
                //Petición PUT al servidor que cambia el estado del jugador en el servidor a "disconnected"
                that.putPlayer(player, callback)

            } else {
                //Si el jugador no existe, no se puede desconectar a algo que no existe
                if (typeof callback !== 'undefined') {
                    callback(player)
                }
                console.log("No se puede desconectar porque no existe")
            }
        }


    }



    //Método PUT que modifica al jugador entero en el servidor (actualiza nombre, estado, y el lado en el que está (P1 o P2))
    putPlayer(player, callback) {

        let partidaID = this.partidaDatos.id;
        $.ajax({
            method: "PUT",
            url: dir + 'partida/player/' + partidaID,
            data: JSON.stringify(player),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (partida) {
            if (typeof callback !== 'undefined') {
                callback(partida)

            }
        })
    }




    getLobbyPlayers(callback) {
        var that = this
        let idPartida = this.partidaDatos.id
        $.ajax({
            url: dir +'partida/' + idPartida,

        }).done(function (partida) {
            //console.log("Partida de getLobby", partida)
            if (typeof callback !== 'undefined') {
                if (partida !== null) {
                    //asignamos la posición en la partida del jugador que se haya loggeado (P1 o P2)
                    // if (that.yo.side === 1 && partida.p1.side === 1) {
                    //     that.yo = partida.p1;
                    // } else if (that.yo.side === 2 && partida.p1.side === 2) {
                    //    that.yo = partida.p2;
                    // }
                }
                //Jugadores en partida (p1 y p2 en "Partida.java")
                var players = [partida.p1, partida.p2];
                //console.log("Jugadores obtenidos", players)
                //Devolvemos a los jugadores loggeados
                callback(players)
            }
        }).fail(() => {
            //Si el servidor no está disponible, borramos todos los intervalos de tiempo establecidos
            this.borrarIntervalos();
            alert("Los servidores no se encuentran disponibles, volviendo al menú principal");
            //borramos el nombre, el estado, los ids y las posiciones del JSON, y devolvemos al jugador al menú principal
            this.yo.user = "";
            this.yo.status = "";
            this.yo.id = 0;
            this.yo.side = 0;
            this.yo = null;
            this.scene.start("MAINMENU", { escena: null, soundManager: this.soundManager });
        })

    }

    existe(player, players) {
        for (let i = 0; i < players.length; i++) {
            if (players[i].user === player.user) {

                player.id = players[i].id

                return true;
            }
        }
        return false;
    }



}
export default Victoria;