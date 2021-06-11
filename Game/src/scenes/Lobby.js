class Lobby extends Phaser.Scene {
    constructor() {
        super({ key: "Lobby" });

    }
    init(data) {
        this.data = data;
        this.soundManager = data.soundManager
        console.log(this.soundManager)
    }

    preload() {
        this.load.html('User1', './src/inputName.html');
    }


    create() {
        var that = this;
        let lobby = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, 'Victoria');
        lobby.displayHeight = this.game.canvas.height
        lobby.displayWidth = this.game.canvas.width;

        let logged = [false, false]
        let p1Name;
        let p2Name;

        let player1 = this.add.sprite(200, 450 - 50, 'P1');
        player1.setScale(0.8)
        var textP1 = this.add.bitmapText(player1.x - 100, player1.y - 205, 'MotionControl', "Introduzca su nombre", -30);

        var inputTextP1 = this.add.dom(player1.x+25, player1.y + 200).createFromCache('User1');


        inputTextP1.addListener('keyup');


        inputTextP1.on('keyup', function (event) {

            //if (event.target.name === 'playButton') {
            var inputText = this.getChildByName('nameField');
            if (event.key === 'Enter') {
                //  Have they entered anything?
                if (inputText.value !== '') {
                    //  Turn off the click events
                    this.removeListener('keyup');

                    //  Hide the login element
                    this.setVisible(false);
                    that.summitP1.setVisible(false);
                    that.summitP1Texto.setVisible(false);
                    p1Name = inputText.value;
                    //  Populate the text with whatever they typed in
                    textP1.setText('Jugador 1 ' + inputText.value);
                    logged[0] = true;
                    inputText.value = ''
                } else {
                    //  Flash the prompt
                    this.scene.tweens.add({
                        targets: textP1,
                        alpha: 0.2,
                        duration: 250,
                        ease: 'Power3',
                        yoyo: true
                    });
                }
            }

        });



        let player2 = this.add.sprite(880, 450 - 50, 'P2')
        player2.flipX = true;
        player2.setScale(0.8)
        var textP2 = this.add.bitmapText(player2.x - 100, player2.y - 205, 'MotionControl', "Introduzca su nombre", -30);

        var inputTextP2 = this.add.dom(player2.x+25, player2.y + 200).createFromCache('User1');


        inputTextP2.addListener('keyup');


        inputTextP2.on('keyup', function (event) {

            //if (event.target.name === 'playButton') {
            var inputText = this.getChildByName('nameField');
            if (event.key === 'Enter') {
                //  Have they entered anything?
                if (inputText.value !== '') {
                    //  Turn off the click events
                    this.removeListener('keyup');
                    p2Name = inputText.value
                    //  Hide the login element
                    this.setVisible(false);
                    that.summitP2.setVisible(false);
                    that.summitP2Texto.setVisible(false);

                    //  Populate the text with whatever they typed in
                    textP2.setText('Jugador 2 ' + inputText.value);
                    logged[1] = true;
                    inputText.value = ''
                } else {
                    //  Flash the prompt
                    this.scene.tweens.add({
                        targets: textP2,
                        alpha: 0.2,
                        duration: 250,
                        ease: 'Power3',
                        yoyo: true
                    });
                }
            }

        });









        //BOTONES//
        //BOTONES//
        //BOTONES//
        //BOTONES//
        //BOTONES//
        //BOTONES//
        //BOTONES//
        //BOTONES//


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
            let textoP1 = inputTextP1.getChildByName('nameField').value
            let textoP2 = inputTextP2.getChildByName('nameField').value
            if (textoP1 !== '') {

                inputTextP1.removeListener('keyup');
                inputTextP1.setVisible(false);
                p1Name = textoP1;
                textP1.setText('Jugador 1 ' + textoP1);
                logged[0] = true;
                textoP1 = ''
            }


            if (textoP2 !== '') {
                //  Turn off the click events
                inputTextP2.removeListener('keyup');
                p2Name = textoP2
                //  Hide the login element
                inputTextP2.setVisible(false);

                //  Populate the text with whatever they typed in
                textP2.setText('Jugador 2 ' + textoP2);
                logged[1] = true;
                textoP2 = ''
            }


            if (logged[0] === true && logged[1] === true)
                this.scene.start("Scene_play", { escena: null, soundManager: this.soundManager, users: { p1: { user: p1Name }, p2: { user: p2Name } } });
        })

        this.cjT = this.add.bitmapText(pbCM.x - 53, pbCM.y + 10, 'MotionControl', "Jugar", -60);
        this.cjT.tint = "#000000";







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


            this.scene.start("SelectorDePartidas", { escena: null, soundManager: this.soundManager })


        })

        let salirTexto = this.add.bitmapText(salirBoton.x - 55, salirBoton.y + 10, 'MotionControl', "Salir", -60);
        salirTexto.tint = "#000000";





        this.summitP1 = this.add.sprite(player1.x-5, player1.y+225, "buttonPlay");
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

            var inputText = inputTextP1.getChildByName('nameField').value
            console.log(inputText)
            if (inputText !== '') {
                //  Turn off the click events
                inputTextP1.removeListener('keyup');

                p1Name = inputText;
                //  Populate the text with whatever they typed in
                textP1.setText('Jugador 1 ' + inputText)

                //  Hide the login element
                inputTextP1.setVisible(false);
                this.summitP1.setVisible(false);
                this.summitP1Texto.setVisible(false);
                ;
                logged[0] = true;
                inputTextP1.value = ''
            }else{
                alert("Escriba un nombre de usuario")
                
            }

        })


        this.summitP2 = this.add.sprite(player2.x-5, player2.y+225, "buttonPlay");
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

            var inputText = inputTextP2.getChildByName('nameField').value
            console.log(inputText)
            if (inputText !== '') {
                //  Turn off the click events
                inputTextP2.removeListener('keyup');

                p2Name = inputText;
                //  Populate the text with whatever they typed in
                textP2.setText('Jugador 2 ' + inputText)

                //  Hide the login element
                inputTextP2.setVisible(false);
                this.summitP2.setVisible(false);
                this.summitP2Texto.setVisible(false);
                ;
                logged[1] = true;
                inputTextP2.value = ''
            } else {
                //  Flash the prompt
                alert("Escriba un nombre de usuario")
            }

        })

        this.summitP2Texto = this.add.bitmapText(this.summitP2.x - 47, this.summitP2.y + 7, 'MotionControl', "Loguearse", -25);
        this.summitP2Texto.tint = "#000000";

    }






}

export default Lobby;