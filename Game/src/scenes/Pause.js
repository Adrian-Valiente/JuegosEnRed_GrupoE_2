const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Pause extends Phaser.Scene {
    constructor() {
        super({ key: "Pause" });

    }
    init(data) {
        this.data = data;
        this.online = data.online
        if (this.online) {
            this.partidaDatos = data.partida;
            this.yo = data.yo
        }

    }

    preload() {

    }


    create() {

        console.log("Pausa iniciada")
        this.keyboard = this.input.keyboard.addKeys('ESC');
        this.input.keyboard.on('keyup-' + 'ESC', this.unlock.bind(this));

        let pause = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, "sonido");
        pause.displayHeight = this.game.canvas.height * 0.85;
        pause.displayWidth = this.game.canvas.width * 0.65;
        this.print0 = this.add.text(this.game.canvas.width / 2 - 75, this.game.canvas.height / 2 - 100, '').setFontSize(45)
        this.textoSalir = this.add.bitmapText(287, 126, "MotionControl", "", -60).setDepth(100);
        this.textoSalir.tint="#000000";
        

        if (this.scene.isActive("Scene_play")) {
            console.log("Iniciando pausa en Scene_play")
            this.scene.pause("Scene_play")


            let reanudar = this.crearBotonRenudar();

            let salir = this.crearBotonSalir();


            let config = this.crearBotonConfig(reanudar, salir);
        }



        if (this.scene.isActive("Tutorial")) {

            console.log("Iniciando pausa en tutorial")
            this.scene.pause("Tutorial")

            let reanudar = this.crearBotonRenudar();



            let salir = this.crearBotonSalir();




            let config = this.crearBotonConfig(reanudar, salir);


        }








    }
    unlock() {
        console.log("unlock")

        this.keyLock = false;
    }


    update() {

        if (this.keyboard.ESC.isDown === true) {
            console.log("Intentando salir")
            if (this.scene.isPaused("Scene_play")) {
                this.scene.resume("Scene_play");
                this.data.escena.continuarP1();
                this.data.escena.continuarP2();
                console.log("Saliendo de la pausa")
                this.scene.stop("Pause");
            }
            if (this.scene.isPaused("Tutorial")) {
                this.scene.resume("Tutorial");
                console.log("Saliendo de la pausa")
                this.scene.stop("Pause");
            }
        }


    }




    crearBotonRenudar() {

        let reanudar = this.add.image(this.game.canvas.width / 2, this.game.canvas.height * 0.3, "buttonPlay");
        reanudar.displayHeight = this.game.canvas.height * 0.1;
        reanudar.displayWidth = this.game.canvas.width * 0.2;
        reanudar.setInteractive();

        reanudar.on("pointerover", () => {
            reanudar.setFrame(1);
        })

        reanudar.on("pointerout", () => {
            reanudar.setFrame(0);
        })

        reanudar.on("pointerdown", () => {
            reanudar.setFrame(2);
        })

        reanudar.on("pointerup", () => {
            if (this.scene.isPaused("Tutorial")) {
                this.scene.resume("Tutorial");
                this.scene.stop("Pause");
            }
            if (this.scene.isPaused("Scene_play")) {
                this.scene.resume("Scene_play");
                this.data.escena.continuarP1();
                this.data.escena.continuarP2();
                this.scene.stop("Pause");
            }
        })
        reanudar.texto = this.add.bitmapText(reanudar.x - 65, reanudar.y - 25, "MotionControl", "Reanudar", -40);
        reanudar.texto.tint="#000000";

        
        return reanudar;

    }

    crearBotonSalir() {

        let salir = this.add.image(this.game.canvas.width / 2, this.game.canvas.height * 0.7, "buttonPlay");
        salir.displayHeight = this.game.canvas.height * 0.1;
        salir.displayWidth = this.game.canvas.width * 0.2;
        salir.texto = this.add.bitmapText(salir.x - 34, salir.y - 25, "MotionControl", "Salir", -40);
        salir.texto.tint="#000000";

        
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

        salir.on("pointerup", () => {
            if (this.scene.isPaused("Tutorial")) {
                this.scene.stop("Tutorial");
                this.data.escena.keyDelete();
                this.cerrarEscenas();
                this.scene.launch("MAINMENU");

                this.scene.stop("Pause");
            }
            if (this.scene.isPaused("Scene_play")) {
                if (this.online) {
                    this.data.escena.borrarIntervalos();
                    this.cerrarEscenas();
                    this.data.escena.eliminarUsuario(this.data.escena.yo,()=>{
                      
                        this.scene.start("MAINMENU", { escena: null, soundManager: this.data.escena.soundManager });
                    })

                } else {
                    this.data.escena.borrarIntervalos();
                    this.cerrarEscenas();
                    this.scene.stop("Scene_play");
                    this.scene.start("MAINMENU");
                    this.scene.stop("Pause");
                }

            }
        })

        return salir;
    }

    crearBotonConfig(reanudar, salir) {

        let config = this.add.image(this.game.canvas.width / 2, this.game.canvas.height * 0.5, "buttonPlay");
        config.displayHeight = this.game.canvas.height * 0.1;
        config.displayWidth = this.game.canvas.width * 0.2;
        config.setInteractive();

        config.on("pointerover", () => {
            config.setFrame(1);
        })

        config.on("pointerout", () => {
            config.setFrame(0);
        })

        config.on("pointerdown", () => {
            config.setFrame(2);
        })

        let r = reanudar;
        let s = salir;
        let texConfig = this.add.bitmapText(config.x - 46, config.y - 25, "MotionControl", "Sonido", -40);        
        texConfig.tint="#000000";

        config.on("pointerup", () => {
            let salir;
            if (this.scene.isPaused("Tutorial")) {
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

                this.textoSalir.text = 'Salir'

                salir.on("pointerup", () => {
                    this.print0.text = ''
                    this.textoSalir.text = ''
                    salir.destroy();
                    this.Slider.destroy();
                    let re = this.crearBotonRenudar();
                    let sa = this.crearBotonSalir();
                    this.crearBotonConfig(re, sa);
                })

                config.destroy();
                texConfig.destroy();
                r.texto.destroy();
                r.destroy();
                s.texto.destroy();
                s.destroy();

                this.createSliderSound();
            }


            if (this.scene.isPaused("Scene_play")) {
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

                
                this.textoSalir.text = 'Salir'

                salir.on("pointerup", () => {
                    this.print0.text = ''
                    this.textoSalir.text = ''
                    salir.destroy();
                    this.Slider.destroy();
                    let re = this.crearBotonRenudar();
                    let sa = this.crearBotonSalir();
                    this.crearBotonConfig(re, sa);
                })

                config.destroy();
                texConfig.destroy();
                r.texto.destroy();
                r.destroy();
                s.texto.destroy();
                s.destroy();
                this.createSliderSound();
            }



        })



        return config
    }

    cambiarSonido(value) {
        console.log("Cambiando el sonido")
        this.data.escena.soundManager.volume = value;
        this.data.escena.soundManager.resumeAll();

        console.log(this.data.escena.soundManager.volume)
    }

    createSliderSound() {
        var that = this

        //this.cambiarSonido();
        //var cambiar= this.cambiarSonido;
        //cambiar();
        let form = "<input type=\"range\" min=\"1\" max=\"100\" value=\"50\"  id=\"myRange\">"
        this.Slider = this.add.dom(this.game.canvas.width / 2, this.game.canvas.height / 2).createFromHTML(form)
        $('#myRange').change(function (e) {
            let valor = e.currentTarget.valueAsNumber;
            let newValue = valor / 100;
            that.cambiarSonido(newValue);
            that.print0.text = newValue;

        });



    }

    cerrarEscenas() {
        if (this.game.scene.isActive("CintaP1")) {
            this.game.scene.stop("CintaP1");

        }
        if (this.game.scene.isActive("CintaP1V2")) {
            this.game.scene.stop("CintaP1V2");

        }
        if (this.game.scene.isActive("ContadorP1")) {
            this.game.scene.stop("ContadorP1");

        }
        if (this.game.scene.isActive("ElectricidadP1")) {
            this.game.scene.stop("ElectricidadP1");

        }
        if (this.game.scene.isActive("ElectricidadP1V2")) {
            this.game.scene.stop("ElectricidadP1V2");
            this.blurElectricidadU.alpha = 0;
        }
        if (this.game.scene.isActive("LaboratorioP1")) {
            this.game.scene.stop("LaboratorioP1");

        }
        if (this.game.scene.isActive("CintaP2")) {
            this.game.scene.stop("CintaP2");

        }
        if (this.game.scene.isActive("CintaP2V2")) {
            this.game.scene.stop("CintaP2V2");

        }
        if (this.game.scene.isActive("ContadorP2")) {
            this.game.scene.stop("ContadorP2");

        }
        if (this.game.scene.isActive("ElectricidadP2")) {
            this.game.scene.stop("ElectricidadP2");

        }
        if (this.game.scene.isActive("ElectricidadP2V2")) {
            this.game.scene.stop("ElectricidadP2V2");

        }
        if (this.game.scene.isActive("LaboratorioP2")) {
            this.game.scene.stop("LaboratorioP2");

        }
        if (this.game.scene.isActive("CintaTP1")) {
            this.game.scene.stop("CintaTP1");

        }
        if (this.game.scene.isActive("CintaTP2")) {
            this.game.scene.stop("CintaTP2");

        }
        if (this.game.scene.isActive("ContadorTP1")) {
            this.game.scene.stop("ContadorTP1");

        }
        if (this.game.scene.isActive("ContadorTP2")) {
            this.game.scene.stop("ContadorTP2");

        }
        if (this.game.scene.isActive("ElectricidadTP1")) {
            this.game.scene.stop("ElectricidadTP1");

        }
        if (this.game.scene.isActive("ElectricidadTP2")) {
            this.game.scene.stop("ElectricidadTP2");

        }
        if (this.game.scene.isActive("LaboratorioTP1")) {
            this.game.scene.stop("LaboratorioTP1");

        }
        if (this.game.scene.isActive("LaboratorioTP2")) {
            this.game.scene.stop("LaboratorioTP2");

        }
        this.data.escena.escenasActivas[0] = false;
        this.data.escena.escenasActivas[1] = false;

    }





}
export default Pause;