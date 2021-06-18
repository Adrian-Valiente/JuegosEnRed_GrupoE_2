
//Clase que usamos para cargar los sprites

class Bootloader extends Phaser.Scene {
    constructor() {
        super({ key: "Bootloader" });
    }
    preload() {
        this.load.on("complete", () => {
            this.scene.start("TeamScreen", { escena: null, soundManager: this.soundManager });
        });    

        //Init//
  
        this.load.image("Presentacion_3", "./assets/Presentacion_3.png");
        //Fuente texto//

        this.load.bitmapFont('Digitalism', './assets/Digitalism.png', './assets/Digitalism.xml')
        this.load.bitmapFont('Fuente', './assets/Fuente_0.png', './assets/Fuente.xml')
        this.load.bitmapFont('MotionControl', './assets/MotionControl_0.png', './assets/MotionControl.xml')


        //Tutorial//

        this.load.image("Tutorial", "./assets/Tutorial.png");
        this.load.image("TutorialBlur", "./assets/ComoJugarBlur.png");
        this.load.image("CintaJ1T", "./assets/Tutorial/CintaJ1.png");
        this.load.image("CintaJ2T", "./assets/Tutorial/CintaJ2.png");
        this.load.image("ElectricidadJ1T", "./assets/Tutorial/ElectricidadJ1.png");
        this.load.image("ElectricidadJ2T", "./assets/Tutorial/ElectricidadJ2.png");
        this.load.image("GeneralesJ1T", "./assets/Tutorial/GeneralesJ1.png");
        this.load.image("GeneralesJ2T", "./assets/Tutorial/GeneralesJ2.png");
        this.load.image("PulsadorJ1T", "./assets/Tutorial/PulsadorJ1.png");
        this.load.image("PulsadorJ2T", "./assets/Tutorial/PulsadorJ2.png");
        this.load.image("SimbolosJ1T", "./assets/Tutorial/SimbolosJ1.png");
        this.load.image("SimbolosJ2T", "./assets/Tutorial/SimbolosJ2.png");

        //Loading//

        this.load.image("Loading", "./assets/carga.jpg");
        this.load.image("Loading1", "./assets/carga1.jpg");
        this.load.image("Loading2", "./assets/carga2.jpg");

        //Gimnasio//

        this.load.image("Gimnasio", "./assets/Gimnasio.png");
        this.load.image("CintaReposo", "./assets/CintaReposo.png");
        this.load.image("GimnasioBlur", "./assets/GimnasioBlur.png")
        this.load.spritesheet("CintaCorrer", "./assets/CintaAnimada.jpg", { frameWidth: 500, frameHeight: 600 });
        this.load.image("gymplatform", "./assets/GymPlat.png");
        this.load.image("cintaSprite", "./assets/CintaSprite.png");


        //Contador//

        this.load.image("Pulsador", "./assets/Pulsador.png");
        this.load.image("ContadorBlur", "./assets/ContadorBlur.png");
        this.load.image("Contador", "./assets/Contador2.png")
        this.load.spritesheet("PulsadorA", "./assets/PulsadorAnimacion.png", { frameWidth: 500, frameHeight: 600 });

        this.load.image("spriteCont", "./assets/contadorSprite.png");
        this.load.image("contplatform", "./assets/ContPlat.png");
        this.load.image("telon", "./assets/Telon.png");
        //Nieve//

        this.load.image("Bandera", "./assets/Bandera.png");
        this.load.image("Nieve", "./assets/NivelHelado.png");
        this.load.image("snowplat", "./assets/PlataformasNieve.png");
        this.load.image("flag", "./assets/Bandera.png");

        //Electricidad//

        this.load.image("Electricidad", "./assets/NivelElectricidad.png");
        this.load.image("ElectricidadBlur", "./assets/NivelElectricidadBlur.png");
        this.load.image("PruebaElectricidad", "./assets/PruebaElectricidadVacia.png")
        this.load.image("PruebaElectricidad2", "./assets/Pantalla2Sin.png")
        this.load.image("PruebaElectricidadPieza1", "./assets/Piezas/Pieza1.1.png");
        this.load.image("PruebaElectricidadPieza2", "./assets/Piezas/Pieza1.3.png");
        this.load.image("PruebaElectricidadPieza3", "./assets/Piezas/Pieza2.3.png");
        this.load.image("Marco", "./assets/Piezas/Marco.png");
        this.load.image("BombillaEncendida", "./assets/Piezas/BombillaEncendida.png");
        this.load.image("elecplatform", "./assets/PlataformasElectricidad.png");
        this.load.image("Enchufe", "./assets/Enchufe.png");

        //Menu//
        this.load.image("menu", "./assets/MainMenu2.jpg");
        this.load.spritesheet("FlagSheet2", "./assets/FlagSheet2.png", { frameWidth: 450, frameHeight: 300 }); //banderas
        this.load.spritesheet("Play", "./assets/Play.png", { frameWidth: 299, frameHeight: 137 }); //botón de play
        this.load.spritesheet("buttonPlay", "./assets/SpriteBotones.png", { frameWidth: 440, frameHeight: 122 });

        //Laboratorio//

        this.load.image("Laboratorio", "./assets/Laboratorio.png");
        this.load.image("LaboratorioBlur", "./assets/LaboratorioBlur.png");
        this.load.image("Ordenador", "./assets/Ordenador.png");
        this.load.image("PruebaLaboratorio", "./assets/OrdenadorPrueba.png");
        this.load.image("FlechaSelect", "./assets/PiezasLab/FlechaSelect.png");
        this.load.image("PruebaLaboratorioPieza1", "./assets/PiezasLab/Simbolo1.png");
        this.load.image("PruebaLaboratorioPieza2", "./assets/PiezasLab/Simbolo5.png");
        this.load.image("PruebaLaboratorioPieza3", "./assets/PiezasLab/Simbolo7.png");
        this.load.image("PruebaLaboratorioPieza4", "./assets/PiezasLab/Simbolo8.png");
        this.load.image("PruebaLaboratorioPieza5", "./assets/PiezasLab/Simbolo9.png");
        this.load.image("labplatform", "./assets/PlataformasLaboratorio.png");





        //Otros//
        this.load.image("cronoP1", "./assets/CronoJ1.png")
        this.load.image("cronoP2", "./assets/CronoJ2.png")
        this.load.image("muro", "./assets/Muro.png");
        this.load.image("logo", "./assets/Logo.jpg")
        this.load.image("Crono", "./assets/Cronometro.png")
        this.load.image("Desconectado", "./assets/Desconectado.png")
        this.load.image("Conectado", "./assets/Conectado.png")
        this.load.image("Ready", "./assets/tick.png")
        this.load.image("Missing", "./assets/missing.png")
        this.load.image("Botones", "./assets/BaseBoton.png")

        //Efectos//

        this.load.atlas('flares', './assets/flares.png', './assets/flares.json');
        this.load.image('snowFlake', './assets/snowFlakeC.png');

        //Sonidos//

        this.load.audio("Paso1", "./assets/Sonidos/Paso1.mp3", { instances: 10 });
        this.load.audio("Reloj", "./assets/Sonidos/Reloj.mp3");
        this.load.audio("TeletransporteFinal", "./assets/Sonidos/TeletransporteFinal.mp3", { instances: 2 });
        this.load.audio("Musica_fondo", "./assets/Sonidos/Musica_fondo.mp3");
        this.load.audio("Laser1", "./assets/Sonidos/Laser1.mp3");
        this.load.audio("electricidad", "./assets/Sonidos/electricidad.mp3", { instances: 10 });
        this.load.audio("campanas", "./assets/Sonidos/campanas.mp3");
        this.load.audio("Congelar", "./assets/Sonidos/Congelar.mp3");
        this.soundManager = this.sound;
        //Animaciones//

        this.load.atlas("P1", "./assets/RunP1.png", "./assets/RunP1.json")
        this.load.atlas("P2", "./assets/RunP2.png", "./assets/RunP2.json")
        this.load.spritesheet("portal", "./assets/SpriteSheetPortal.png", { frameWidth: 168, frameHeight: 310 });


        //PoweUps//
        this.load.image('run', './assets/RUN.png');
        this.load.image('menosT', './assets/relojArena.png');
        this.load.image('Foco', './assets/foco.png');
        this.load.image('laser', './assets/laser.png');
        this.load.spritesheet("timeMAS", "./assets/Time++SSheet.png", { frameWidth: 437, frameHeight: 678 });
        //MenuPausa//
        this.load.image("sonido", './assets/Sonido.jpg');
        this.load.image('menuPausa', './assets/Pausa.jpg');
        //this.load.image('menuPausa', './assets/MenuPausa.jpg');
        this.load.image('botonPausa', './assets/botonPausa.png');
        //VICTORIA//
        this.load.image('Victoria', './assets/Victoria.jpg')







        //barra de carga

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })

        this.load.on("progress", (percent => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
        }))

        //

    }
    create() {

        ////////////////////////////////////////////////
        ///////////////////////////////////////////////

        //Player 1

        this.anims.create({
            key: 'CorrerDerechaP1',
            frames: [{
                key: 'P1',
                frame: "DPose1DchaPJ1.png"
            },
            {
                key: 'P1',
                frame: "DPose2DchaPJ1.png"
            },
            {
                key: 'P1',
                frame: "DPose3DchaPJ1.png"
            },
            {
                key: 'P1',
                frame: "DPose4DchaPJ1.png"
            },
            {
                key: 'P1',
                frame: "DPose5DchaPJ1.png"
            },
            {
                key: 'P1',
                frame: "DPose6DchaPJ1.png"
            },
            {
                key: 'P1',
                frame: "DPose7DchaPJ1.png"
            },
            {
                key: 'P1',
                frame: "DPose8DchaPJ1.png"
            }
            ],
            repeat: -1,
            frameRate: 8
        })
        this.anims.create({
            key: 'IdleDerechaP1',
            frames: [{
                key: 'P1',
                frame: "DIdleDchaPJ1.png"
            }
            ],
            repeat: 0,
            frameRate: 8
        })
        this.anims.create({
            key: 'SaltoDerechaP1',
            frames: [{
                key: 'P1',
                frame: "DSaltoDchaPJ1.png"
            }
            ],
            repeat: 0,
            frameRate: 8
        })
        this.anims.create({
            key: 'CorrerIzquierdaP1',
            frames: [{
                key: 'P1',
                frame: "Pose1IzqPJ1.png"
            },
            {
                key: 'P1',
                frame: "Pose2IzqPJ1.png"
            },
            {
                key: 'P1',
                frame: "Pose3IzqPJ1.png"
            },
            {
                key: 'P1',
                frame: "Pose4IzqPJ1.png"
            },
            {
                key: 'P1',
                frame: "Pose5IzqPJ1.png"
            },
            {
                key: 'P1',
                frame: "Pose6IzqPJ1.png"
            },
            {
                key: 'P1',
                frame: "Pose7IzqPJ1.png"
            },
            {
                key: 'P1',
                frame: "Pose8IzqPJ1.png"
            },

            ],
            repeat: 1,
            frameRate: 8
        })

        this.anims.create({
            key: 'IdleIzquierdaP1',
            frames: [{
                key: 'P1',
                frame: "IdleIzqPJ1.png"
            }
            ],
            repeat: 0,
            frameRate: 8
        })
        this.anims.create({
            key: 'SaltoIzquierdaP1',
            frames: [{
                key: 'P1',
                frame: "SaltoIzqPJ1.png"
            }
            ],
            repeat: 0,
            frameRate: 8
        })
        /////////////////////////////////////////////////////////7
        //////////////////////////////////////////////////////////

        this.anims.create({
            key: 'CorrerDerechaP2',
            frames: [{
                key: 'P2',
                frame: "DPose1DchaPJ2.png"
            },
            {
                key: 'P2',
                frame: "DPose2DchaPJ2.png"
            },
            {
                key: 'P2',
                frame: "DPose3DchaPJ2.png"
            },
            {
                key: 'P2',
                frame: "DPose4DchaPJ2.png"
            },
            {
                key: 'P2',
                frame: "DPose5DchaPJ2.png"
            },
            {
                key: 'P2',
                frame: "DPose6DchaPJ2.png"
            },
            {
                key: 'P2',
                frame: "DPose7DchaPJ2.png"
            },
            {
                key: 'P2',
                frame: "DPose8DchaPJ2.png"
            }
            ],
            repeat: -1,
            frameRate: 8
        })
        this.anims.create({
            key: 'IdleDerechaP2',
            frames: [{
                key: 'P2',
                frame: "DIdleDchaPJ2.png"
            }
            ],
            repeat: 0,
            frameRate: 8
        })
        this.anims.create({
            key: 'SaltoDerechaP2',
            frames: [{
                key: 'P2',
                frame: "DSaltoDchaPJ2.png"
            }
            ],
            repeat: 0,
            frameRate: 8
        })


        this.anims.create({
            key: 'CorrerIzquierdaP2',
            frames: [{
                key: 'P2',
                frame: "Pose1IzqPJ2.png"
            },
            {
                key: 'P2',
                frame: "Pose2IzqPJ2.png"
            },

            {
                key: 'P2',
                frame: "Pose3IzqPJ2.png"
            },

            {
                key: 'P2',
                frame: "Pose4IzqPJ2.png"
            },

            {
                key: 'P2',
                frame: "Pose5IzqPJ2.png"
            },

            {
                key: 'P2',
                frame: "Pose6IzqPJ2.png"
            },

            {
                key: 'P2',
                frame: "Pose7IzqPJ2.png"
            },

            {
                key: 'P2',
                frame: "Pose8IzqPJ2.png"
            },




            ],
            repeat: 1,
            frameRate: 8
        })

        this.anims.create({
            key: 'IdleIzquierdaP2',
            frames: [{
                key: 'P2',
                frame: "IdleIzqPJ2.png"
            }
            ],
            repeat: 0,
            frameRate: 8
        })

        this.anims.create({
            key: 'SaltoIzquierdaP2',
            frames: [{
                key: 'P2',
                frame: "SaltoIzqPJ2.png"
            }
            ],
            repeat: 0,
            frameRate: 8
        })

        /////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////

        this.anims.create({
            key: 'CintaA',
            frames: this.anims.generateFrameNumbers('CintaCorrer', { frames: [0, 1, 2, 3] }),
            repeat: 0,
            frameRate: 0
        })
        this.anims.create({
            key: 'CintaP',
            frames: this.anims.generateFrameNumbers('CintaCorrer', { frames: [3] }),
            repeat: 0,
            frameRate: 8
        })
        this.anims.create({
            key: 'PulsadorP',
            frames: this.anims.generateFrameNumbers('PulsadorA', { frames: [9] }),
            repeat: 0,
            frameRate: 5
        })
        this.anims.create({
            key: 'PulsadorC',
            frames: this.anims.generateFrameNumbers('PulsadorA', { frames: [0, 1, 2, 3] }),
            repeat: 0,
            frameRate: 5
        })
        this.anims.create({
            key: 'PulsadorB',
            frames: this.anims.generateFrameNumbers('PulsadorA', { frames: [4, 5, 6, 7, 8] }),
            repeat: 0,
            frameRate: 8
        })


        //banderas
        this.anims.create({
            key: "wave",
            frames: this.anims.generateFrameNumbers("FlagSheet2", { frames: [0, 1, 2, 3, 4, 5] }),
            repeat: -1,
            frameRate: 6

        })

        //portal
        this.anims.create({
            key: 'portalAnim',
            frames: this.anims.generateFrameNumbers("portal", { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8] }),
            repeat: -1,
            frameRate: 6
        })

        //TimePLUS
        this.anims.create({
            key: "timePlus",
            frames: this.anims.generateFrameNumbers("timeMAS", { frames: [0, 1, 2] }),
            repeat: -1,
            frameRate: 3
        })



        //Particulas

        this.anims.create({
            key: 'flares',
            frames: [{
                key: 'blue',
                frame: { "x": 2, "y": 2, "w": 128, "h": 128 },
                rotated: false,
                trimmed: false,
                spriteSourceSize: { "x": 0, "y": 0, "w": 128, "h": 128 },
                sourceSize: { "w": 128, "h": 128 },
                pivot: { "x": 0.5, "y": 0.5 }
            },
            {
                key: 'green',

                frame: { "x": 132, "y": 2, "w": 128, "h": 128 },
                rotated: false,
                trimmed: false,
                spriteSourceSize: { "x": 0, "y": 0, "w": 128, "h": 128 },
                sourceSize: { "w": 128, "h": 128 },
                pivot: { "x": 0.5, "y": 0.5 }
            },
            {
                key: 'red',

                "frame": { "x": 262, "y": 2, "w": 128, "h": 128 },
                "rotated": false,
                "trimmed": false,
                "spriteSourceSize": { "x": 0, "y": 0, "w": 128, "h": 128 },
                "sourceSize": { "w": 128, "h": 128 },
                "pivot": { "x": 0.5, "y": 0.5 }

            },
            {
                key: 'white',

                "frame": { "x": 392, "y": 2, "w": 128, "h": 128 },
                "rotated": false,
                "trimmed": false,
                "spriteSourceSize": { "x": 0, "y": 0, "w": 128, "h": 128 },
                "sourceSize": { "w": 128, "h": 128 },
                "pivot": { "x": 0.5, "y": 0.5 }
            },
            {
                key: 'yellow',
                "frame": { "x": 522, "y": 2, "w": 128, "h": 128 },
                "rotated": false,
                "trimmed": false,
                "spriteSourceSize": { "x": 0, "y": 0, "w": 128, "h": 128 },
                "sourceSize": { "w": 128, "h": 128 },
                "pivot": { "x": 0.5, "y": 0.5 }

            }


            ],
            repeat: 0,
            frameRate: 8
        })


        //Sonidos


        this.soundManager.add('campanas');
        this.soundManager.add('Paso1')
        this.soundManager.add('Reloj')
        this.soundManager.add('Musica_fondo');
        this.soundManager.add('TeletransporteFinal');
        this.soundManager.volume = 1;




    }
}

export default Bootloader;