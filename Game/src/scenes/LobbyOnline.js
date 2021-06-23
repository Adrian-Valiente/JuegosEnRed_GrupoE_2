class LobbyOnline extends Phaser.Scene {
    constructor() {
        super({ key: "LobbyOnline" });

    }
    init(data) {
        this.data = data;
        this.soundManager = data.soundManager
        this.partidaDatos = data.partida;
        console.log(this.partidaDatos.nombre);

    }

    preload() {
        this.load.html('User1', './src/inputName.html');
        this.load.html('Chat', './API/index.html');

    }


    create() {
        //this.scene.launch("Chat");


        //Fondo
        let lobby = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, 'Victoria');
        lobby.displayHeight = this.game.canvas.height
        lobby.displayWidth = this.game.canvas.width;

        //Estado de los jugadores iniciales
        this.logged = [false, false]
        this.p1Name = '';
        this.p2Name = '';

        //Usuario comienza sin nombre
        var Usuario = { id: 0, user: "", status: "reconnecting", side: 0 };
        this.yo = Usuario;

        //Sprites jugador y estado del jugador (conectado, desconectado o missing --> Hasta que no introduce nombre, estará en rojo)
        let player1 = this.add.sprite(150, 450 - 50, 'P1');
        player1.setScale(0.8)
        this.textP1 = this.add.bitmapText(player1.x - 100, player1.y - 205, 'MotionControl', "Introduzca su nombre", -30);
        //Icono rojo, círculo de desconectado
        this.iconoEstado = this.add.image(player1.x - 120, player1.y - 190, "Desconectado");
        this.iconoEstado.scale = 0.1

        //Campo de texto superpuesto en el canvas de "inputName.html"
        this.inputTextP1 = this.add.dom(player1.x + 25, player1.y + 200).createFromCache('User1');


        this.inputTextP1.addListener('keyup');


        var inputTextpp1 = this.inputTextP1.getChildByName('nameField');

        $(inputTextpp1).focus(function () {
            console.log("Poniendo")
            that.inputTextP1.addListener('keyup');
        });

        $(inputTextpp1).blur(function () {
            console.log("Kitando")
            that.inputTextP1.removeListener('keyup');
        });


        this.inputTextP1.on('keyup', function (event) {

            //if (event.target.name === 'playButton') {
            var inputText = this.getChildByName('nameField');
            //Cuando introducimos el nombre y presionamos enter
            if (event.key === 'Enter') {

                //Si han escrito nombre válido
                if (inputText.value !== '') {


                    that.getLobbyPlayers((players) => {
                        let existe = that.existeLobby(this.p1Name, players);
                        if (!existe) {
                            //Ocultamos el campo de texto 
                            this.setVisible(false);
                            //Quitamos los listeners
                            this.removeListener('keyup');
                            //Actualizamos el nombre del jugador, que en el comienzo empezó vacío
                            this.p1Name = inputText.value
                            //Cambiamos "Introducir su nombre" por el nombre que el jugador se ha puesto
                            that.textP1.setText('Jugador 1 ' + inputText.value);
                            //El estado del jugador ahora pasa a "loggeado"
                            that.logged[0] = true;

                            //Actualizamos el json y ponemos el nombre, el estado y el lugar que ocupa el jugador ("side")
                            Usuario.user = inputText.value;
                            Usuario.status = "connecting";
                            Usuario.side = 1;

                            //Conectamos al usuario
                            that.conectarUsuario(Usuario, function () {
                                //Función que actualiza el icono circular encima del jugador
                                that.actualizarLista(() => {
                                })
                            });
                            inputText.value = ''
                        } else {
                            //Si no se introduce nombre y se presiona enter, el texto parpadea
                            alert("Ese Usuario ya esta en uso, escoge otro")
                            inputText.value = ''
                            this.scene.tweens.add({
                                targets: this.textP1,
                                alpha: 0.2,
                                duration: 250,
                                ease: 'Power3',
                                yoyo: true
                            });
                        }
                    })

                } else {
                    //Si no se introduce nombre y se presiona enter, el texto parpadea
                    alert("Ese Usuario ya esta en uso, escoge otro")
                    //  Flash the prompt
                    inputText.value = ''
                    this.scene.tweens.add({
                        targets: this.textP1,
                        alpha: 0.2,
                        duration: 250,
                        ease: 'Power3',
                        yoyo: true
                    });
                }
            }

        });




        this.summitP1 = this.add.sprite(player1.x - 5, player1.y + 230, "buttonPlay");
        this.summitP1.setFrame(0);
        this.summitP1.setScale(0.3);
        this.summitP1.setOrigin(0.48, -0.1);
        this.summitP1.setInteractive();

        this.summitP1.on("pointerover", () => {
            this.summitP1.setFrame(1);
        })

        this.summitP1.on("pointerout", () => {
            this.summitP1.setFrame(0);
        })

        this.summitP1.on("pointerdown", () => {
            this.summitP1.setFrame(2);
        })

        this.summitP1Texto = this.add.bitmapText(this.summitP1.x - 47, this.summitP1.y + 7, 'MotionControl', "Loguearse", -25);
        this.summitP1Texto.tint = "#000000";
        //Desconectamos al jugador si ya ha introducido un nombre
        this.summitP1.on("pointerup", () => {
            console.log("Pulsado")
            this.summitP1.setFrame(0);
            let textoP1 = this.inputTextP1.getChildByName('nameField').value
            console.log(textoP1)
            if (textoP1 !== '') {
                console.log("texto diferente a vacio")

                that.getLobbyPlayers((players) => {
                    let existe = that.existeLobby(textoP1, players);
                    if (!existe) {
                        //Ocultamos el campo de texto 
                        this.inputTextP1.setVisible(false);

                        this.summitP1Texto.setVisible(false);
                        //Quitamos los listeners
                        this.inputTextP1.removeListener('keyup');
                        //Actualizamos el nombre del jugador, que en el comienzo empezó vacío
                        this.p1Name = textoP1
                        //Cambiamos "Introducir su nombre" por el nombre que el jugador se ha puesto
                        that.textP1.setText('Jugador 1 ' + textoP1);
                        //El estado del jugador ahora pasa a "loggeado"
                        that.logged[0] = true;

                        //Actualizamos el json y ponemos el nombre, el estado y el lugar que ocupa el jugador ("side")
                        Usuario.user = textoP1;
                        Usuario.status = "connecting";
                        Usuario.side = 1;

                        //Conectamos al usuario
                        that.conectarUsuario(Usuario, function () {
                            //Función que actualiza el icono circular encima del jugador
                            that.actualizarLista(() => {
                            })
                        });
                        this.inputTextP1.value = ''
                    } else {
                        //Si no se introduce nombre y se presiona enter, el texto parpadea
                        alert("Ese Usuario ya esta en uso, escoge otro")
                        this.inputTextP1.value = ''
                    }
                })



            } else {
                //Si no se introduce nombre y se presiona enter, el texto parpadea
                alert("Escriba un nombre de usuario")
                this.inputTextP1.value = ''

            }

        })







        //MISMA CONFIGURACIÓN PERO CON EL JUGADOR 2 (logged[1], side=2, p2Name etc...)

        let player2 = this.add.sprite(920, 450 - 50, 'P2')
        player2.flipX = true;
        player2.setScale(0.8)
        this.textP2 = this.add.bitmapText(player2.x - 100, player2.y - 205, 'MotionControl', "Introduzca su nombre", -30);
        this.iconoEstadoP2 = this.add.image(player2.x - 120, player2.y - 190, "Desconectado");
        this.iconoEstadoP2.scale = 0.1


        this.inputTextP2 = this.add.dom(player2.x + 25, player2.y + 200).createFromCache('User1');


        this.inputTextP2.addListener('keyup');
        var inputTextpp2 = this.inputTextP2.getChildByName('nameField');

        $(inputTextpp2).focus(function () {
            console.log("Poniendo")
            that.inputTextP2.addListener('keyup');
        });

        $(inputTextpp2).blur(function () {
            console.log("Kitando")
            that.inputTextP2.removeListener('keyup');
        });

        this.inputTextP2.on('keyup', function (event) {

            //if (event.target.name === 'playButton') {
            var inputText = this.getChildByName('nameField');
            if (event.key === 'Enter') {

                //  Have they entered anything?
                if (inputText.value !== '') {
                    //  Turn off the click events

                    this.p2Name = inputText.value
                    that.getLobbyPlayers((players) => {
                        let existe = that.existeLobby(this.p2Name, players);
                        if (!existe) {
                            //  Hide the login element
                            this.setVisible(false);
                            this.removeListener('keyup');
                            //  Populate the text with whatever they typed in
                            that.textP2.setText('Jugador 2 ' + inputText.value);
                            that.logged[1] = true;

                            Usuario.user = inputText.value;
                            Usuario.status = "connecting";
                            Usuario.side = 2;
                            that.conectarUsuario(Usuario, function () {

                                that.actualizarLista(() => {
                                })
                            });
                            inputText.value = ''
                        } else {
                            alert("Ese Usuario ya esta en uso, escoge otro")
                            inputText.value = ''
                            this.scene.tweens.add({
                                targets: this.textP2,
                                alpha: 0.2,
                                duration: 250,
                                ease: 'Power3',
                                yoyo: true
                            });
                        }
                    })

                } else {
                    //  Flash the prompt
                    console.log("Para conectarse elija un nombre de usuario válido")
                    this.scene.tweens.add({
                        targets: this.textP2,
                        alpha: 0.2,
                        duration: 250,
                        ease: 'Power3',
                        yoyo: true
                    });
                }
            }

        });



        this.summitP2 = this.add.sprite(player2.x - 5, player2.y + 230, "buttonPlay");
        this.summitP2.setFrame(0);
        this.summitP2.setScale(0.3);
        this.summitP2.setOrigin(0.48, -0.1);
        this.summitP2.setInteractive();

        this.summitP2.on("pointerover", () => {
            this.summitP2.setFrame(1);
        })

        this.summitP2.on("pointerout", () => {
            this.summitP2.setFrame(0);
        })

        this.summitP2.on("pointerdown", () => {
            this.summitP2.setFrame(2);
        })

        //Desconectamos al jugador si ya ha introducido un nombre
        this.summitP2.on("pointerup", () => {
            console.log("Pulsado")
            this.summitP2.setFrame(0);
            let textoP2 = this.inputTextP2.getChildByName('nameField').value
            console.log(textoP2)
            if (textoP2 !== '') {
                console.log("texto diferente a vacio")

                that.getLobbyPlayers((players) => {
                    let existe = that.existeLobby(textoP2, players);
                    if (!existe) {
                        //Ocultamos el campo de texto 
                        this.inputTextP2.setVisible(false);

                        this.summitP2Texto.setVisible(false);
                        //Quitamos los listeners
                        this.inputTextP2.removeListener('keyup');
                        //Actualizamos el nombre del jugador, que en el comienzo empezó vacío
                        this.p2Name = textoP2
                        //Cambiamos "Introducir su nombre" por el nombre que el jugador se ha puesto
                        that.textP2.setText('Jugador 2 ' + textoP2);
                        //El estado del jugador ahora pasa a "loggeado"
                        that.logged[1] = true;

                        //Actualizamos el json y ponemos el nombre, el estado y el lugar que ocupa el jugador ("side")
                        Usuario.user = textoP2;
                        Usuario.status = "connecting";
                        Usuario.side = 2;

                        //Conectamos al usuario
                        that.conectarUsuario(Usuario, function () {
                            //Función que actualiza el icono circular encima del jugador
                            that.actualizarLista(() => {
                            })
                        });
                        this.inputTextP2.value = ''
                    } else {
                        //Si no se introduce nombre y se presiona enter, el texto parpadea
                        alert("Ese Usuario ya esta en uso, escoge otro")
                        this.inputTextP2.value = ''
                    }
                })

            } else {
                //Si no se introduce nombre y se presiona enter, el texto parpadea
                alert("Escriba un nombre de usuario")
                this.inputTextP2.value = ''

            }

        })

        this.summitP2Texto = this.add.bitmapText(this.summitP2.x - 47, this.summitP2.y + 7, 'MotionControl', "Loguearse", -25);
        this.summitP2Texto.tint = "#000000";




        //BOTÓN DE PLAY --> Si los dos jugadores no están conectados, la partida no comienza

        let pbCM = this.add.sprite(880, 30, "buttonPlay");
        pbCM.setFrame(0);
        pbCM.setScale(0.6);
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

            //var that= this;
            // if (Usuario.user !== null && Usuario.user !== "") {
            //     console.log("Usuario ready")
            //     Usuario.status = "ready";
            //     this.putPlayer(Usuario, () => {
            //         that.actualizarLista();
            //     })
            // }
            if (Usuario.side === 1) {
                if (this.logged[0] === true) {
                    Usuario.status = "ready";
                    this.putPlayer(Usuario, () => {
                        that.actualizarLista();
                    })
                }

            }
            if (Usuario.side === 2) {
                if (this.logged[1] === true) {
                    Usuario.status = "ready";
                    this.putPlayer(Usuario, () => {
                        that.actualizarLista();
                    })
                }

            }

            // //SI hay algún jugador que NO esté loggeado, la partida no va a comenzar
            // if (this.logged[0] === true && this.logged[1] === true) {
            //     this.desconectarUsuario(Usuario, () => {
            //         this.eliminarUsuario(Usuario, () => {
            //             this.borrarIntervalos();
            //             this.yo.user = "";
            //             this.yo.status = "";
            //             this.yo.id = 0;
            //             this.yo.side = 0;
            //             this.scene.stop("Lobby");
            //             this.scene.start("Scene_play", { escena: null, soundManager: this.soundManager, names: { p1: this.p1Name, p2: this.p2Name } });

            //         })

            //     })
            // }
        })

        this.cjT = this.add.bitmapText(pbCM.x - 53, pbCM.y + 10, 'MotionControl', "Jugar", -60);
        this.cjT.tint = "#000000";


        //////////////////////////////////////////////////////////////////////////
        //////////////////////CHAT//////////////////////////////////////////7/////
        ///////////////////////////////////////////////////////////////////////////


        //Botón para salir de la lobby

        let salirBoton = this.add.sprite(200, 30, "buttonPlay");
        salirBoton.setFrame(0);
        salirBoton.setScale(0.6);
        salirBoton.setOrigin(0.48, -0.1);
        salirBoton.setInteractive();

        salirBoton.on("pointerover", () => {
            salirBoton.setFrame(1);
        })

        salirBoton.on("pointerout", () => {
            salirBoton.setFrame(0);
        })

        salirBoton.on("pointerdown", () => {
            salirBoton.setFrame(2);
        })

        //Desconectamos al jugador si ya ha introducido un nombre
        salirBoton.on("pointerup", () => {
            salirBoton.setFrame(0);
            this.borrarIntervalos();
            //Si el jugador tiene un nombre y no es null
            if (Usuario.user !== "" && Usuario.user !== null) {
                //Desconectamos al jugador y actualizamos el JSON de Usuario
                this.eliminarUsuario(Usuario, () => {

                    Usuario.user = "";
                    Usuario.status = "";
                    Usuario.id = 0;
                    Usuario.side = 0;
                    Usuario = null;

                    this.scene.start("SelectorDePartidas", { escena: null, soundManager: this.soundManager })

                })
                //Si el jugador todavía no había puesto ningún nombre 
            } else {
                Usuario.user = "";
                Usuario.status = "";
                Usuario.id = 0;
                Usuario.side = 0;
                Usuario = null;
                this.scene.start("SelectorDePartidas", { escena: null, soundManager: this.soundManager })
            }

        })

        let salirTexto = this.add.bitmapText(salirBoton.x - 55, salirBoton.y + 10, 'MotionControl', "Salir", -60);
        salirTexto.tint = "#000000";


        let lobbyName = this.add.bitmapText(this.game.canvas.width / 2 - 80, 135, 'MotionControl', "", -55);
        lobbyName.setText(this.partidaDatos.nombre);
        lobbyName.tint = "#000000";





        ////////////////////////////////
        ////////////////////////////////
        ////////////////////////////////

        var that = this;
        //Superponemos el Div que hay en "/API/index.html" sobre el canvas para que se vean los mensajes
        this.chat = this.add.dom(550, 440).createFromCache('Chat');


        //LO QUE SERIA EL MAIN EN EL OTRO SCRIPT//



        //////////////////////////////////////////////////////////
        ///                                                    ///
        ///    CADA VEZ QUE SE ABRE LA VENTANA CON EL JUEGO    ///
        ///                                                    ///
        //////////////////////////////////////////////////////////

        //Variable para ver si el usuario está en la ventana del juego o en otra ventana de navegador
        let windowFocus = true;

        //Cuando se carga la página mostramos a los usuarios conectados//


        that.actualizarLista()

        //Usuario que se conecta al servidor//



        //Desconectamos al usuario cuando cierra la ventana//

        window.addEventListener('beforeunload', function (e) {
            
            that.eliminarUsuario(Usuario);

        });





        //Simulamos una funcion Update//


        function actualizarSistema() {

            console.log("ACTUALIZACION USUARIOS")
            //Pedimos los jugadores al servidor
            that.getLobbyPlayers((players) => {
                //Si hay jugadores en el servidor
                if (players.length != 0) {
                    console.log("Mostrando los estados actualizados :", players);
                    console.log("YO: ", Usuario);
                    for (let i = 0; i < players.length; i++) {
                        //Para cada jugador
                        if (i === 0) {
                            if (players[i].status === "missing") {
                                console.log("Desconectando usuarios");
                                //Desconectamos al jugador 1
                                that.desconectarUsuario(players[i]);
                            }
                            //Si el jugador todavía está conectado
                            else if (players[i].status === "connected") {
                                console.log("Ausentando usuarios");
                                //Lo ponemos como ausente, ausentamos a todos los jugadores cada X tiempo
                                that.ausentarUsuario(players[i]);
                            } else {
                                console.log("No existe o no se hace nada");
                            }

                        }
                        //Jugador 2
                        if (i === 1) {
                            //Aunque el jugador esté conectado
                            if (players[i].status === "connected") {
                                console.log("NO ES DONDE KEREMOSSASD")
                                //Lo ausentamos
                                that.ausentarUsuario(players[i], () => {
                                    //Si el jugador todavía está en la ventana de juego (windowfocus=true)
                                    if (windowFocus && Usuario.status !== "ready") {

                                        //Lo reconectamos y le quitamos el ausente
                                        Usuario.status = "reconnecting";
                                        console.log("Usuario desconectado ahora vamos a conectarlo")
                                        //Volvemos a conectar al usuario
                                        that.conectarUsuario(Usuario, () => {
                                            console.log("SUPUESTAMENTE desconcetaduu")
                                            console.log(Usuario)
                                            //Actualizamos los iconos
                                            that.actualizarLista()
                                            //console.log("ACTUALIZACION USUARIOS FINALIZADA")
                                            console.log("TIME OUT DE DESCONECTAR USUARIO EXISTE")
                                            //El "Update" se hace cada 18 segundos
                                            setTimeout(() => {

                                                actualizarSistema()
                                            }, 18000)
                                            return
                                        });

                                    }
                                    //Si el jugador NO está en la ventana de juego 
                                    else {
                                        console.log("TIME OUT DE DESCONECTAR USUARIO EXISTE ELSE")
                                        console.log(Usuario)
                                        //Actualizamos los iconos
                                        that.actualizarLista()

                                        setTimeout(() => {

                                            actualizarSistema()
                                        }, 18000)
                                        return;


                                    }
                                });

                            }
                            //SI el segundo jugador está ausente 
                            else if (players[i].status === "missing") {
                                console.log("NO ES DONDE KEREMOSSASD")

                                //Lo desconectamos cambiando su estado
                                that.desconectarUsuario(players[i], () => {
                                    //Si está en la ventana de juego, lo volvemos a conectar
                                    if (windowFocus && Usuario.status !== "ready") {
                                        Usuario.status = "reconnecting";
                                        console.log("Usuario desconectado ahora vamos a conectarlo")
                                        that.conectarUsuario(Usuario, () => {

                                            that.actualizarLista()
                                            //console.log("ACTUALIZACION USUARIOS FINALIZADA")

                                            console.log("TIME OUT DE AUSENTAR USUARIO EXISTE")
                                            console.log(Usuario)

                                            setTimeout(() => {


                                                actualizarSistema()
                                            }, 18000)

                                            return
                                        });
                                    }
                                    //Si no está en la ventana de juego, el jugador se va a desconectar al comprobarse el estado en showPlayer() 
                                    else {
                                        console.log("TIME OUT DE AUSENTAR USUARIO EXISTE ELSE")
                                        console.log(Usuario)
                                        that.actualizarLista();

                                        setTimeout(() => {

                                            actualizarSistema()
                                        }, 18000)
                                        return

                                    }
                                });
                            } else {
                                console.log("No existe");
                                //
                                if (windowFocus) {
                                    Usuario.status = "reconnecting";
                                    console.log("Usuario desconectado ahora vamos a conectarlo")
                                    that.conectarUsuario(Usuario, () => {

                                        that.actualizarLista()
                                        //console.log("ACTUALIZACION USUARIOS FINALIZADA")

                                        console.log("TIME OUT DE AUSENTAR USUARIO EXISTE")
                                        console.log(Usuario)

                                        setTimeout(() => {


                                            actualizarSistema()
                                        }, 18000)

                                        return
                                    });
                                } else {
                                    console.log("TIME OUT DE AUSENTAR USUARIO EXISTE ELSE")
                                    console.log(Usuario)
                                    that.actualizarLista();

                                    setTimeout(() => {

                                        actualizarSistema()
                                    }, 18000)
                                    return
                                }
                                //
                            }
                        }
                    }


                }
                //Si no hay ningún jugador en el array de players  
                else {
                    actualizarLista()
                    //console.log("ACTUALIZACION USUARIOS FINALIZADA")
                    console.log("TIMEOUT RANDOM KE NO DEBERIA SALIR NUNCA");
                    setTimeout(() => { actualizarSistema() }, 18000)
                }


            })
        }

        //Función que le manda al servidor todo el rato el estado del jugador 
        function meActualizo() {

            if (Usuario.user !== '' && windowFocus && Usuario.status !== "disconected") {

                if (Usuario.status === 'ready') {
                    console.log("Me actualizo", Usuario);
                    Usuario.status = "ready";
                    //Usuario.user= Usuario.user;
                    //Mandamos el estado al servidor con una petición PUT 
                    that.putPlayer(Usuario, () => {
                        that.actualizarLista(() => { setTimeout(() => { meActualizo() }, 1000) })

                    });

                } else {

                    console.log("Me actualizo", Usuario);
                    Usuario.status = "connected";
                    //Mandamos el estado al servidor con una petición PUT 
                    that.putPlayer(Usuario, () => {
                        that.actualizarLista(() => { setTimeout(() => { meActualizo() }, 1000) })

                    });
                }


            } else {
                //console.log("No me actualizo")
                that.actualizarLista(() => { setTimeout(() => { meActualizo() }, 1000) })
            }
        }

        //Función que actualiza el chat en pantalla
        function refrescarChat() {
            that.getChat((mensajes) => {
                that.escribirMensajes(mensajes, () => {
                    //El chat se actualiza constantemente
                    setTimeout(() => {
                        //console.log("Echandole hielos al chat otra ve")
                        refrescarChat()
                    }, 500)
                })

            })
        }


        //Actualización del chat
        setTimeout(() => {
            //     console.log("Echandole hielos al chat")

            refrescarChat()
            setTimeout(() => {
                $("#chat").scrollTop($("#chat")[0].scrollHeight);
            }, 800)
        }, 500)

        //La función "Update" simulada se llama cada 9 segundos
        // setTimeout(() => {
        //     actualizarSistema();
        // }, 30000);

        //Mandamos el estado del jugador al servidor cada 500 ms
        setTimeout(() => {
            meActualizo();

        }, 500);



        $("#summit").click(function () {
            let mensaje = $('#mensaje')
            let inputMensaje = mensaje.val();
            if (inputMensaje !== '') {
                //console.log("Valor: " + inputMensaje);
                mensaje.val("");
                //Podemos escribir mensajes en el chat siempre que tengamos un nombre puesto; tenemos que estar "loggeados"
                if (Usuario.user !== '') {
                    that.writeMenssage(inputMensaje, Usuario);
                } else {
                    alert("Introduce un nombre de usuario antes de escribir un mensaje")
                }
            } else {
                alert("Escribe un mensaje valido")
            }
        })








        // let desconectar;

        $(window).blur(function () {
            windowFocus = false;

        });
        $(window).focus(function () {
            windowFocus = true;

        });



    }


    //FUNCIONES DE TODA ESTA COSA
    //Metodos Get//

    /*
    getChat(callback) {
 
        var that = this
        let nombrePartida = "Partida1"+".txt";
        console.log(nombrePartida)
 
        $.ajax({
            url: 'http://localhost:8080/mensaje/fileRead/concreto',
            data: nombrePartida,
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
 
        }).done(function (mensajes) {
            //console.log("Chat conseguido", callback)
            if (typeof callback !== 'undefined') {
                callback(mensajes)
            }
        })
    }
    */


    getChat(callback) {


        let idPartida = this.partidaDatos.id
        $.ajax({
            url: 'https://guindereis-server-final.herokuapp.com/partida/fileRead/' + idPartida,

        }).done(function (mensajes) {
            //console.log("Chat conseguido", callback)
            if (typeof callback !== 'undefined') {
                callback(mensajes)
            }
        })
    }

    //Método GET que, a partir del ID de la partida del lobby seleccionada, asigna a los jugadores sus respectivos sitios
    // getConcretePartida() en "PartidaController.java" --> se aumenta en el servidor el número de jugadores en partida (num)

    getLobbyPlayers(callback) {
        var that = this
        let idPartida = this.partidaDatos.id
        $.ajax({
            url: 'https://guindereis-server-final.herokuapp.com/partida/' + idPartida,

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




    //Metodos POST//

    playerConnected(callback) {
        $.ajax({
            method: "POST",
            url: 'https://guindereis-server-final.herokuapp.com/player/',
            data: JSON.stringify({ "user": "Unknown_User", "status": "connected" }),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (player) {
            callback(player);
        })
    }

    /*
        sendMenssage(callback, mensaje) {
            var that = this
            let nombrePartida = this.partidaDatos.nombre+".txt";
            
            $.ajax({
                method: "POST",
                url: 'http://localhost:8080/mensaje/fileWrite/concreto',
                data: [nombrePartida,mensaje],
                processData: false,
                headers: {
                    "Content-Type": "application/json"
                }
            }).done(function () {
                console.log("Mensaje escrito ");
                if (typeof callback !== 'undefined') {
                    callback(mensaje)
                }
            })
        }
        */


    sendMenssage(callback, mensaje) {

        let idPartida = this.partidaDatos.id
        $.ajax({
            method: "POST",
            url: 'https://guindereis-server-final.herokuapp.com/partida/fileWrite/' + idPartida,
            data: mensaje,
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function () {
            console.log("Mensaje escrito ");
            if (typeof callback !== 'undefined') {
                callback(mensaje)
            }
        })
    }




    //Metodos PUT//

    //Método PUT que modifica al jugador entero en el servidor (actualiza nombre, estado, y el lado en el que está (P1 o P2))
    putPlayer(player, callback) {

        let partidaID = this.partidaDatos.id;
        $.ajax({
            method: "PUT",
            url: 'https://guindereis-server-final.herokuapp.com/partida/player/' + partidaID,
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



    updateLobby(player, callback) {

        let partidaID = this.partidaDatos.id;
        let partida = this.partidaDatos;
        $.ajax({
            method: "PUT",
            url: 'https://guindereis-server-final.herokuapp.com/partida/' + partidaID,
            data: JSON.stringify(partida),
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






    //Funciones de apoyo





    //Función que, antes de conectar al jugador, comprueba si introdujo un nombre válido y si está conectado
    conectarUsuario(player, callback) {
        var that = this
        //No se conectará al jugador al servidor si le da a Enter sin introducir un nombre
        if (player.user === '') {

            console.log("Para conectarse elija un nombre de usuario válido")
            if (typeof callback !== 'undefined') {
                callback(player)
            }

        } else {
            //Ponemos esta condición, porque al principio todos los jugadores se encuentran reconnecting o connecting
            if (player.status !== "connected") {
                //llamamos a la función que cambia el estado en el JSON a "connected"
                Conectar();

            } else {
                //Si el jugador ya estaba conectado, lo devolvemos
                callback(player);
            }

        }

        //Función para cambiar el estado del jugador (en el json) a "connected" y lo modifica en el servidor (PUT)
        function Conectar() {


            player.status = "connected"
            that.putPlayer(player, callback)

        }

    }


    //Función que, antes de desconectar al jugador, comprueba si introdujo un nombre válido y si se va a desconectar a un usuario que no sea null
    desconectarUsuario(player, callback) {


        var that = this;
        //Si todavía el jugador no está desconectado 
        if (player.status !== 'disconected' && (player.user !== '' && player.user !== null)) {
            //variable que servirá para comprobar si vamos a desconectar a un jugador que exista o a uno que no exista
            let existeU = false;
            //Pedimos los jugadores al servidor y vemos si existe el jugador
            this.getLobbyPlayers((players) => {
                existeU = this.existe(player, players);
                //Llamamos a la función encargada de cambiar el estado del JSON del jugador
                Desconectar(existeU);

            })
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


    eliminarUsuario(player, callback) {


        var that = this;
        if ((player.user !== '' && player.user !== null)) {
            let existeU = false;
            this.getLobbyPlayers((players) => {
                existeU = this.existe(player, players);
                Eliminar(existeU);

            })
        } else {
            console.log("Algo malo ha ocurrido en eliminar")
            if (typeof callback !== 'undefined') {

                callback(player)
            }
        }

        function Eliminar(existe) {
            if (existe) {

                //console.log(player)

                player.status = null
                player.user = null;
                player.id = 0;
                that.putPlayer(player, callback)

            } else {

                if (typeof callback !== 'undefined') {
                    callback(player)
                }
                console.log("No se puede eliminar porque no existe")
            }
        }


    }





    //Función que pone a un jugador como ausente
    ausentarUsuario(player, callback) {
        var that = this;
        //Si el jugador no estaba ausente antes y tiene un nombre válido
        if (player.status !== 'missing' && player.user !== '') {

            let existeU = false;
            //Comprobamos si el jugador está en el array de players de "getLobbyPlayers()"
            this.getLobbyPlayers((players) => {
                //El valor del estado depende de si el jugador existe en el array de players
                existeU = this.existe(player, players);
                //Ausentamos al jugador según su estado "existe"
                Ausentar(existeU);

            })
        } else {
            console.log("Algo malo ha ocurrido en ausentar")
            if (typeof callback !== 'undefined') {
                callback(player)
            }
        }
        //Función que ausenta a los jugadores si existen en el array de players de "getLobbyPlayers()"
        function Ausentar(existe) {
            //Si el jugador existe en el array de players
            if (existe) {
                //Actualizamos el estado en el JSON
                player.status = "missing"
                //Actualizamos el estado en el servidor
                that.putPlayer(player, callback)
            } else {
                callback();
                console.log("No se puede Ausentar porque no existe")
            }
        }


    }



    //Función que actualiza el estado de los jugadores (Color de estado)
    showPlayer(Usuarios) {
        var that = this;

        //console.log("Mostrando los estados actualizados :", Usuarios);
        //console.log("YO: ", this.yo);

        //Mientras haya un usuario conectado
        if (Usuarios[0] !== null) {
            //Si estamos en el lado del jugador 1 (Lado izquierdo = P1), actualizamos solo el color de el círculo izquierdo
            if (Usuarios[0].side === 1) {
                //Si el jugador está conectado
                if (Usuarios[0].status === "connected") {
                    //Cambiamos el icono del círculo a un círculo verde
                    that.iconoEstado.setTexture("Conectado");
                    that.iconoEstado.update();
                    //Actualizamos texto al lado del icono con el nombre correspondiente del jugador en el servidor
                    let texto = 'Jugador 1 ' + Usuarios[0].user;
                    this.p1Name = Usuarios[0].user
                    this.textP1.setText(texto)
                    //Estado del jugador loggeado
                    this.logged[1] = true;
                    //Ocultamos el campo de texto para que no vuelva a poner nombre el jugador1
                    this.inputTextP1.setVisible(false);
                    this.summitP1.setVisible(false);
                    this.summitP1Texto.setVisible(false);
                }
                if (Usuarios[0].status === "ready") {

                    console.log("El usuario esta Ready");
                    //Cambiamos el icono del círculo a un círculo verde
                    that.iconoEstado.setTexture("Ready");
                    that.iconoEstado.update();
                    //Actualizamos texto al lado del icono con el nombre correspondiente del jugador en el servidor
                    let texto = 'Jugador 1 ' + Usuarios[0].user;
                    this.p1Name = Usuarios[0].user
                    this.textP1.setText(texto)
                    //Estado del jugador loggeado
                    this.logged[0] = true;
                    //Ocultamos el campo de texto para que no vuelva a poner nombre el jugador1
                    this.inputTextP1.setVisible(false);
                    this.summitP1.setVisible(false);
                    this.summitP1Texto.setVisible(false);

                }
                //Si el jugador está ausente
                if (Usuarios[0].status === "missing") {
                    //Cambiamos el icono del círculo a un círculo amarillo
                    that.iconoEstado.setTexture("Missing");
                    //El texto al lado del icono sigue siendo el mismo
                    let texto = 'Jugador 1 ' + Usuarios[0].user;
                    this.p1Name = Usuarios[0].user
                    this.textP1.setText(texto)
                    //El estado del jugador también sigue siendo el mismo, dado que no ha cerrado la ventana del navegador
                    this.logged[0] = true;
                    //Seguimos manteniendo el campo de texto oculto
                    this.inputTextP1.setVisible(false);
                    this.summitP1.setVisible(false);
                    this.summitP1Texto.setVisible(false);
                }
                //Si el jugador tiene de estado "disconnected"
                if (Usuarios[0].status === "disconected") {
                    //console.log("Desconectado pa la calle")


                    if (Usuarios[0].user === this.yo.user) {
                        //Borramos todos los intervals (Mensajes al servidor de estado del jugador, actualizaciones etc...)
                        this.borrarIntervalos();
                        //Desconectamos al usuario del servidor

                        this.eliminarUsuario(this.yo, () => {
                            //Borramos el nombre, el estado, el lado del jugador, y devolvemos al jugador al menú principal
                            this.yo.user = "";
                            this.yo.status = "";
                            this.yo.id = 0;
                            this.yo.side = 0;
                            this.yo = null;
                            this.scene.start("MAINMENU", { escena: null, soundManager: this.soundManager })

                        })

                    } else {

                        that.iconoEstado.setTexture("Desconectado");
                        let texto = 'Introduzca su nombre';
                        this.p1Name = ""
                        this.textP1.setText(texto)
                        this.logged[0] = false;
                        //console.log("Haciendo visible")
                        this.inputTextP1.setVisible(true);
                        this.summitP1.setVisible(true);
                        this.summitP1Texto.setVisible(true);
                    }


                }


            }
            //Si todavía no se ha introducido ningún nombre de jugador (1), y no hay jugadores (1) loggeados (Al abrir la lobby por primera vez, por ejemplo)
            if (Usuarios[0].user === "" || Usuarios[0].user === null) {

                //Iconos, y textos tal cual se presentan al comienzo 
                //Círculo rojo, Texto para introducir nombre, jugadores no loggeados y campo de texto disponible

                that.iconoEstado.setTexture("Desconectado");
                let texto = 'Introduzca su nombre';
                this.p1Name = ""
                this.textP1.setText(texto)
                this.logged[0] = false;
                //console.log("Haciendo visible");
                this.inputTextP1.setVisible(true);
                this.summitP1.setVisible(true);
                this.summitP1Texto.setVisible(true);
            }

            //Mismo caso, pero con el segundo jugador; Actualizamos el icono según su estado, y si está desconectado...
            //... le devolvemos al menú 
            if (Usuarios[1].side === 2) {
                if (Usuarios[1].status === "connected") {
                    that.iconoEstadoP2.setTexture("Conectado");
                    let texto = 'Jugador 2 ' + Usuarios[1].user
                    this.p2Name = Usuarios[1].user;
                    this.textP2.setText(texto);
                    this.logged[1] = true;
                    this.inputTextP2.setVisible(false);
                    this.summitP2.setVisible(false);
                    this.summitP2Texto.setVisible(false);
                }
                if (Usuarios[1].status === "ready") {

                    that.iconoEstadoP2.setTexture("Ready");
                    that.iconoEstadoP2.update();

                    let texto = 'Jugador 2 ' + Usuarios[1].user;
                    this.p2Name = Usuarios[1].user
                    this.textP2.setText(texto)
                    //Estado del jugador loggeado
                    this.logged[1] = true;

                    this.inputTextP2.setVisible(false);
                    this.summitP2.setVisible(false);
                    this.summitP2Texto.setVisible(false);
                }
                if (Usuarios[1].status === "missing") {
                    that.iconoEstadoP2.setTexture("Missing");
                    let texto = 'Jugador 2 ' + Usuarios[1].user
                    this.p2Name = Usuarios[1].user;
                    this.textP2.setText(texto);
                    this.logged[1] = true;
                    this.inputTextP2.setVisible(false);
                    this.summitP2.setVisible(false);
                    this.summitP2Texto.setVisible(false);
                }
                if (Usuarios[1].status === "disconected") {
                    //console.log("Desconectado pa la calle asdasdada")
                    if (Usuarios[1].user === this.yo.user) {
                        this.borrarIntervalos();
                        console.log("TE SACO", this.yo);
                        this.eliminarUsuario(this.yo, () => {
                            this.yo.user = "";
                            this.yo.status = "";
                            this.yo.id = 0;
                            this.yo.side = 0;
                            this.yo = null;
                            this.scene.start("MAINMENU", { escena: null, soundManager: this.soundManager })

                        })



                    } else {
                        that.iconoEstadoP2.setTexture("Desconectado");
                        let texto = 'Introduzca su nombre';
                        this.p2Name = ""
                        console.log("Haciendo visible");
                        this.inputTextP2.setVisible(true);
                        this.summitP2.setVisible(true);
                        this.summitP2Texto.setVisible(true);
                        this.logged[1] = false;
                        this.textP2.setText(texto)
                    }


                }


            }
            //Si todavía no se ha introducido ningún nombre de jugador (2), y no hay jugadores (2) loggeados (Al abrir la lobby por primera vez, por ejemplo)
            if (Usuarios[1].user === "" || Usuarios[1].user === null) {

                that.iconoEstadoP2.setTexture("Desconectado");
                let texto = 'Introduzca su nombre';
                this.p2Name = ""
                this.textP2.setText(texto)
                this.logged[1] = false;
                //console.log("Haciendo visible");
                this.inputTextP2.setVisible(true);
                this.summitP2.setVisible(true);
                this.summitP2Texto.setVisible(true);
            }
        }

        //Si estoy conectado o ausente, independientemente qué jugador sea, desactivo el campo de texto contrario, para no volver a introducir un nombre
        if (this.yo.status === "connected" || this.yo.status === "missing" || this.yo.status === "ready") {
            //Si soy el jugador 1
            if (this.yo.side === 1) {
                //Desactivo el campo de texto del jugador 2
                this.inputTextP2.setVisible(false);
                this.summitP2.setVisible(false);
                this.summitP2Texto.setVisible(false);

            }
            //Si soy el jugador 2
            if (this.yo.side === 2) {
                //Desactivo el campo de texto del jugador 1
                this.inputTextP1.setVisible(false);
                this.summitP1.setVisible(false);
                this.summitP1Texto.setVisible(false);
            }
        }

        if (Usuarios[0].status === "ready" && Usuarios[1].status === "ready") {
            console.log("Comenzado partida desde el actualizar")
            this.borrarIntervalos();
            this.scene.stop("Lobby");
            if (Usuarios[0].user === that.yo.user) {
                this.scene.start("Scene_play_Online", { escena: null, soundManager: this.soundManager, users: { p1: Usuarios[0], p2: Usuarios[1] }, online: true, partida: this.partidaDatos, yo: Usuarios[0],lobby:this.partidaDatos });
            } else if (Usuarios[1].user === that.yo.user) {
                this.scene.start("Scene_play_Online", { escena: null, soundManager: this.soundManager, users: { p1: Usuarios[0], p2: Usuarios[1] }, online: true, partida: this.partidaDatos, yo: Usuarios[1],lobby:this.partidaDatos });
            }


        }


    }

    //Función auxiliar que comprueba si el jugador "player" está dentro del array de players que devuelve "getLobbyPlayers()"
    existe(player, players) {
        for (let i = 0; i < players.length; i++) {
            if (players[i].user === player.user) {

                player.id = players[i].id

                return true;
            }
        }
        return false;
    }



    //Método que hace un GET concreto del jugador, y lo añade a la partida, y muestra jugadores en pantalla actualizando sus iconos
    actualizarLista(callback) {
        //Obtenemos los jugadores que haya loggeados (Método GET concreto)
        this.getLobbyPlayers((players) => {

            if (typeof callback !== 'undefined') {

                callback(players);
            }
            //Actualizamos el estado de los jugadores en la lobby (círculo de colores verde, rojo o amarillo)
            this.showPlayer(players);
        })
    }


    existeLobby(name, players) {

        console.log(players)
        console.log(name)
        for (let i = 0; i < players.length; i++) {
            if (players[i].user === name) {
                if (players[i].status !== "connected" && players[i].status !== "missing" && players[i].status !== "ready") {
                    return false;
                } else {
                    return true;
                }
            }
        }
        return false;


    }
    //Función que escribe un mensaje del chat tanto en un .txt guardado en el servidor, como en el div del chat
    writeMenssage(mensaje, player) {
        var date = new Date;
        let Mensaje;
        var that = this

        if (date.getMinutes() < 10) {
            Mensaje = (player.user + " (" + date.getHours() + " : 0" + date.getMinutes() + ") - " + mensaje);
        } else {
            Mensaje = (player.user + " (" + date.getHours() + " : " + date.getMinutes() + ") - " + mensaje);
        }
        //Escribimos el mensaje en un fichero de texto (fileWrite() en MensajeController.java)
        this.sendMenssage((sad) => {
            //Ponemos el mensaje que acabamos de mandar en el div
            that.getChat((mensajes) => {
                that.escribirMensajes(mensajes, () => {
                    $("#chat").scrollTop($("#chat")[0].scrollHeight);
                })
            });


        }, Mensaje)

    }

    //Función que escribe los mensajes del archivo .txt en el div
    escribirMensajes(mensajes, callback) {

        $("#chat").empty();
        for (let index = 0; index < mensajes.length; index++) {
            $("#chat").append("<p>" + mensajes[index] + "</p>");
        }

        if (typeof callback !== 'undefined') {
            callback()
        }


    }


    //Método que borra todos los intervals
    borrarIntervalos() {

        var interval_id = window.setInterval("", 9999); // Get a reference to the last
        // interval +1

        for (var i = 1; i < interval_id; i++)
            window.clearInterval(i);
        //for clearing all intervals
    }

    update() {


        if (this.yo.user === "" || this.yo.user === null) {

            $("#mensaje").attr('disabled', 'disabled');
        } else {

            $("#mensaje").removeAttr('disabled');
        }

    }







}

export default LobbyOnline;