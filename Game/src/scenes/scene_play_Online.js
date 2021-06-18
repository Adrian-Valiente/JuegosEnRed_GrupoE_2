import Escenario from '../gameObjects/Escenario.js';
class Scene_play_Online extends Phaser.Scene {
    constructor() {
        super({ key: "Scene_play_Online" });
        this.escenasActivas = [false, false];

        this.escenarios = [];
        //NUEVO, ARRAY DE PLATAFORMAS
        this.plataformasGimnasioP1 = [];
        this.plataformasGimnasioP2 = [];
        this.plataformasContadorP1 = [];
        this.plataformasContadorP2 = [];
        this.plataformasElectricidadP1 = [];
        this.plataformasElectricidadP2 = [];
        this.plataformasLaboratorioP1 = [];
        this.plataformasLaboratorioP2 = [];
        this.plataformasNieveP1 = [];
        this.plataformasNieveP2 = [];
        this.ultimaActualizacionPlataforma = 0;
        this.ActivarPausa=true;

    }
    init(data) {
        this.soundManager = data.soundManager;
        this.data = data;
        this.data.lobby;
        this.online = data.online
        if (this.online) {
            this.partidaDatos = data.partida;
            this.yo = data.yo
            this.lobby = this.data.lobby;
            //playerPulse
            var handler = new WebSocket('ws://127.0.0.1:8080/' + this.data.lobby.nombre);
            this.handler = handler;

            this.handler.onerror = function (e) {
                console.log("WS error: " + e);
            }


            this.handler.onopen = function () {
                console.log("Estamos conectados al puerto, naaah de locos");
            }



        }

    }
    preload() {
        // let aux = [0, 1];
        // let tamanio = 3;
        // let posiciones = [];
        // for (let i = 0; i < tamanio; i++) {
        //     let numero = Math.round(Math.random() * (tamanio - 1));
        //     posiciones[i] = aux[numero];
        //     aux.splice(numero, 1);
        // }

    }
    create() {

        this.borrarIntervalos();
        this.ActivarControles = false;
        /*        
           let tamanio=escenas.length;
             let i=0;
            for(tamanio;tamanio>0;tamanio--){
                if(tamanio==1){
                    escenasP1[i]=escenas[0];
                    escenasP2[i]=escenas[0];
                    
            }else{
                let numero=Math.round(Math.random()*(tamanio-1));
                console.log("El numerito : "+numero);
                escenasP1[i]=escenas[numero];
                escenasP2[i]=escenas[numero];
                escenas.splice(numero,1);
                i++;
            }
            console.log("Iterando y tal")
    
            }
             console.log(escenasP1,escenasP2);
            //*/



        // ! poner un fondo enorme que tape todo para simular que esta cargando todo

        this.loadingBG = this.add.image(0, 0, "Loading").setOrigin(0, 0).setSize(this.game.canvas.width, this.game.canvas.height);

        //Pensar esto un pcoo mejor
        this.escenarios[0] = new Escenario("Cinta", 0, true);
        this.escenarios[1] = new Escenario("Contador", 1, false);
        this.escenarios[2] = new Escenario("Nieve", 4, false);
        this.escenarios[3] = new Escenario("Electricidad", 2, true);
        this.escenarios[4] = new Escenario("Laboratorio", 3, false);

        this.physics.world.setBounds(0, 0, 5800, this.game.canvas.height);
        var that = this;

        this.end = { player1: false, player2: false };
        this.Eauxiliar = false;

        //Factor de suma 1180 * this.escenarios[i].pos

        //Esquema : this.add.image( PosicionX + Factor de suma, PosicionX, "Nombre")

        //Player 1//



        this.playerU = this.physics.add.sprite(0, this.game.canvas.height / 2 - 50, 'P1');
        this.playerU.play('IdleDerechaP1');
        this.playerU.setScale(0.15).refreshBody();
        this.playerU.body.collideWorldBounds = true;
        this.playerU.id = 0;
        this.playerU.velocidad = 300;
        this.playerU.time = 0;
        this.playerU.setDepth(1000);
        this.playerU.name = this.data.users.p1.user;
        this.playerU.position = 0;

        //Player 2//

        this.playerD = this.physics.add.sprite(0, this.game.canvas.height - 50, 'P2');
        this.playerD.play('IdleDerechaP2');
        this.playerD.setScale(0.15).refreshBody();
        this.playerD.body.collideWorldBounds = true;
        this.playerD.id = 1;
        this.playerD.time = 0;
        this.playerD.velocidad = 300;
        this.playerD.setDepth(1000);
        this.playerD.name = this.data.users.p2.user;
        this.playerD.position = 0;

        //Cargar sonido


        this.soundManager.play('Musica_fondo', { loop: true })
        this.soundManager.play('campanas')

        // this.soundManager.once('looped',()=>{
        //     this.soundManager.play('Musica_fondo')
        // })

        //Escenario 1 Gimnasio


        //Parte jugador 1

        let gimU = this.add.image(0 + 1180 * this.escenarios[0].pos, 0, "Gimnasio").setOrigin(0, 0);

        gimU.displayHeight = this.game.canvas.height / 2;
        gimU.displayWidth = this.game.canvas.width;
        gimU.setDepth(-9999)

        this.blurGU = this.add.image(0 + 1180 * this.escenarios[0].pos, 0, "GimnasioBlur").setOrigin(0, 0);
        this.blurGU.displayHeight = this.game.canvas.height / 2 - 10;
        this.blurGU.displayWidth = this.game.canvas.width;
        this.blurGU.alpha = 0;

        let cinU = this.add.image(1030 + 1180 * this.escenarios[0].pos, 89, "cintaSprite")

        let cintaU = this.physics.add.image(1024 + 1180 * this.escenarios[0].pos, 121, "muro")
        cintaU.displayHeight = 5;
        cintaU.displayWidth = 78
        cintaU.alpha = 0;


        cinU.setScale(0.30);





        this.particlesCPU = this.add.particles('flares')
        this.particlesCPU.depth = -10

        this.PCU = this.particlesCPU.createEmitter({
            x: { min: cinU.x - 50, max: cinU.x + 50 },
            y: cintaU.y + 10,
            lifespan: 3000,
            speedY: { min: -60, max: -100 },
            scale: { start: 0.3, end: 0 },
            quantity: 1,
            frame: 'white',
            frequency: 300,
            tint: 0x008000,
            blendMode: 'ADD',

        });


        //Parte jugador 2

        let gimD = this.add.image(0 + 1180 * this.escenarios[0].pos, this.game.canvas.height / 2, "Gimnasio").setOrigin(0, 0);

        gimD.displayHeight = this.game.canvas.height / 2;
        gimD.displayWidth = this.game.canvas.width;
        gimD.setDepth(-9999)

        this.blurGD = this.add.image(0 + 1180 * this.escenarios[0].pos, this.game.canvas.height / 2, "GimnasioBlur").setOrigin(0, 0);
        this.blurGD.displayHeight = this.game.canvas.height / 2;
        this.blurGD.displayWidth = this.game.canvas.width;
        this.blurGD.alpha = 0;

        //se ha modificado la posición de la colisión de la cinta para junto a un sprite
        let cintaD = this.physics.add.image(1024 + 1180 * this.escenarios[0].pos, 483, "muro")

        cintaD.displayHeight = 5;
        cintaD.displayWidth = 78
        cintaD.alpha = 0

        let cinD = this.add.image(1030 + 1180 * this.escenarios[0].pos, 449, "cintaSprite") //no oficial

        cinD.setScale(0.30);

        //Plataformas jugador 1
        // !  this.crearPlataformasGimnasioP1();

        //Plataformas jugador 2
        // ! this.crearPlataformasGimnasioP2();

        //Power Up jugador 1
        this.crearSpeedUpP1(825, 300, this.escenarios[0].pos);

        this.crearMenosTP1(60, 85, this.escenarios[0].pos);

        //Power Up jugador 2
        this.crearSpeedUpP2(825, 300, this.escenarios[0].pos);

        this.crearMenosTP2(60, 85, this.escenarios[0].pos);






        //Power Up jugador 2
        this.crearSpeedUpP2();

        this.particlesCPD = this.add.particles('flares')
        this.particlesCPD.depth = -10

        this.PCD = this.particlesCPD.createEmitter({
            x: { min: cinD.x - 50, max: cinD.x + 50 },
            y: cintaD.y + 10,
            lifespan: 3000,
            speedY: { min: -60, max: -100 },
            scale: { start: 0.3, end: 0 },
            quantity: 1,
            frame: 'white',
            frequency: 300,
            tint: 0x008000,
            blendMode: 'ADD',

        });


        //Escenario 2 Contador

        //Parte jugador 1

        let escU2 = this.add.image(0 + 1180 * this.escenarios[1].pos, 0, "Contador").setOrigin(0, 0);

        escU2.displayHeight = this.game.canvas.height / 2;
        escU2.displayWidth = this.game.canvas.width;


        let pContU = this.add.image(830 + 1180 * this.escenarios[1].pos, 242, "spriteCont").setOrigin(0, 0);
        pContU.displayHeight = this.game.canvas.height * 0.1;
        pContU.displayWidth = this.game.canvas.width * 0.08;

        let pruebaContador = this.physics.add.image(830 + 1180 * this.escenarios[1].pos, 309, "muro").setOrigin(0, 0);
        pruebaContador.setImmovable(true)
        pruebaContador.displayWidth = 95;
        pruebaContador.displayHeight = 5;
        pruebaContador.alpha = 0;


        this.particlesContPU = this.add.particles('flares')
        this.particlesContPU.depth = 10

        this.PCuP = this.particlesContPU.createEmitter({
            x: { min: pContU.x + 35 - 50, max: pContU.x + 35 + 50 },
            y: pContU.y + 50,
            lifespan: 3000,
            speedY: { min: -60, max: -100 },
            scale: { start: 0.3, end: 0 },
            quantity: 1,
            frame: 'white',
            frequency: 300,
            tint: 0x008000,
            blendMode: 'ADD',

        });





        this.escBU2 = this.add.image(0 + 1180 * this.escenarios[1].pos, 0, "ContadorBlur").setOrigin(0, 0)
        this.escBU2.displayHeight = this.game.canvas.height / 2;
        this.escBU2.displayWidth = this.game.canvas.width;
        this.escBU2.alpha = 0;
        this.escBU2.setDepth(11);


        //Parte jugador 2

        let escD2 = this.add.image(0 + 1180 * this.escenarios[1].pos, this.game.canvas.height / 2, "Contador").setOrigin(0, 0);

        escD2.displayHeight = this.game.canvas.height / 2;
        escD2.displayWidth = this.game.canvas.width;



        let pContD = this.add.image(830 + 1180 * this.escenarios[1].pos, 602, "spriteCont").setOrigin(0, 0);
        pContD.displayHeight = this.game.canvas.height * 0.1;
        pContD.displayWidth = this.game.canvas.width * 0.08;

        let pruebaContador2 = this.physics.add.image(830 + 1180 * this.escenarios[1].pos, 309 + this.game.canvas.height / 2, "muro").setOrigin(0, 0);
        pruebaContador2.setImmovable(true)
        pruebaContador2.displayWidth = 95;
        pruebaContador2.displayHeight = 5;
        pruebaContador2.alpha = 0;

        this.particlesContPD = this.add.particles('flares')
        this.particlesContPD.depth = 10

        this.PCuP = this.particlesContPD.createEmitter({
            x: { min: pContD.x + 35 - 50, max: pContD.x + 35 + 50 },
            y: pContD.y + 50,
            lifespan: 3000,
            speedY: { min: -60, max: -100 },
            scale: { start: 0.3, end: 0 },
            quantity: 1,
            frame: 'white',
            frequency: 300,
            tint: 0x008000,
            blendMode: 'ADD',

        });




        this.escBU22 = this.add.image(0 + 1180 * this.escenarios[1].pos, this.game.canvas.height / 2, "ContadorBlur").setOrigin(0, 0)

        this.escBU22.displayHeight = this.game.canvas.height / 2;
        this.escBU22.displayWidth = this.game.canvas.width;
        this.escBU22.alpha = 0;
        this.escBU22.setDepth(11)


        //Plataformas jugador 1
        // ! this.crearPlataformasContador1();

        //Plataformas jugador 2
        // ! this.crearPlataformasContador2();

        //Power Up jugador 1
        this.crearMenosTP1(720, 300, this.escenarios[1].pos);

        //Power Up jugador 2
        this.crearMenosTP2(720, 300, this.escenarios[1].pos);

        //Escenario 3 Nieve

        //Parte jugador 1

        let escU3 = this.add.image(0 + 1180 * this.escenarios[2].pos, 0, "Nieve").setOrigin(0, 0);

        escU3.displayHeight = this.game.canvas.height / 2;
        escU3.displayWidth = this.game.canvas.width;

        let banderaU = this.physics.add.image(925 + 1180 * this.escenarios[2].pos, 115, "flag").setOrigin(0, 0);
        banderaU.displayHeight = this.game.canvas.height * 0.1;
        banderaU.displayWidth = this.game.canvas.width * 0.08;
        banderaU.setImmovable(true)
        banderaU.alpha = 1;

        //! this.crearPlataformasNieve1();

        //Parte jugador 2

        let escD3 = this.add.image(0 + 1180 * this.escenarios[2].pos, this.game.canvas.height / 2, "Nieve").setOrigin(0, 0);

        escD3.displayHeight = this.game.canvas.height / 2;
        escD3.displayWidth = this.game.canvas.width;

        let banderaD = this.physics.add.image(925 + 1180 * this.escenarios[2].pos, 115 + this.game.canvas.height / 2, "flag").setOrigin(0, 0);
        banderaD.displayHeight = this.game.canvas.height * 0.1;
        banderaD.displayWidth = this.game.canvas.width * 0.08;
        banderaD.setImmovable(true)
        // ! this.crearPlataformasNieve2();





        //Escenario 4 Electricidad

        //Parte jugador 1

        let escU4 = this.add.image(0 + 1180 * this.escenarios[3].pos, 0, "Electricidad").setOrigin(0, 0);

        escU4.displayHeight = this.game.canvas.height / 2;
        escU4.displayWidth = this.game.canvas.width;


        let pruebaElectricidadU = this.physics.add.image(770 + 1180 * this.escenarios[3].pos, 90, "logo").setOrigin(0, 0);
        pruebaElectricidadU.displayHeight = 140;
        pruebaElectricidadU.displayWidth = 140;
        pruebaElectricidadU.setImmovable(true)
        pruebaElectricidadU.alpha = 0;

        this.particlesEPU = this.add.particles('flares')
        this.particlesEPU.depth = 10

        this.PEPU = this.particlesEPU.createEmitter({
            x: { min: pruebaElectricidadU.x + 35 - 50, max: pruebaElectricidadU.x + 50 + 50 },
            y: pruebaElectricidadU.y + 125,
            lifespan: 3000,
            speedY: { min: -60, max: -100 },
            scale: { start: 0.3, end: 0 },
            quantity: 1,
            frame: 'white',
            frequency: 300,
            tint: 0x008000,
            blendMode: 'ADD',

        });

        this.blurElectricidadU = this.add.image(0 + 1180 * this.escenarios[3].pos, 0, "ElectricidadBlur").setOrigin(0, 0);
        this.blurElectricidadU.displayHeight = this.game.canvas.height / 2 - 10;
        this.blurElectricidadU.displayWidth = this.game.canvas.width;
        this.blurElectricidadU.alpha = 0;

        //Plataformas jugador 1
        // ! this.crearPlataformasElectricidad1(that);

        //Plataformas jugador 2
        // ! this.crearPlataformasElectricidad2(that);

        //Power Up jugador 1
        this.crearMenosTP1(15, 50, this.escenarios[3].pos);

        //Power Up jugador 2
        this.crearMenosTP2(15, 50, this.escenarios[3].pos);


        //Parte jugador 2

        let escD4 = this.add.image(0 + 1180 * this.escenarios[3].pos, this.game.canvas.height / 2, "Electricidad").setOrigin(0, 0);

        escD4.displayHeight = this.game.canvas.height / 2;
        escD4.displayWidth = this.game.canvas.width;
        escD4.setDepth(-2000);

        let pruebaElectricidadD = this.physics.add.image(770 + 1180 * this.escenarios[3].pos, 450, "logo").setOrigin(0, 0);
        pruebaElectricidadD.displayHeight = 140;
        pruebaElectricidadD.displayWidth = 140;
        pruebaElectricidadD.setImmovable(true)
        pruebaElectricidadD.alpha = 0;


        this.particlesEPD = this.add.particles('flares')
        this.particlesEPD.depth = 10

        this.PEPD = this.particlesEPD.createEmitter({
            x: { min: pruebaElectricidadD.x + 35 - 50, max: pruebaElectricidadD.x + 50 + 50 },
            y: pruebaElectricidadD.y + 125,
            lifespan: 3000,
            speedY: { min: -60, max: -100 },
            scale: { start: 0.3, end: 0 },
            quantity: 1,
            frame: 'white',
            frequency: 300,
            tint: 0x008000,
            blendMode: 'ADD',

        });


        this.blurElectricidadD = this.add.image(0 + 1180 * this.escenarios[3].pos, this.game.canvas.height / 2 + 10, "ElectricidadBlur").setOrigin(0, 0);
        this.blurElectricidadD.displayHeight = this.game.canvas.height / 2;
        this.blurElectricidadD.displayWidth = this.game.canvas.width;
        this.blurElectricidadD.alpha = 0;



        //Escenario yiieePUm Laboratorio

        //Jugador 1

        let escU5 = this.add.image(0 + 1180 * this.escenarios[4].pos, 0, "Laboratorio").setOrigin(0, 0);

        escU5.displayHeight = this.game.canvas.height / 2;
        escU5.displayWidth = this.game.canvas.width;


        let pruebaLaboratorioU = this.physics.add.image(800 + 1180 * this.escenarios[4].pos, 185, "Ordenador").setOrigin(0, 0);
        pruebaLaboratorioU.displayHeight = this.game.canvas.height * 0.1;
        pruebaLaboratorioU.displayWidth = this.game.canvas.width * 0.08;
        pruebaLaboratorioU.setImmovable(true)

        this.particlesLPU = this.add.particles('flares')
        this.particlesLPU.depth = 10

        this.PLPU = this.particlesLPU.createEmitter({
            x: { min: pruebaLaboratorioU.x + 35 - 50, max: pruebaLaboratorioU.x + 50 + 50 },
            y: pruebaLaboratorioU.y + 50,
            lifespan: 3000,
            speedY: { min: -60, max: -100 },
            scale: { start: 0.3, end: 0 },
            quantity: 1,
            frame: 'white',
            frequency: 300,
            tint: 0x008000,
            blendMode: 'ADD',

        });


        this.blurLaboratorioU = this.add.image(0 + 1180 * this.escenarios[4].pos, 0, "LaboratorioBlur").setOrigin(0, 0);
        this.blurLaboratorioU.displayHeight = this.game.canvas.height / 2 - 10;
        this.blurLaboratorioU.displayWidth = this.game.canvas.width;
        this.blurLaboratorioU.alpha = 0;

        // ! this.crearPlataformasLaboratorio1();

        //POWER UPS JUGADOR 1
        this.crearSpeedUpP1(825, 300, this.escenarios[4].pos);


        //Jugador 2

        let escD5 = this.add.image(0 + 1180 * this.escenarios[4].pos, this.game.canvas.height / 2, "Laboratorio").setOrigin(0, 0);

        escD5.displayHeight = this.game.canvas.height / 2;
        escD5.displayWidth = this.game.canvas.width;

        let pruebaLaboratorioD = this.physics.add.image(800 + 1180 * this.escenarios[4].pos, 545, "Ordenador").setOrigin(0, 0);
        pruebaLaboratorioD.displayHeight = this.game.canvas.height * 0.1;
        pruebaLaboratorioD.displayWidth = this.game.canvas.width * 0.08;
        pruebaLaboratorioD.setImmovable(true)
        //pruebaElectricidadD.alpha = 0;

        this.particlesLPD = this.add.particles('flares')
        this.particlesLPD.depth = 10

        this.PLPD = this.particlesLPD.createEmitter({
            x: { min: pruebaLaboratorioD.x + 35 - 50, max: pruebaLaboratorioD.x + 50 + 50 },
            y: pruebaLaboratorioD.y + 50,
            lifespan: 3000,
            speedY: { min: -60, max: -100 },
            scale: { start: 0.3, end: 0 },
            quantity: 1,
            frame: 'white',
            frequency: 300,
            tint: 0x008000,
            blendMode: 'ADD',

        });


        this.blurLaboratorioD = this.add.image(0 + 1180 * this.escenarios[4].pos, this.game.canvas.height / 2 + 10, "LaboratorioBlur").setOrigin(0, 0);
        this.blurLaboratorioD.displayHeight = this.game.canvas.height / 2;
        this.blurLaboratorioD.displayWidth = this.game.canvas.width;
        this.blurLaboratorioD.alpha = 0;

        // ! this.crearPlataformasLaboratorio2();

        //POWER UPS JUGADOR 2
        this.crearSpeedUpP2(825, 300, this.escenarios[4].pos);



        //Limites//


        //Suelo jugador 1

        let muro = this.add.image(0, this.game.canvas.height / 2, "muro").setOrigin(0, 0);
        muro.displayHeight = 1;
        muro.displayWidth = 5800;
        muro.alpha = 0;

        //Suelo jugador 2

        let muro2 = this.add.image(0, this.game.canvas.height - 1, "muro").setOrigin(0, 0);
        muro2.displayHeight = 1;
        muro2.displayWidth = 5800;
        muro2.alpha = 0;

        //Paredes

        let pared1 = this.add.image(1080, 0, "muro").setOrigin(0, 0);
        pared1.displayHeight = this.game.canvas.height;
        pared1.displayWidth = 100;
        pared1.alpha = 0;
        let pared2 = this.add.image(2260, 0, "muro").setOrigin(0, 0);
        pared2.displayHeight = this.game.canvas.height;
        pared2.displayWidth = 100;
        pared2.alpha = 0;
        let pared3 = this.add.image(3440, 0, "muro").setOrigin(0, 0);
        pared3.displayHeight = this.game.canvas.height;
        pared3.displayWidth = 100;
        pared3.alpha = 0;
        let pared4 = this.add.image(4620, 0, "muro").setOrigin(0, 0);
        pared4.displayHeight = this.game.canvas.height;
        pared4.displayWidth = 100;
        pared4.alpha = 0;

        this.plataformas = this.physics.add.staticGroup();
        this.plataformas.add(muro);
        this.plataformas.add(muro2);

        this.paredes = this.physics.add.staticGroup();
        this.paredes.add(pared1)
        this.paredes.add(pared2)
        this.paredes.add(pared3)
        this.paredes.add(pared4)




        //controles//

        //Player 2



        this.keyboardP2 = this.input.stopPropagation().keyboard.addKeys('LEFT,RIGHT,UP,DOWN,SPACE,ESC');

        this.input.keyboard.on('keyup-' + 'LEFT', this.unlockP2.bind(this));
        this.input.keyboard.on('keyup-' + 'RIGHT', this.unlockP2.bind(this));
        this.input.keyboard.on('keyup-' + 'UP', this.unlockP2.bind(this));
        this.input.keyboard.on('keyup-' + 'DOWN', this.unlockP2.bind(this));
        this.input.keyboard.on('keyup-' + 'SPACE', this.unlockP2.bind(this));

        this.input.keyboard.on('keyup-' + 'ESC', this.unlockP2.bind(this));

        this.keyLockP2 = false;

        //Player 1

        this.keyboardP1 = this.input.stopPropagation().keyboard.addKeys('D,A,W,S,E');

        this.input.keyboard.on('keyup-' + 'D', this.unlockP1.bind(this));
        this.input.keyboard.on('keyup-' + 'A', this.unlockP1.bind(this));
        this.input.keyboard.on('keyup-' + 'W', this.unlockP1.bind(this));
        this.input.keyboard.on('keyup-' + 'S', this.unlockP1.bind(this));
        this.input.keyboard.on('keyup-' + 'E', this.unlockP1.bind(this));


        //Camaras

        //Tamanio camara
        this.cam1 = this.cameras.main.setSize(this.game.canvas.width, this.game.canvas.height / 2).setName('Camara 1');

        //Bordes camara para que no muestre la parte exterior del mapa
        //Lo que quieres que se muestre basicamente
        this.cam1.setBounds(0, 0, this.game.canvas.width, this.game.canvas.height / 2)
        //Para que persiga al pj
        this.cam1.startFollow(this.playerU, true);
        this.cam1.setZoom(1.8)


        this.cam2 = this.cameras.add(0, this.game.canvas.height / 2, this.game.canvas.width, this.game.canvas.height / 2).setName('Camara 2');


        this.cam2.setBounds(0, this.game.canvas.height / 2, this.game.canvas.width, this.game.canvas.height / 2)

        this.cam2.startFollow(this.playerD, true);

        this.cam2.setZoom(1.8)




        //Fisicas


        this.physics.add.collider(this.playerU, this.plataformas);
        this.physics.add.collider(this.playerD, this.plataformas);
        this.physics.add.collider(this.playerU, this.paredes);
        this.physics.add.collider(this.playerD, this.paredes);




        this.CP1 = this.physics.add.overlap(this.playerU, cintaU, () => { this.Prueba(this.playerU) }, this.funcionOverlapP1, this);
        this.CP2 = this.physics.add.overlap(this.playerD, cintaD, () => { this.Prueba(this.playerD) }, this.funcionOverlapP2, this);
        this.CoP1 = this.physics.add.overlap(this.playerU, pruebaContador, () => { this.Prueba(this.playerU) }, this.funcionOverlapP1, this);
        this.CoP2 = this.physics.add.overlap(this.playerD, pruebaContador2, () => { this.Prueba(this.playerD) }, this.funcionOverlapP2, this);
        this.EP1 = this.physics.add.overlap(this.playerU, pruebaElectricidadU, () => { this.Prueba(this.playerU) }, this.funcionOverlapP1, this);
        this.EP2 = this.physics.add.overlap(this.playerD, pruebaElectricidadD, () => { this.Prueba(this.playerD) }, this.funcionOverlapP2, this);
        this.LP1 = this.physics.add.overlap(this.playerU, pruebaLaboratorioU, () => { this.Prueba(this.playerU) }, this.funcionOverlapP1, this);
        this.LP2 = this.physics.add.overlap(this.playerD, pruebaLaboratorioD, () => { this.Prueba(this.playerD) }, this.funcionOverlapP2, this);
        this.BP1 = this.physics.add.overlap(this.playerU, banderaU, () => { this.endP1(banderaU) }, null, this);
        this.BP2 = this.physics.add.overlap(this.playerD, banderaD, () => { this.endP2(banderaD) }, null, this);


        //Cronometro

        this.playP1 = false;
        this.playP2 = false;
        this.croP1 = 0;
        this.croP2 = 0;



        let cronoJ1 = this.add.image(792, 100, "cronoP1")
        cronoJ1.displayHeight = 30;
        cronoJ1.displayWidth = 95
        cronoJ1.setDepth(10)
        cronoJ1.setScrollFactor(0, 0)
        let cronoJ2 = this.add.image(792, 100, "cronoP2")
        cronoJ2.setScrollFactor(0, 0)
        cronoJ2.displayHeight = 30;
        cronoJ2.displayWidth = 95
        cronoJ2.setDepth(10)


        this.TiempoP1 = this.add.bitmapText(750, 90, 'Digitalism', "00 : 00 : 00", 22).setDepth(10)
        this.TiempoP1.setScrollFactor(0, 0)


        this.TiempoP2 = this.add.bitmapText(750, 90, 'Digitalism', "00 : 00 : 00", 22).setDepth(10)
        this.TiempoP2.setScrollFactor(0, 0)





        //Ignorasiones

        this.cam1.ignore(this.TiempoP2);
        this.cam1.ignore(this.particlesCPD);
        this.cam1.ignore(cronoJ2);
        this.cam2.ignore(this.TiempoP1);
        this.cam2.ignore(cronoJ1);



        /*
        * 1º Background
        *
        * 2º Cuando cada usuario carga envia un mensaje diciendo que esta al toque
        * 
        * 3º En el servidor ponemos algun tipo de contador o lo que sea y cuando vea que ese contador
        *    llega a 2 o como veamos conveniente
        * 
        * 4º Este envia un mensaje diciendo eh loquete crea plataformas borra el background ese feo yyy
        *    inicia los timers
        */




        //Ajustes

        this.time.addEvent({
            delay: 100,
            callback: this.delayDone,
            callbackScope: this,
            loop: false
        });

        if (this.online) {

            let windowFocus = true;
            var Usuario = this.yo;

            console.log("Ademas soy este fulano: ", Usuario)
            function meActualizo() {

                if (Usuario.user !== '' && windowFocus && Usuario.status !== "disconected") {

                    // console.log("Me actualizo", Usuario);
                    Usuario.status = "connected";
                    //Mandamos el estado al servidor con una petición PUT 
                    that.putPlayer(Usuario, () => {
                        that.getLobbyPlayers((players) => {
                            that.todos(players, () => {
                                setTimeout(() => { meActualizo() }, 1000)
                            })
                        })

                    });

                } else {
                    //console.log("No me actualizo")
                    that.getLobbyPlayers((players) => {
                        that.todos(players, () => {
                            setTimeout(() => { meActualizo() }, 1000)
                        })
                    })
                }
            }

            function primera() {
                if (Usuario.user !== '' && windowFocus && Usuario.status !== "disconected") {

                    console.log("Me actualizo", Usuario);
                    Usuario.status = "ready";
                    //Mandamos el estado al servidor con una petición PUT 
                    that.putPlayer(Usuario, () => {
                        that.getLobbyPlayers((players) => {
                            that.todos(players, () => {
                                setTimeout(() => { meActualizo() }, 1000)
                            })
                        })

                    });

                } else {
                    //console.log("No me actualizo")
                    that.getLobbyPlayers((players) => {
                        that.todos(players, () => {
                            setTimeout(() => { meActualizo() }, 1000)
                        })
                    })
                }
            }

            primera();




            $(window).blur(function () {
                windowFocus = false;

            });
            $(window).focus(function () {
                windowFocus = true;
                if (that.scene.isActive("Scene_play")) {
                    if (that.yo.user !== '' && that.yo.user !== null && that.yo.status !== "ready") {
                        Usuario.status = "connected"
                        that.putPlayer(Usuario)
                        console.log("Reconectando");
                    }
                }

            });



            if (this.handler.readyState === 0) {
                setTimeout(() => {
                    this.onMensajeHandler();
                    let msg = {
                        tipo: "CONECTADO"
                    }

                    this.handler.send(JSON.stringify(msg));

                }, 3000)
            } else {
                this.onMensajeHandler();


            }

        }




    }
    update(time) {
        //console.log("Camara: "+this.cam2.midPoint.x)

        // Control personaje 2  
        //console.log("Estado de la conexions  " + this.playerPosition.readyState);
        //console.log("Estado de la conexions  " + this.playerPulse.readyState);


        if (!this.online) {
            if (!this.escenasActivas[1]) {

                if (this.keyboardP2.LEFT.isDown === true) {
                    this.playerD.body.setVelocityX(-this.playerD.velocidad);
                    if (this.playerD.body.touching.down) {
                        this.playerD.anims.play("CorrerIzquierdaP2", true);
                    } else {
                        this.playerD.anims.play("SaltoIzquierdaP2", true);
                    }

                }
                if (this.keyboardP2.RIGHT.isDown === true) {
                    console.log("Derechaa")
                    this.playerD.body.setVelocityX(this.playerD.velocidad);
                    if (this.playerD.body.touching.down) {
                        this.playerD.anims.play("CorrerDerechaP2", true);
                    } else {
                        this.playerD.anims.play("SaltoDerechaP2", true);
                    }
                }
                if (this.keyboardP2.UP.isDown === true && this.playerD.body.touching.down) {
                    this.playerD.setVelocityY(-750);
                }


                if (this.keyboardP2.LEFT.isDown === false && this.keyboardP2.RIGHT.isDown === false && this.keyboardP2.UP.isDown === false) {
                    if (this.playerD.body.velocity.x > 0) {
                        this.playerD.anims.stop();
                        this.playerD.anims.play("IdleDerechaP2", true);
                    }
                    if (this.playerD.body.velocity.x < 0) {
                        this.playerD.anims.stop();
                        this.playerD.anims.play("IdleIzquierdaP2", true);
                    }


                    this.playerD.body.setVelocityX(0);


                }


            }
            // Personaje 1
            if (!this.escenasActivas[0]) {

                if (this.keyboardP1.W.isDown === true && this.playerU.body.touching.down) {
                    this.playerU.setVelocityY(-750); //cambiar para que salte menos y poder bajar plataformas

                }

                if (this.keyboardP1.A.isDown === true) {
                    this.playerU.body.setVelocityX(-this.playerU.velocidad);
                    if (this.playerU.body.touching.down) {
                        this.playerU.anims.play("CorrerIzquierdaP1", true);
                    } else {
                        this.playerU.anims.play("SaltoIzquierdaP1", true);
                    }

                }
                if (this.keyboardP1.D.isDown === true) {
                    this.playerU.body.setVelocityX(this.playerU.velocidad);
                    if (this.playerU.body.touching.down) {
                        this.playerU.anims.play("CorrerDerechaP1", true);
                    } else {
                        this.playerU.anims.play("SaltoDerechaP1", true);
                    }
                }

                if (this.keyboardP1.D.isDown === false && this.keyboardP1.A.isDown === false && this.keyboardP1.W.isDown === false) {
                    if (this.playerU.body.velocity.x > 0) {
                        this.playerU.anims.stop();
                        this.playerU.anims.play("IdleDerechaP1", true);
                    }
                    if (this.playerU.body.velocity.x < 0) {
                        this.playerU.anims.stop();
                        this.playerU.anims.play("IdleIzquierdaP1", true);
                    }
                    this.playerU.body.setVelocityX(0);
                }

            }


        } else if (this.online && this.ActivarControles) {

            if (this.yo.side === 1) {
                if (!this.escenasActivas[0]) {
                    let w = false;
                    let a = false;
                    let e = false;
                    let d = false;
                    let touching = true;
                    let t = time % 60;
                    let t2 = time % 80;




                    if (this.keyboardP1.A.isDown === true) {
                        a = true;
                        this.playerU.body.setVelocityX(-this.playerU.velocidad);
                        if (this.playerU.body.touching.down) {
                            this.playerU.anims.play("CorrerIzquierdaP1", true);
                        } else {
                            touching = false;
                            this.playerU.anims.play("SaltoIzquierdaP1", true);
                        }

                    }
                    if (this.keyboardP1.D.isDown === true) {
                        d = true;
                        this.playerU.body.setVelocityX(this.playerU.velocidad);
                        if (this.playerU.body.touching.down) {
                            this.playerU.anims.play("CorrerDerechaP1", true);
                        } else {
                            touching = false;
                            this.playerU.anims.play("SaltoDerechaP1", true);
                        }


                    }

                    if (this.keyboardP1.D.isDown === false && this.keyboardP1.A.isDown === false && this.keyboardP1.W.isDown === false) {
                        w = false;
                        a = false;
                        d = false;




                        if (this.playerU.body.velocity.x > 0) {
                            this.playerU.anims.stop();
                            this.playerU.anims.play("IdleDerechaP1", true);
                        }
                        if (this.playerU.body.velocity.x < 0) {
                            this.playerU.anims.stop();
                            this.playerU.anims.play("IdleIzquierdaP1", true);
                        }
                        this.playerU.body.setVelocityX(0);



                    }

                    var msg = {
                        tipo: "BOTONES",
                        w: w,
                        a: a,
                        side: 1,
                        d: d,
                        e: e,
                        touching: touching
                    }

                    if (this.keyboardP1.W.isDown === true && this.playerU.body.touching.down) {

                        this.playerU.setVelocityY(-750); //cambiar para que salte menos y poder bajar plataformas
                        w = true;

                        let msgf = {
                            tipo: "BOTONES",
                            w: w,
                            a: a,
                            side: 1,
                            d: d,
                            e: e,
                            touching: touching
                        }
                        this.handler.send(JSON.stringify(msgf));
                    }

                    var msg = {
                        tipo: "BOTONES",
                        w: w,
                        a: a,
                        side: 1,
                        d: d,
                        e: e,
                        touching: touching
                    }
                    if (this.handler.readyState === 1 && ((t >= 0 && t <= 5) || (t >= 10 && t <= 15) || (t >= 20 && t <= 25) || (t >= 30 && t <= 35))) {
                        this.handler.send(JSON.stringify(msg));
                    }

                    if (this.handler.readyState === 1 && ((t >= 0 && t <= 5) || (t >= 10 && t <= 15) || (t >= 20 && t <= 25) || (t >= 30 && t <= 35))) {
                        var that = this;
                        let msgPos = {
                            tipo: "POSICION",
                            x: that.playerU.x,
                            y: that.playerU.y,
                            side: 1
                        }

                        this.handler.send(JSON.stringify(msgPos));
                    }

                    if (((t2 >= 0 && t2 <= 5) || (t2 >= 60 && t2 <= 65))) {



                        let aux = []
                        let esce = this.playerU.position;
                        let lenghtArray = this.escenarios[this.playerU.position].plataformasP1.length;



                        for (let j = 0; j < lenghtArray; j++) {

                            let i = j * 3

                            aux[i] = this.escenarios[this.playerU.position].plataformasP1[j].x
                            aux[i + 1] = this.escenarios[this.playerU.position].plataformasP1[j].y
                            aux[i + 2] = this.escenarios[this.playerU.position].plataformasP1[j].body.velocity;

                        }


                        let msg = {
                            tipo: "PLATFORM",
                            arrayPlatforms: aux,
                            escenario: esce

                        }
                        // console.log(msg);

                        this.handler.send(JSON.stringify(msg));

                    }


                }




            } else if (this.yo.side === 2) {

                if (!this.escenasActivas[1]) {

                    let w = false;
                    let a = false;
                    let e = false;
                    let d = false;
                    let touching = true;
                    let t = time % 60;
                    let t2 = time % 80;



                    if (this.keyboardP1.A.isDown === true) {
                        a = true;
                        this.playerD.body.setVelocityX(-this.playerD.velocidad);
                        if (this.playerD.body.touching.down) {
                            this.playerD.anims.play("CorrerIzquierdaP2", true);
                        } else {
                            touching = false;
                            this.playerD.anims.play("SaltoIzquierdaP2", true);
                        }






                    }
                    if (this.keyboardP1.D.isDown === true) {
                        d = true;
                        this.playerD.body.setVelocityX(this.playerD.velocidad);
                        if (this.playerD.body.touching.down) {
                            this.playerD.anims.play("CorrerDerechaP2", true);
                        } else {
                            touching = false;
                            this.playerD.anims.play("SaltoDerechaP2", true);
                        }





                    }

                    if (this.keyboardP1.D.isDown === false && this.keyboardP1.A.isDown === false && this.keyboardP1.W.isDown === false) {
                        w = false;
                        a = false;
                        d = false;




                        if (this.playerD.body.velocity.x > 0) {
                            this.playerD.anims.stop();
                            this.playerD.anims.play("IdleDerechaP2", true);
                        }
                        if (this.playerD.body.velocity.x < 0) {
                            this.playerD.anims.stop();
                            this.playerD.anims.play("IdleIzquierdaP2", true);
                        }
                        this.playerD.body.setVelocityX(0);



                    }

                    if (this.keyboardP1.W.isDown === true && this.playerD.body.touching.down) {

                        this.playerD.setVelocityY(-750); //cambiar para que salte menos y poder bajar plataformas
                        w = true;

                        let msgf = {
                            tipo: "BOTONES",
                            w: w,
                            a: a,
                            side: 2,
                            d: d,
                            e: e,
                            touching: touching
                        }
                        this.handler.send(JSON.stringify(msgf));
                    }

                    var msg = {
                        tipo: "BOTONES",
                        w: w,
                        a: a,
                        side: 2,
                        d: d,
                        e: e,
                        touching: touching
                    }
                    if (this.handler.readyState === 1 && ((t >= 5 && t <= 10) || (t >= 15 && t <= 20) || (t >= 25 && t <= 30) || (t >= 35 && t <= 40))) {
                        this.handler.send(JSON.stringify(msg));
                    }

                    if (this.handler.readyState === 1 && ((t >= 5 && t <= 10) || (t >= 15 && t <= 20) || (t >= 25 && t <= 30) || (t >= 35 && t <= 40))) {
                        var that = this;
                        let msgPos = {
                            tipo: "POSICION",
                            x: that.playerD.x,
                            y: that.playerD.y,
                            side: 2
                        }

                        this.handler.send(JSON.stringify(msgPos));
                    }




                    if (((t2 >= 5 && t2 <= 10)  || (t2 >= 65 && t2 <= 70))) {



                        let aux = []
                        let esce = this.playerD.position;
                        let lenghtArray = this.escenarios[this.playerD.position].plataformasP2.length;



                        for (let j = 0; j < lenghtArray; j++) {

                            let i = j * 3

                            aux[i] = this.escenarios[this.playerD.position].plataformasP2[j].x
                            aux[i + 1] = this.escenarios[this.playerD.position].plataformasP2[j].y
                            aux[i + 2] = this.escenarios[this.playerD.position].plataformasP2[j].body.velocity;

                        }


                        let msg = {
                            tipo: "PLATFORM",
                            arrayPlatforms: aux,
                            escenario: esce

                        }
                        // console.log(msg);

                        this.handler.send(JSON.stringify(msg));

                    }






                }
            }



        }


        if (this.keyboardP2.ESC.isDown === true && this.keyLockP2 === false) {
            console.log("Iniciando pausa")
            this.keyLockP2 = true;
            this.keyboardP2.ESC.isDown = false;
            // this.pararP1();
            // this.pararP2();
            if (this.online&& this.ActivarPausa) {
                this.ActivarPausa=false;
                this.ActivarControles=false;
                this.scene.launch("Pause", { escena: this, soundManager: this.soundManager, online: this.online, yo: this.yo, partida: this.partidaDatos })
            }

            //this.keyboardP2.ESC.isDown=true;
        }


    }


    Prueba(player) {

        let pos = (player.x + 1180) / 1180
        pos = Math.trunc(pos) - 1
        player.body.setVelocityX(0);
        player.body.setVelocityY(0);
        player.anims.stop();


        if (player.id == 0) {
            player.anims.play("IdleDerechaP1", true);
            this.PruebaP1(pos);
        } else {
            player.anims.play("IdleDerechaP2", true);
            this.PruebaP2(pos)
        }
    }

    PruebaP1(code) {


        let p = 0;
        let e = 0;

        for (let i = 0; i < this.escenarios.length; i++) {
            if (code === this.escenarios[i].pos) {
                p = this.escenarios[i].nombre
                e = i;
            }

        }

        if (this.escenarios[e].completadoP1U === false) {
            this.scene.launch(p + "P1", { escena: this, soundManager: this.soundManager });
            this.escenasActivas[0] = true;
        }
        if (this.escenarios[e].completadoP1U === true && this.escenarios[e].doble === true) {
            if (this.escenarios[e].completadoP1D === false) {
                console.log("INICIANDO PARTE 2")
                this.scene.launch(p + "P1V2", { escena: this, soundManager: this.soundManager });
                this.escenasActivas[0] = true;
            }
        }



    }
    PruebaP2(code) {



        let p = 0;
        let e = 0;
        for (let i = 0; i < this.escenarios.length; i++) {
            if (code === this.escenarios[i].pos) {
                p = this.escenarios[i].nombre
                e = i;
            }

        }


        if (this.escenarios[e].completadoP2U === false) {
            this.scene.launch(p + "P2", { escena: this, soundManager: this.soundManager });
            this.escenasActivas[1] = true;

        }
        if (this.escenarios[e].completadoP2U === true && this.escenarios[e].doble === true) {
            if (this.escenarios[e].completadoP2D === false) {
                console.log("INICIANDO PARTE 2")
                this.scene.launch(p + "P2V2", { escena: this, soundManager: this.soundManager });
                this.escenasActivas[1] = true;
            }
        }




    }



    teletransporte(player, factor, camara, aux, escenario) {

        if (this.keyboardP1.E.isDown === true || aux === true) {

            player.body.setVelocityX(0);
            player.body.setVelocityY(0);
            player.anims.stop();
            player.x = (1180 * (factor + 1) + 25);
            player.position = escenario;


            player.y = this.game.canvas.height / 2 - 55;
            camara.setBounds(0 + 1180 * (factor + 1), 0, this.game.canvas.width, this.game.canvas.height / 2)

            //Sonido
            this.soundManager.play('TeletransporteFinal')
            if (this.online && this.yo.side === 1) {
                var msg = {
                    tipo: "EVENTOS",
                    portal: "null",
                    powerUp: "null",
                    teletransporte: factor
                }
                this.handler.send(JSON.stringify(msg))
            }
        }

    }
    teletransporteD(player, factor, camara, aux, escenario) {
        if (this.keyboardP1.E.isDown === true || aux === true) {

            player.body.setVelocityX(0);
            player.body.setVelocityY(0);
            player.anims.stop();
            player.x = (1180 * (factor + 1) + 25);
            player.y = this.game.canvas.height - 55;
            camara.setBounds(0 + 1180 * (factor + 1), this.game.canvas.height / 2, this.game.canvas.width, this.game.canvas.height / 2)
            player.position = escenario;

            //Sonido
            this.soundManager.play('TeletransporteFinal')
            if (this.online && this.yo.side === 2) {
                var msg = {
                    tipo: "EVENTOS",
                    portal: "null",
                    powerUp: "null",
                    teletransporte: factor
                }
                this.handler.send(JSON.stringify(msg))
            }

        }

    }


    //#region  funciones Crono

    empezar() {
        if (this.playP1 === false) {
            let empP1 = new Date();
            this.elcronoP1 = setInterval(() => { this.tiempoP1(empP1) }, 10);
            this.playP1 = true;                                               //Reloj puesta en marcha
        }
        if (this.playP2 === false) {
            let empP2 = new Date();
            this.elcronoP2 = setInterval(() => { this.tiempoP2(empP2) }, 10);
            this.playP2 = true;
        }
        this.ActivarControles = true;



    }

    tiempoP1(empP1) {

        let actual = new Date();
        let cr = new Date();

        //Player 1
        this.croP1 = actual - empP1;
        cr.setTime(this.croP1);

        let timeP1 = cr.getTime() + this.playerU.time
        //Transformar
        let cs1 = timeP1 % 1000;
        cs1 = cs1 / 10;
        cs1 = Math.round(cs1);
        let sg1 = timeP1 / 1000
        //sg1 = sg1 % 100;
        sg1 = Math.trunc(sg1)
        let mn1 = timeP1 / 60000;
        mn1 = Math.trunc(mn1)


        if (cs1 < 10) {
            cs1 = "0" + cs1;
        }

        if (sg1 > 59) {
            sg1 = sg1 % 60;
            //sg1 = "0" + sg1;
        }

        if (sg1 < 10) {
            sg1 = "0" + sg1;
        }
        if (mn1 < 10) {
            mn1 = "0" + mn1;
        }




        // this.textoCronometro.setText([
        //     'Tiempo: ' + ho + " : " + mn + " : " + sg + " : " + cs
        // ]);

        /*
        console.log(this.TiempoP2.x);
        this.TiempoP2.x=this.cam2.midPoint.x+350-216
        this.TiempoP2.y=this.cam2.midPoint.y-90+22,
        //*/

        this.TiempoP1.setText([
            mn1 + " : " + sg1 + " : " + cs1
        ]);

        this.tiempoFinalP1 = { total: timeP1, mn: mn1, sg: sg1, cs: cs1 }

    }

    tiempoP2(empP2) {

        let actual = new Date();
        let cr = new Date();
        //Player 2                                
        this.croP2 = actual - empP2;
        cr.setTime(this.croP2);

        let timeP2 = cr.getTime() + this.playerD.time;

        //Transformar
        let cs2 = timeP2 % 1000;
        cs2 = cs2 / 10;
        cs2 = Math.round(cs2);
        let sg2 = timeP2 / 1000
        //sg1 = sg1 % 100;
        sg2 = Math.trunc(sg2)
        let mn2 = timeP2 / 60000;
        mn2 = Math.trunc(mn2)

        if (cs2 < 10) {
            cs2 = "0" + cs2;
        }

        if (sg2 > 59) {
            sg2 = sg2 % 60;
            //sg2 = "0" + sg2;
        }

        if (sg2 < 10) {
            sg2 = "0" + sg2;
        }


        if (mn2 < 10) {
            mn2 = "0" + mn2;
        }


        this.TiempoP2.setText([
            mn2 + " : " + sg2 + " : " + cs2
        ]);

        this.tiempoFinalP2 = { total: timeP2, mn: mn2, sg: sg2, cs: cs2 }

    }



    pararP1() {
        if (this.end.player1 === false) {
            if (this.playP1 === true) {
                clearInterval(this.elcronoP1);
                this.playP1 = false;
            }
        }
    }

    continuarP1() {
        if (this.end.player1 === false) {
            if (this.playP1 === false) {

                let emp2 = new Date();
                emp2 = emp2.getTime();

                let emp3 = emp2 - this.croP1

                let emp = new Date();
                emp.setTime(emp3);
                this.elcronoP1 = setInterval(() => { this.tiempoP1(emp) }, 10);
                this.playP1 = true;
            }
        }
    }

    pararP2() {
        if (this.end.player2 === false) {
            if (this.playP2 === true) {
                clearInterval(this.elcronoP2);
                this.playP2 = false;
            }
        }
    }

    continuarP2() {

        if (this.end.player2 === false) {
            if (this.playP2 === false) {

                let emp2 = new Date();
                emp2 = emp2.getTime();

                let emp3 = emp2 - this.croP1

                let emp = new Date();
                emp.setTime(emp3);
                this.elcronoP2 = setInterval(() => { this.tiempoP2(emp) }, 10);
                this.playP2 = true;
            }
        }
    }

    //#endregion



    //#region powerUps


    crearSpeedUpP1(x, y, pos) {
        let run = this.physics.add.image(x + 1180 * pos, y, "run").setOrigin(0, 0);
        run.setScale(0.1)
        this.physics.add.overlap(this.playerU, run, () => {
            this.playerU.velocidad = 500
            run.destroy();
            setTimeout(() => { this.playerU.velocidad = 300; console.log("Se te acabo el chollo") }, 2000)
        }, null, this);
    }



    crearMenosTP1(x, y, pos) {
        let reloj = this.physics.add.image(x + 1180 * pos, y, "menosT").setOrigin(0, 0);
        reloj.setScale(0.1)
        this.physics.add.overlap(this.playerU, reloj, () => {
            this.playerU.time += -3000;
            reloj.destroy();
        }, null, this);
    }

    crearMasTP1() {
        this.playerD.time += 13000;
    }

    crearFrostP1() {
        //let reloj = this.physics.add.image(200 + 1180 * this.escenarios[0].pos, 100, "menosT").setOrigin(0, 0);
        //reloj.setScale(0.1)
        //this.physics.add.overlap(this.playerU, reloj, () => {
        this.soundManager.play('Congelar')
        this.playerD.setVelocityX(0);
        this.escenasActivas[1] = true;
        if (this.game.scene.isActive("CintaP2")) {
            this.game.scene.stop("CintaP2");
            this.blurGD.alpha = 0;
        }
        if (this.game.scene.isActive("CintaP2V2")) {
            this.game.scene.stop("CintaP2V2");
            this.blurGD.alpha = 0;
        }
        if (this.game.scene.isActive("ContadorP2")) {
            this.game.scene.stop("ContadorP2");
            this.escBU22.alpha = 0;
        }
        if (this.game.scene.isActive("ElectricidadP2")) {
            this.game.scene.stop("ElectricidadP2");
            this.blurElectricidadD.alpha = 0;
        }
        if (this.game.scene.isActive("ElectricidadP2V2")) {
            this.game.scene.stop("ElectricidadP2V2");
            this.blurElectricidadD.alpha = 0;
        }
        if (this.game.scene.isActive("LaboratorioP2")) {
            this.game.scene.stop("LaboratorioP2");
            this.blurLaboratorioD.alpha = 0;
        }
        setTimeout(() => { this.escenasActivas[1] = false; }, 6000)
        //reloj.destroy();
        //}, null, this);
    }




    crearBlindP1() {
        //let blind = this.physics.add.image(200 + 1180 * this.escenarios[0].pos, 100, "menosT").setOrigin(0, 0);
        //blind.setScale(0.1)
        //this.physics.add.overlap(this.playerU, blind, () => {
        let ceguera = this.add.image(this.game.canvas.width / 2, 197, "Foco")
        ceguera.scale = 0.6;
        ceguera.setScrollFactor(0, 0)
        ceguera.setDepth(1000000)
        this.cam1.ignore(ceguera);
        //blind.destroy();
        setTimeout(() => { ceguera.destroy(); console.log("Se te acabo la ceguera") }, 15000)

        //}, null, this);
    }

    crearRayosP1() {
        //let rayos = this.physics.add.image(200 + 1180 * this.escenarios[0].pos, 100, "menosT").setOrigin(0, 0);
        //rayos.setScale(0.1)
        let pos = (this.playerD.x + 1180) / 1180
        pos = Math.trunc(pos) - 1
        //this.physics.add.overlap(this.playerU, rayos, () => {
        this.RayosD(0, pos);
        // rayos.destroy();

        //}, null, this);
    }

    RayosD(i, postion) {


        if (i < 6) {
            //Primero



            let r1 = this.physics.add.image(this.game.canvas.width / 5 + 1180 * postion, this.game.canvas.height * 0.75, "laser")
            r1.alpha = 0.95
            r1.displayHeight = this.game.canvas.height / 2;

            this.physics.add.overlap(this.playerD, r1, () => {
                this.playerD.velocidad = 200;
                console.log("se rompe");
                r1.destroy();
            }, null, this)


            let r2 = this.physics.add.image(this.game.canvas.width / 5 * 2 + 1180 * postion, this.game.canvas.height * 0.75, "laser")
            r2.alpha = 0.95
            r2.displayHeight = this.game.canvas.height / 2;

            this.physics.add.overlap(this.playerD, r2, () => {
                this.playerD.velocidad = 200;
                console.log("se rompe");
                r2.destroy();
            }, null, this)

            let r3 = this.physics.add.image(this.game.canvas.width / 5 * 3 + 1180 * postion, this.game.canvas.height * 0.75, "laser")
            r3.alpha = 0.95
            r3.displayHeight = this.game.canvas.height / 2;

            this.physics.add.overlap(this.playerD, r3, () => {
                this.playerD.velocidad = 200;
                console.log("se rompe");
                r3.destroy();
            }, null, this)


            let r4 = this.physics.add.image(this.game.canvas.width / 5 * 4 + 1180 * postion, this.game.canvas.height * 0.75, "laser")
            r4.alpha = 0.95
            r4.displayHeight = this.game.canvas.height / 2;

            this.physics.add.overlap(this.playerD, r4, () => {
                this.playerD.velocidad = 200;
                console.log("se rompe");
                r4.destroy();
            }, null, this)



            setTimeout(() => {
                if (r1 !== undefined) {
                    console.log("se rompe");
                    r1.destroy();
                }
                if (r2 !== undefined) {
                    console.log("se rompe");
                    r2.destroy();
                }
                if (r3 !== undefined) {
                    console.log("se rompe");
                    r3.destroy();
                }
                if (r4 !== undefined) {
                    console.log("se rompe");
                    r4.destroy();
                }
                this.playerD.velocidad = 300

            }, 3000);




            setTimeout(() => {
                i++;
                let postion = (this.playerD.x + 1180) / 1180
                postion = Math.trunc(postion) - 1
                this.RayosD(i, postion);

            }, 4500);

        }
    }


    crearSpeedUpP2(x, y, pos) {
        let run = this.physics.add.image(x + 1180 * pos, y + this.game.canvas.height / 2, "run").setOrigin(0, 0);
        run.setScale(0.1)
        this.physics.add.overlap(this.playerD, run, () => {
            this.playerD.velocidad = 500
            run.destroy();
            setTimeout(() => { this.playerD.velocidad = 300; console.log("Se te acabo el chollo") }, 2000)
        }, null, this);
    }


    crearMenosTP2(x, y, pos) {
        let reloj = this.physics.add.image(x + 1180 * pos, y + this.game.canvas.height / 2, "menosT").setOrigin(0, 0);
        reloj.setScale(0.1)
        this.physics.add.overlap(this.playerD, reloj, () => {
            this.playerD.time += -3000;
            reloj.destroy();
        }, null, this);
    }
    crearMasTP2() {
        /*let timePLUS=this.add.sprite(50 + 1180 * this.escenarios[1].pos, 100 + this.game.canvas.height / 2,"time++");
        timePLUS.anims.play("timePlus");
        timePLUS.setScale(0.1);*/
        this.playerU.time += 13000;
    }


    crearBlindP2() {
        //let blind = this.physics.add.image(200 + 1180 * this.escenarios[0].pos, 100 + this.game.canvas.height / 2, "menosT").setOrigin(0, 0);
        //blind.setScale(0.1)
        //this.physics.add.overlap(this.playerD, blind, () => {
        let ceguera = this.add.image(this.game.canvas.width / 2, 197, "Foco")
        ceguera.scale = 0.6;
        ceguera.setScrollFactor(0, 0)
        ceguera.setDepth(1000000)
        this.cam2.ignore(ceguera);
        //blind.destroy();
        setTimeout(() => { ceguera.destroy(); console.log("Se te acabo la ceguera") }, 15000)

        //}, null, this);
    }

    crearFrostP2() {
        // let reloj = this.physics.add.image(200 + 1180 * this.escenarios[0].pos, 100 + this.game.canvas.height / 2, "menosT").setOrigin(0, 0);
        //reloj.setScale(0.1)
        //this.physics.add.overlap(this.playerD, reloj, () => {
        this.soundManager.play('Congelar')
        this.playerU.setVelocityX(0);
        this.escenasActivas[0] = true;
        if (this.game.scene.isActive("CintaP1")) {
            this.game.scene.stop("CintaP1");
            this.blurGU.alpha = 0;
        }
        if (this.game.scene.isActive("CintaP1V2")) {
            this.game.scene.stop("CintaP1V2");
            this.blurGU.alpha = 0;
        }
        if (this.game.scene.isActive("ContadorP1")) {
            this.game.scene.stop("ContadorP1");
            this.escBU2.alpha = 0;
        }
        if (this.game.scene.isActive("ElectricidadP1")) {
            this.game.scene.stop("ElectricidadP1");
            this.blurElectricidadU.alpha = 0;
        }
        if (this.game.scene.isActive("ElectricidadP1V2")) {
            this.game.scene.stop("ElectricidadP1V2");
            this.blurElectricidadU.alpha = 0;
        }
        if (this.game.scene.isActive("LaboratorioP1")) {
            this.game.scene.stop("LaboratorioP1");
            this.blurLaboratorioU.alpha = 0;
        }
        setTimeout(() => { this.escenasActivas[0] = false; }, 6000)
        // reloj.destroy();
        //}, null, this);
    }


    crearRayosP2() {
        //let rayos = this.physics.add.image(200 + 1180 * this.escenarios[0].pos, 100+this.game.canvas.height/2, "menosT").setOrigin(0, 0);
        //rayos.setScale(0.1)
        let pos = (this.playerU.x + 1180) / 1180
        pos = Math.trunc(pos) - 1
        //this.physics.add.overlap(this.playerD, rayos, () => {
        this.RayosU(0, pos);
        //  rayos.destroy();

        //}, null, this);
    }





    RayosU(i, postion) {


        if (i < 6) {
            //Primero



            let r1 = this.physics.add.image(this.game.canvas.width / 5 + 1180 * postion, this.game.canvas.height * 0.25, "laser")
            r1.alpha = 0.95
            r1.displayHeight = this.game.canvas.height / 2;

            this.physics.add.overlap(this.playerU, r1, () => {
                this.playerU.velocidad = 200;
                console.log("se rompe");
                r1.destroy();
            }, null, this)


            let r2 = this.physics.add.image(this.game.canvas.width / 5 * 2 + 1180 * postion, this.game.canvas.height * 0.25, "laser")
            r2.alpha = 0.95
            r2.displayHeight = this.game.canvas.height / 2;

            this.physics.add.overlap(this.playerU, r2, () => {
                this.playerU.velocidad = 200;
                console.log("se rompe");
                r2.destroy();
            }, null, this)

            let r3 = this.physics.add.image(this.game.canvas.width / 5 * 3 + 1180 * postion, this.game.canvas.height * 0.25, "laser")
            r3.alpha = 0.95
            r3.displayHeight = this.game.canvas.height / 2;

            this.physics.add.overlap(this.playerU, r3, () => {
                this.playerU.velocidad = 200;
                console.log("se rompe");
                r3.destroy();
            }, null, this)


            let r4 = this.physics.add.image(this.game.canvas.width / 5 * 4 + 1180 * postion, this.game.canvas.height * 0.25, "laser")
            r4.alpha = 0.95
            r4.displayHeight = this.game.canvas.height / 2;

            this.physics.add.overlap(this.playerU, r4, () => {
                this.playerU.velocidad = 200;
                console.log("se rompe");
                r4.destroy();
            }, null, this)



            setTimeout(() => {
                if (r1 !== undefined) {
                    console.log("se rompe");
                    r1.destroy();
                }
                if (r2 !== undefined) {
                    console.log("se rompe");
                    r2.destroy();
                }
                if (r3 !== undefined) {
                    console.log("se rompe");
                    r3.destroy();
                }
                if (r4 !== undefined) {
                    console.log("se rompe");
                    r4.destroy();
                }
                this.playerU.velocidad = 300

            }, 3000);




            setTimeout(() => {
                i++;
                let postion = (this.playerU.x + 1180) / 1180
                postion = Math.trunc(postion) - 1
                this.RayosU(i, postion);

            }, 4500);

        }
    }

    //#endregion


    //#region  Portales


    crearPortalGimnasioP1() {
        let spritePortal = this.add.sprite(1038 + 1180 * this.escenarios[0].pos, this.game.canvas.height * 0.34, "portal");
        spritePortal.play("portalAnim");
        spritePortal.setScale(0.5);
        this.portal = this.physics.add.image(1038 + 1180 * this.escenarios[0].pos, this.game.canvas.height * 0.34, "logo")
        this.portal.displayHeight = 155; //spritePortal.height x 0.5
        this.portal.displayWidth = 84; //spritePortal.width x 0.5
        this.portal.alpha = 0;

        //let pos = (player.x + 1180) / 1180
        //pos = Math.trunc(pos) - 1


        this.physics.add.overlap(this.playerU, this.portal, () => { this.teletransporte(this.playerU, this.escenarios[0].pos, this.cam1, null, 1) }, this.funcionOverlapP1, this);

    }

    crearPortalPulsadorP1() {
        let spritePortal = this.add.sprite(1038 + 1180 * this.escenarios[1].pos, this.game.canvas.height * 0.34, "portal");
        spritePortal.play("portalAnim");
        spritePortal.setScale(0.5);
        this.portal = this.physics.add.image(1038 + 1180 * this.escenarios[1].pos, this.game.canvas.height * 0.34, "logo")
        this.portal.displayHeight = 155; //spritePortal.height x 0.5
        this.portal.displayWidth = 84; //spritePortal.width x 0.5
        this.portal.alpha = 0;

        this.physics.add.overlap(this.playerU, this.portal, () => { this.teletransporte(this.playerU, this.escenarios[1].pos, this.cam1, null, 3) }, this.funcionOverlapP1, this);

    }


    crearPortalElectricidadP1() {
        let spritePortal = this.add.sprite(1038 + 1180 * this.escenarios[3].pos, this.game.canvas.height * 0.34, "portal");
        spritePortal.play("portalAnim");
        spritePortal.setScale(0.5);
        this.portal = this.physics.add.image(1038 + 1180 * this.escenarios[3].pos, this.game.canvas.height * 0.34, "logo")
        this.portal.displayHeight = 155;
        this.portal.displayWidth = 84;
        this.portal.alpha = 0;

        this.physics.add.overlap(this.playerU, this.portal, () => { this.teletransporte(this.playerU, this.escenarios[3].pos, this.cam1, null, 4) }, this.funcionOverlapP1, this);

    }

    crearPortalLaboratorioP1() {
        let spritePortal = this.add.sprite(1038 + 1180 * this.escenarios[4].pos, this.game.canvas.height * 0.34, "portal");
        spritePortal.play("portalAnim");
        spritePortal.setScale(0.5);
        this.portal = this.physics.add.image(1038 + 1180 * this.escenarios[4].pos, this.game.canvas.height * 0.34, "logo")
        this.portal.displayHeight = 155; //spritePortal.height x 0.5
        this.portal.displayWidth = 84; //spritePortal.width x 0.5
        this.portal.alpha = 0;

        //let pos = (player.x + 1180) / 1180
        //pos = Math.trunc(pos) - 1


        this.physics.add.overlap(this.playerU, this.portal, () => { this.teletransporte(this.playerU, this.escenarios[4].pos, this.cam1, null, 2) }, this.funcionOverlapP1, this);

    }




    crearPortalGimnasioP2() {
        let spritePortal2 = this.add.sprite(1038 + 1180 * this.escenarios[0].pos, this.game.canvas.height * 0.84, "portal");
        spritePortal2.play("portalAnim");
        spritePortal2.setScale(0.5);
        this.portalD = this.physics.add.image(1038 + 1180 * this.escenarios[0].pos, this.game.canvas.height * 0.84, "logo")
        this.portalD.displayHeight = 155; //spritePortal.height x 0.5
        this.portalD.displayWidth = 84; //spritePortal.width x 0.5
        this.portalD.alpha = 0;
        this.physics.add.overlap(this.playerD, this.portalD, () => { this.teletransporteD(this.playerD, this.escenarios[0].pos, this.cam2, null, 1) }, this.funcionOverlapP2, this); console.log(this.portal)
    }


    crearPortalPulsadorP2() {
        let spritePortal2 = this.add.sprite(1038 + 1180 * this.escenarios[1].pos, this.game.canvas.height * 0.84, "portal");
        spritePortal2.play("portalAnim");
        spritePortal2.setScale(0.5);
        this.portalD = this.physics.add.image(1038 + 1180 * this.escenarios[1].pos, this.game.canvas.height * 0.84, "logo")
        this.portalD.displayHeight = 155; //spritePortal.height x 0.5
        this.portalD.displayWidth = 84; //spritePortal.width x 0.5
        this.portalD.alpha = 0;
        this.physics.add.overlap(this.playerD, this.portalD, () => { this.teletransporteD(this.playerD, this.escenarios[1].pos, this.cam2, null, 3) }, this.funcionOverlapP2, this); console.log(this.portal);
    }


    crearPortalElectricidadP2() {
        let spritePortal = this.add.sprite(1038 + 1180 * this.escenarios[3].pos, this.game.canvas.height * 0.84, "portal");
        spritePortal.play("portalAnim");
        spritePortal.setScale(0.5);
        this.portalD = this.physics.add.image(1038 + 1180 * this.escenarios[3].pos, this.game.canvas.height * 0.84, "logo")
        this.portalD.displayHeight = 155;
        this.portalD.displayWidth = 84;
        this.portalD.alpha = 0;
        this.physics.add.overlap(this.playerD, this.portalD, () => { this.teletransporteD(this.playerD, this.escenarios[3].pos, this.cam2, null, 4) }, this.funcionOverlapP2, this); console.log(this.portal)
    }


    crearPortalLaboratorioP2() {
        let spritePortal2 = this.add.sprite(1038 + 1180 * this.escenarios[4].pos, this.game.canvas.height * 0.84, "portal");
        spritePortal2.play("portalAnim");
        spritePortal2.setScale(0.5);
        this.portalD = this.physics.add.image(1038 + 1180 * this.escenarios[4].pos, this.game.canvas.height * 0.84, "logo")
        this.portalD.displayHeight = 155; //spritePortal.height x 0.5
        this.portalD.displayWidth = 84; //spritePortal.width x 0.5
        this.portalD.alpha = 0;
        this.physics.add.overlap(this.playerD, this.portalD, () => { this.teletransporteD(this.playerD, this.escenarios[4].pos, this.cam2, null, 2) }, this.funcionOverlapP2, this); console.log(this.portal)
    }

    //#endregion


    //#region plataformas

    crearPlataformasGimnasioP1() {
        let p1_1_1 = this.physics.add.image(100 + 1180 * this.escenarios[0].pos, this.game.canvas.height * 0.42, "gymplatform").setImmovable(true);
        p1_1_1.displayHeight = 20;
        p1_1_1.displayWidth = 80;

        var p1_1_2 = this.physics.add.image(220 + 1180 * this.escenarios[0].pos, 260, "gymplatform").setImmovable(true);
        p1_1_2.displayHeight = 20;
        p1_1_2.displayWidth = 80;

        let p1_1_3 = this.physics.add.image(320 + 1180 * this.escenarios[0].pos, 150, "gymplatform").setImmovable(true);


        let p1_1_4 = this.physics.add.image(200 + 1180 * this.escenarios[0].pos, 120, "gymplatform").setImmovable(true);
        p1_1_4.displayHeight = 20;
        p1_1_4.displayWidth = 80;

        let p1_1_5 = this.physics.add.image(85 + 1180 * this.escenarios[0].pos, 150, "gymplatform").setImmovable(true);
        p1_1_5.displayHeight = 20;
        p1_1_5.displayWidth = 80;

        let p1_1_6 = this.physics.add.image(430 + 1180 * this.escenarios[0].pos, 185, "gymplatform").setImmovable(true);
        p1_1_6.displayHeight = 20;
        p1_1_6.displayWidth = 80;

        let p1_1_7 = this.physics.add.image(535 + 1180 * this.escenarios[0].pos, 230, "gymplatform").setImmovable(true);
        p1_1_7.displayHeight = 20;
        p1_1_7.displayWidth = 80;

        var p1_1_8 = this.physics.add.image(650 + 1180 * this.escenarios[0].pos, 230, "gymplatform").setImmovable(true);
        p1_1_8.displayHeight = 20;
        p1_1_8.displayWidth = 80;



        let p1_1_9 = this.physics.add.image(750 + 1180 * this.escenarios[0].pos, 135, "gymplatform").setImmovable(true);
        p1_1_9.displayHeight = 20;
        p1_1_9.displayWidth = 80;

        let p1_1_10 = this.physics.add.image(950 + 1180 * this.escenarios[0].pos, 190, "gymplatform").setImmovable(true);
        p1_1_10.displayHeight = 20;
        p1_1_10.displayWidth = 80;


        let p1_1_11 = this.physics.add.image(1020 + 1180 * this.escenarios[0].pos, 135, "gymplatform").setImmovable(true);
        p1_1_11.displayHeight = 20;
        p1_1_11.displayWidth = 80;



        let grupoP1_gym = this.add.group();
        grupoP1_gym.add(p1_1_1);
        grupoP1_gym.add(p1_1_2);
        grupoP1_gym.add(p1_1_3);
        grupoP1_gym.add(p1_1_4);
        grupoP1_gym.add(p1_1_5);
        grupoP1_gym.add(p1_1_6);
        grupoP1_gym.add(p1_1_7);
        grupoP1_gym.add(p1_1_8);
        grupoP1_gym.add(p1_1_9);
        grupoP1_gym.add(p1_1_10);
        grupoP1_gym.add(p1_1_11);

        this.physics.add.collider(this.playerU, grupoP1_gym);


        if (this.yo.side === 1) {
            1

            this.tweens.timeline({
                targets: p1_1_3.body.velocity,
                loop: -1,
                tweens: [
                    { y: 80, duration: 750, ease: 'Stepped' },
                    { y: -80, duration: 750, ease: 'Stepped' }
                ]
            })


            this.tweens.timeline({
                targets: p1_1_8.body.velocity,
                loop: -1,
                tweens: [
                    { y: -60, duration: 850, ease: 'Stepped' },
                    { y: 60, duration: 850, ease: 'Stepped' }
                ]
            })


            this.tweens.timeline({
                targets: p1_1_10.body.velocity,
                loop: -1,
                tweens: [
                    { x: -60, duration: 1700, ease: 'Stepped' },
                    { x: 60, duration: 1700, ease: 'Stepped' }
                ]
            })

        }



        this.plataformasGimnasioP1[0] = p1_1_3;
        this.plataformasGimnasioP1[1] = p1_1_8;
        this.plataformasGimnasioP1[2] = p1_1_10;



        console.log("Plataformas: ", this.plataformas);





    }

    crearPlataformasGimnasioP2() {
        let p2_1_1 = this.physics.add.image(100 + 1180 * this.escenarios[0].pos, this.game.canvas.height * 0.42 + 360, "gymplatform").setImmovable(true);
        p2_1_1.displayHeight = 20;
        p2_1_1.displayWidth = 80;

        let p2_1_2 = this.physics.add.image(220 + 1180 * this.escenarios[0].pos, 620, "gymplatform").setImmovable(true);
        p2_1_2.displayHeight = 20;
        p2_1_2.displayWidth = 80;

        let p2_1_3 = this.physics.add.image(320 + 1180 * this.escenarios[0].pos, 510, "gymplatform").setImmovable(true);


        let p2_1_4 = this.physics.add.image(200 + 1180 * this.escenarios[0].pos, 480, "gymplatform").setImmovable(true);
        p2_1_4.displayHeight = 20;
        p2_1_4.displayWidth = 80;

        let p2_1_5 = this.physics.add.image(85 + 1180 * this.escenarios[0].pos, 510, "gymplatform").setImmovable(true);
        p2_1_5.displayHeight = 20;
        p2_1_5.displayWidth = 80;

        let p2_1_6 = this.physics.add.image(430 + 1180 * this.escenarios[0].pos, 545, "gymplatform").setImmovable(true);
        p2_1_6.displayHeight = 20;
        p2_1_6.displayWidth = 80;

        let p2_1_7 = this.physics.add.image(535 + 1180 * this.escenarios[0].pos, 590, "gymplatform").setImmovable(true);
        p2_1_7.displayHeight = 20;
        p2_1_7.displayWidth = 80;

        let p2_1_8 = this.physics.add.image(650 + 1180 * this.escenarios[0].pos, 590, "gymplatform").setImmovable(true);
        p2_1_8.displayHeight = 20;
        p2_1_8.displayWidth = 80;



        let p2_1_9 = this.physics.add.image(750 + 1180 * this.escenarios[0].pos, 495, "gymplatform").setImmovable(true);
        p2_1_9.displayHeight = 20;
        p2_1_9.displayWidth = 80;

        let p2_1_10 = this.physics.add.image(950 + 1180 * this.escenarios[0].pos, 550, "gymplatform").setImmovable(true);
        p2_1_10.displayHeight = 20;
        p2_1_10.displayWidth = 80;



        let p2_1_11 = this.physics.add.image(1020 + 1180 * this.escenarios[0].pos, 495, "gymplatform").setImmovable(true);
        p2_1_11.displayHeight = 20;
        p2_1_11.displayWidth = 80;


        let grupoP2_gym = this.add.group();
        grupoP2_gym.add(p2_1_1);
        grupoP2_gym.add(p2_1_2);
        grupoP2_gym.add(p2_1_3);
        grupoP2_gym.add(p2_1_4);
        grupoP2_gym.add(p2_1_5);
        grupoP2_gym.add(p2_1_6);
        grupoP2_gym.add(p2_1_7);
        grupoP2_gym.add(p2_1_8);
        grupoP2_gym.add(p2_1_9);
        grupoP2_gym.add(p2_1_10);
        grupoP2_gym.add(p2_1_11);

        this.physics.add.collider(this.playerD, grupoP2_gym);

        this.plataformasGimnasioP2[0] = p2_1_3;
        this.plataformasGimnasioP2[1] = p2_1_8;
        this.plataformasGimnasioP2[2] = p2_1_10;

        if (this.yo.side === 2) {

            this.tweens.timeline({
                targets: p2_1_3.body.velocity,
                loop: -1,
                tweens: [
                    { y: 80, duration: 750, ease: 'Stepped' },
                    { y: -80, duration: 750, ease: 'Stepped' }
                ]
            })

            this.tweens.timeline({
                targets: p2_1_8.body.velocity,
                loop: -1,
                tweens: [
                    { y: -60, duration: 850, ease: 'Stepped' },
                    { y: 60, duration: 850, ease: 'Stepped' }
                ]
            })



            this.tweens.timeline({
                targets: p2_1_10.body.velocity,
                loop: -1,
                tweens: [
                    { x: -60, duration: 1700, ease: 'Stepped' },
                    { x: 60, duration: 1700, ease: 'Stepped' }
                ]
            })

        }


    }

    crearPlataformasContador1() {
        let p1_2_1 = this.physics.add.image(100 + 1180 * this.escenarios[1].pos, this.game.canvas.height * 0.42, "contplatform").setImmovable(true);
        p1_2_1.displayHeight = 20;
        p1_2_1.displayWidth = 80;



        let p1_2_2 = this.physics.add.image(275 + 1180 * this.escenarios[1].pos, 220, "contplatform").setImmovable(true);
        p1_2_2.displayHeight = 20;
        p1_2_2.displayWidth = 80;



        let p1_2_3 = this.physics.add.image(75 + 1180 * this.escenarios[1].pos, 150, "contplatform").setImmovable(true);
        p1_2_3.displayHeight = 20;
        p1_2_3.displayWidth = 80;

        let p1_2_4 = this.physics.add.image(200 + 1180 * this.escenarios[1].pos, 100, "contplatform").setImmovable(true);
        p1_2_4.displayHeight = 20;
        p1_2_4.displayWidth = 80;


        let p1_2_5 = this.physics.add.image(390 + 1180 * this.escenarios[1].pos, 100, "contplatform").setImmovable(true);
        p1_2_5.displayHeight = 20;
        p1_2_5.displayWidth = 80;

        let p1_2_6 = this.physics.add.image(490 + 1180 * this.escenarios[1].pos, 100, "contplatform").setImmovable(true);
        p1_2_6.displayHeight = 20;
        p1_2_6.displayWidth = 80;



        let p1_2_7 = this.physics.add.image(610 + 1180 * this.escenarios[1].pos, 200, "contplatform").setImmovable(true);
        p1_2_7.displayHeight = 20;
        p1_2_7.displayWidth = 80;

        //muro para que no se entre en contador directamente
        let notCheating = this.physics.add.image(790 + 1180 * this.escenarios[1].pos, 235, "telon").setImmovable(true);
        notCheating.displayHeight = 250;
        notCheating.displayWidth = 20;

        let p1_2_8 = this.physics.add.image(720 + 1180 * this.escenarios[1].pos, 150, "contplatform").setImmovable(true);
        p1_2_8.displayHeight = 20;
        p1_2_8.displayWidth = 80;

        let sueloPrueba = this.physics.add.image(932 + 1180 * this.escenarios[1].pos, 337, "gymplatform").setImmovable(true);
        sueloPrueba.displayHeight = 43
        sueloPrueba.displayWidth = 290
        sueloPrueba.alpha = 0;


        let grupoP1_cont = this.add.group();
        grupoP1_cont.add(p1_2_1);
        grupoP1_cont.add(p1_2_2);
        grupoP1_cont.add(p1_2_3);
        //plataforma 3 desaparece
        var intermitence = setInterval(() => {
            p1_2_3.alpha = p1_2_3.alpha == 1 ? 0 : 1;
            p1_2_3.alpha == 1 ? grupoP1_cont.add(p1_2_3) : grupoP1_cont.remove(p1_2_3);
        }, 2500);
        grupoP1_cont.add(p1_2_4);
        grupoP1_cont.add(p1_2_5);
        grupoP1_cont.add(p1_2_6);
        grupoP1_cont.add(p1_2_7);
        grupoP1_cont.add(sueloPrueba);
        var intermitence = setInterval(() => {
            p1_2_7.alpha = p1_2_7.alpha == 1 ? 0 : 1;
            p1_2_7.alpha == 1 ? grupoP1_cont.add(p1_2_7) : grupoP1_cont.remove(p1_2_7);
        }, 2000);
        grupoP1_cont.add(notCheating); //descomentar, solo está comentado para hacer pruebas rápidamente
        grupoP1_cont.add(p1_2_8);

        this.physics.add.collider(this.playerU, grupoP1_cont);


        this.plataformasContadorP1[0] = p1_2_1;
        this.plataformasContadorP1[1] = p1_2_2;
        this.plataformasContadorP1[2] = p1_2_4;
        this.plataformasContadorP1[3] = p1_2_6;



        if (this.yo.side === 1) {
            this.tweens.timeline({
                targets: p1_2_1.body.velocity,
                loop: -1,
                tweens: [
                    { x: 60, duration: 2000, ease: 'Stepped' },
                    { x: -60, duration: 2000, ease: 'Stepped' }

                ]
            });

            this.tweens.timeline({
                targets: p1_2_2.body.velocity,
                loop: -1,
                tweens: [
                    { x: -80, duration: 1300, ease: 'Stepped' },
                    { x: 80, duration: 1300, ease: 'Stepped' }

                ]
            });

            this.tweens.timeline({
                targets: p1_2_4.body.velocity,
                loop: -1,
                tweens: [
                    { x: 70, duration: 1500, ease: 'Stepped' },
                    { x: -70, duration: 1500, ease: 'Stepped' }

                ]
            });


            this.tweens.timeline({
                targets: p1_2_6.body.velocity,
                loop: -1,
                tweens: [
                    { y: 40, duration: 2500, ease: 'Stepped' },
                    { y: -40, duration: 2500, ease: 'Stepped' }

                ]
            });

        }



    }
    crearPlataformasContador2() {
        let p2_2_1 = this.physics.add.image(100 + 1180 * this.escenarios[1].pos, this.game.canvas.height * 0.42 + 360, "contplatform").setImmovable(true);
        p2_2_1.displayHeight = 20;
        p2_2_1.displayWidth = 80;



        let p2_2_2 = this.physics.add.image(275 + 1180 * this.escenarios[1].pos, 580, "contplatform").setImmovable(true);
        p2_2_2.displayHeight = 20;
        p2_2_2.displayWidth = 80;




        let p2_2_3 = this.physics.add.image(75 + 1180 * this.escenarios[1].pos, 510, "contplatform").setImmovable(true);
        p2_2_3.displayHeight = 20;
        p2_2_3.displayWidth = 80;

        let p2_2_4 = this.physics.add.image(200 + 1180 * this.escenarios[1].pos, 460, "contplatform").setImmovable(true);
        p2_2_4.displayHeight = 20;
        p2_2_4.displayWidth = 80;



        let p2_2_5 = this.physics.add.image(390 + 1180 * this.escenarios[1].pos, 460, "contplatform").setImmovable(true);
        p2_2_5.displayHeight = 20;
        p2_2_5.displayWidth = 80;

        let p2_2_6 = this.physics.add.image(490 + 1180 * this.escenarios[1].pos, 460, "contplatform").setImmovable(true);
        p2_2_6.displayHeight = 20;
        p2_2_6.displayWidth = 80;


        let p2_2_7 = this.physics.add.image(610 + 1180 * this.escenarios[1].pos, 560, "contplatform").setImmovable(true);
        p2_2_7.displayHeight = 20;
        p2_2_7.displayWidth = 80;

        //muro para que no se entre en contador directamente
        let notCheating2 = this.physics.add.image(790 + 1180 * this.escenarios[1].pos, 595, "telon").setImmovable(true);
        notCheating2.displayHeight = 250;
        notCheating2.displayWidth = 20;


        let p2_2_8 = this.physics.add.image(720 + 1180 * this.escenarios[1].pos, 510, "contplatform").setImmovable(true);
        p2_2_8.displayHeight = 20;
        p2_2_8.displayWidth = 80;

        let sueloPrueba = this.physics.add.image(932 + 1180 * this.escenarios[1].pos, 337 + this.game.canvas.height / 2, "gymplatform").setImmovable(true);
        sueloPrueba.displayHeight = 43
        sueloPrueba.displayWidth = 290
        sueloPrueba.alpha = 0;




        let grupoP2_cont = this.add.group();
        grupoP2_cont.add(p2_2_1);
        grupoP2_cont.add(p2_2_2);
        grupoP2_cont.add(p2_2_3);
        //plataforma 3 desaparece
        var intermitence = setInterval(() => {
            p2_2_3.alpha = p2_2_3.alpha == 1 ? 0 : 1;
            p2_2_3.alpha == 1 ? grupoP2_cont.add(p2_2_3) : grupoP2_cont.remove(p2_2_3);
        }, 2500);

        grupoP2_cont.add(p2_2_4);
        grupoP2_cont.add(p2_2_5);
        grupoP2_cont.add(p2_2_6);
        grupoP2_cont.add(p2_2_7);

        var intermitence = setInterval(() => {
            p2_2_7.alpha = p2_2_7.alpha == 1 ? 0 : 1;
            p2_2_7.alpha == 1 ? grupoP2_cont.add(p2_2_7) : grupoP2_cont.remove(p2_2_7);
        }, 2000);

        grupoP2_cont.add(notCheating2);
        grupoP2_cont.add(p2_2_8);
        grupoP2_cont.add(sueloPrueba);


        this.physics.add.collider(this.playerD, grupoP2_cont);

        this.plataformasContadorP2[0] = p2_2_1;
        this.plataformasContadorP2[1] = p2_2_2;
        this.plataformasContadorP2[2] = p2_2_4;
        this.plataformasContadorP2[3] = p2_2_6;

        if (this.yo.side === 2) {

            this.tweens.timeline({
                targets: p2_2_1.body.velocity,
                loop: -1,
                tweens: [
                    { x: 60, duration: 2000, ease: 'Stepped' },
                    { x: -60, duration: 2000, ease: 'Stepped' }

                ]
            });

            this.tweens.timeline({
                targets: p2_2_2.body.velocity,
                loop: -1,
                tweens: [
                    { x: -80, duration: 1200, ease: 'Stepped' },
                    { x: 80, duration: 1200, ease: 'Stepped' }

                ]
            });

            this.tweens.timeline({
                targets: p2_2_4.body.velocity,
                loop: -1,
                tweens: [
                    { x: 70, duration: 1500, ease: 'Stepped' },
                    { x: -70, duration: 1500, ease: 'Stepped' }

                ]
            });



            this.tweens.timeline({
                targets: p2_2_6.body.velocity,
                loop: -1,
                tweens: [
                    { y: 40, duration: 2500, ease: 'Stepped' },
                    { y: -40, duration: 2500, ease: 'Stepped' }

                ]
            });


        }



    }

    crearPlataformasElectricidad1(that) {
        var that_ = this;

        let p1_3_1 = this.physics.add.image(108 + 1180 * this.escenarios[3].pos, 300, "elecplatform").setImmovable(true);
        p1_3_1.displayHeight = 20;
        p1_3_1.displayWidth = 80;

        let p1_3_2 = this.physics.add.image(290 + 1180 * this.escenarios[3].pos, 180, "elecplatform").setImmovable(true);
        p1_3_2.displayHeight = 20;
        p1_3_2.displayWidth = 80;



        let p1_3_3 = this.physics.add.image(190 + 1180 * this.escenarios[3].pos, 180, "elecplatform").setImmovable(true);
        p1_3_3.displayHeight = 20;
        p1_3_3.displayWidth = 80;



        let p1_3_4 = this.physics.add.image(40 + 1180 * this.escenarios[3].pos, 115, "elecplatform").setImmovable(true);
        p1_3_4.displayHeight = 20;
        p1_3_4.displayWidth = 80;

        //let p1_3_5=this.physics.add.image( 500 ,115, "gymplatform").setImmovable(true);   

        let p1_3_5 = this.physics.add.image(500 + 1180 * this.escenarios[3].pos, 200, "elecplatform").setImmovable(true).setVelocity(0, 100);
        p1_3_5.displayHeight = 20;
        p1_3_5.displayWidth = 80;



        let p1_3_6 = this.physics.add.image(600 + 1180 * this.escenarios[3].pos, 150, "elecplatform").setImmovable(true);
        p1_3_6.displayHeight = 20;
        p1_3_6.displayWidth = 80;

        let p1_3_7 = this.physics.add.image(840 + 1180 * this.escenarios[3].pos, 250, "elecplatform").setImmovable(true);
        p1_3_7.displayHeight = 20;
        p1_3_7.displayWidth = 220;


        let grupoP1_elec = this.add.group();
        grupoP1_elec.add(p1_3_1);
        var intermitence = setInterval(() => {
            p1_3_1.alpha = p1_3_1.alpha == 1 ? 0 : 1;
            p1_3_1.alpha == 1 ? grupoP1_elec.add(p1_3_1) : grupoP1_elec.remove(p1_3_1);
        }, 1000);
        grupoP1_elec.add(p1_3_2);
        grupoP1_elec.add(p1_3_3);
        grupoP1_elec.add(p1_3_4);
        grupoP1_elec.add(p1_3_5);
        grupoP1_elec.add(p1_3_6);
        var intermitence = setInterval(() => {
            p1_3_6.alpha = p1_3_6.alpha == 1 ? 0 : 1;
            p1_3_6.alpha == 1 ? grupoP1_elec.add(p1_3_6) : grupoP1_elec.remove(p1_3_6);
        }, 1500);
        grupoP1_elec.add(p1_3_7);


        //Colisión plataformas electricidad
        this.physics.add.collider(this.playerU, grupoP1_elec);

        this.plataformasElectricidadP1[0] = p1_3_2;
        this.plataformasElectricidadP1[1] = p1_3_3;
        this.plataformasElectricidadP1[2] = p1_3_5;



        if (this.yo.side === 1) {
            this.tweens.timeline({
                targets: p1_3_2.body.velocity,
                loop: -1,
                tweens: [
                    { x: -30, y: 30, duration: 2200, ease: 'Stepped' },
                    { x: 30, y: -30, duration: 2200, ease: 'Stepped' }

                ]
            });

            this.tweens.timeline({
                targets: p1_3_3.body.velocity,
                loop: -1,
                tweens: [
                    { x: -30, y: -30, duration: 2200, ease: 'Stepped' },
                    { x: 30, y: 30, duration: 2200, ease: 'Stepped' }

                ]
            });


            this.tweens.timeline({

                targets: p1_3_5.body.velocity,
                loop: -1,
                duration: 1000,

                tweens: [
                    { x: { value: -100, ease: 'Sine.easeOut' }, y: { value: 0, ease: 'Sine.easeIn' } },
                    { x: { value: 0, ease: 'Sine.easeIn' }, y: { value: -100, ease: 'Sine.easeOut' } },
                    { x: { value: 100, ease: 'Sine.easeOut' }, y: { value: 0, ease: 'Sine.easeIn' } },
                    { x: { value: 0, ease: 'Sine.easeIn' }, y: { value: 100, ease: 'Sine.easeOut' } },

                ],
                onLoop: function () {
                    p1_3_5.body.reset(500 + 1180 * that_.escenarios[3].pos, 200);
                }
            });


        }



    }

    crearPlataformasElectricidad2(that) {
        var that_ = this;

        let p2_3_1 = this.physics.add.image(108 + 1180 * this.escenarios[3].pos, 660, "elecplatform").setImmovable(true);
        p2_3_1.displayHeight = 20;
        p2_3_1.displayWidth = 80;



        let p2_3_2 = this.physics.add.image(290 + 1180 * this.escenarios[3].pos, 540, "elecplatform").setImmovable(true);
        p2_3_2.displayHeight = 20;
        p2_3_2.displayWidth = 80;


        let p2_3_3 = this.physics.add.image(190 + 1180 * this.escenarios[3].pos, 540, "elecplatform").setImmovable(true);
        p2_3_3.displayHeight = 20;
        p2_3_3.displayWidth = 80;



        let p2_3_4 = this.physics.add.image(40 + 1180 * this.escenarios[3].pos, 475, "elecplatform").setImmovable(true);
        p2_3_4.displayHeight = 20;
        p2_3_4.displayWidth = 80;

        //let p1_3_5=this.physics.add.image( 500 ,115, "gymplatform").setImmovable(true);   

        let p2_3_5 = this.physics.add.image(500 + 1180 * this.escenarios[3].pos, 560, "elecplatform").setImmovable(true).setVelocity(0, 100);
        p2_3_5.displayHeight = 20;
        p2_3_5.displayWidth = 80;



        let p2_3_6 = this.physics.add.image(600 + 1180 * this.escenarios[3].pos, 510, "elecplatform").setImmovable(true);
        p2_3_6.displayHeight = 20;
        p2_3_6.displayWidth = 80;

        let p2_3_7 = this.physics.add.image(840 + 1180 * this.escenarios[3].pos, 610, "elecplatform").setImmovable(true);
        p2_3_7.displayHeight = 20;
        p2_3_7.displayWidth = 220;


        let grupoP2_elec = this.add.group();
        grupoP2_elec.add(p2_3_1);
        var intermitence = setInterval(() => {
            p2_3_1.alpha = p2_3_1.alpha == 1 ? 0 : 1;
            p2_3_1.alpha == 1 ? grupoP2_elec.add(p2_3_1) : grupoP2_elec.remove(p2_3_1);
        }, 1000);
        grupoP2_elec.add(p2_3_2);
        grupoP2_elec.add(p2_3_3);
        grupoP2_elec.add(p2_3_4);
        grupoP2_elec.add(p2_3_5);
        grupoP2_elec.add(p2_3_6);
        var intermitence = setInterval(() => {
            p2_3_6.alpha = p2_3_6.alpha == 1 ? 0 : 1;
            p2_3_6.alpha == 1 ? grupoP2_elec.add(p2_3_6) : grupoP2_elec.remove(p2_3_6);
        }, 1500);
        grupoP2_elec.add(p2_3_7);


        //Colisión plataformas electricidad
        this.physics.add.collider(this.playerD, grupoP2_elec);

        this.plataformasElectricidadP2[0] = p2_3_2;
        this.plataformasElectricidadP2[1] = p2_3_3;
        this.plataformasElectricidadP2[2] = p2_3_5;

        if (this.yo.side === 2) {

            this.tweens.timeline({
                targets: p2_3_2.body.velocity,
                loop: -1,
                tweens: [
                    { x: -30, y: 30, duration: 2200, ease: 'Stepped' },
                    { x: 30, y: -30, duration: 2200, ease: 'Stepped' }

                ]
            });
            this.tweens.timeline({
                targets: p2_3_3.body.velocity,
                loop: -1,
                tweens: [
                    { x: -30, y: -30, duration: 2200, ease: 'Stepped' },
                    { x: 30, y: 30, duration: 2200, ease: 'Stepped' }

                ]
            });
            this.tweens.timeline({

                targets: p2_3_5.body.velocity,
                loop: -1,
                duration: 1000,

                tweens: [
                    { x: { value: -100, ease: 'Sine.easeOut' }, y: { value: 0, ease: 'Sine.easeIn' } },
                    { x: { value: 0, ease: 'Sine.easeIn' }, y: { value: -100, ease: 'Sine.easeOut' } },
                    { x: { value: 100, ease: 'Sine.easeOut' }, y: { value: 0, ease: 'Sine.easeIn' } },
                    { x: { value: 0, ease: 'Sine.easeIn' }, y: { value: 100, ease: 'Sine.easeOut' } },

                ],
                onLoop: function () {
                    //p1_3_5.body.reset(500,115);
                    p2_3_5.body.reset(500 + 1180 * that_.escenarios[3].pos, 560);
                }
            });

        }





    }

    crearPlataformasLaboratorio1() {
        let p1_4_1 = this.physics.add.image(120 + 1180 * this.escenarios[4].pos, 275, "labplatform").setImmovable(true);
        p1_4_1.displayHeight = 20;
        p1_4_1.displayWidth = 80;



        let p1_4_2 = this.physics.add.image(745 + 1180 * this.escenarios[4].pos, 315, "labplatform").setImmovable(true);
        p1_4_2.displayHeight = 20;
        p1_4_2.displayWidth = 80;

        let p1_4_3 = this.physics.add.image(845 + 1180 * this.escenarios[4].pos, 275, "labplatform").setImmovable(true);
        p1_4_3.displayHeight = 20;
        p1_4_3.displayWidth = 90;

        let p1_4_4 = this.physics.add.image(220 + 1180 * this.escenarios[4].pos, 305, "labplatform").setImmovable(true);
        p1_4_4.displayHeight = 20;
        p1_4_4.displayWidth = 80;

        let grupoP1_Lab = this.add.group();
        grupoP1_Lab.add(p1_4_1);
        grupoP1_Lab.add(p1_4_2);
        grupoP1_Lab.add(p1_4_3);
        grupoP1_Lab.add(p1_4_4);

        this.physics.add.collider(this.playerU, grupoP1_Lab);


        this.plataformasLaboratorioP1[0] = p1_4_1;

        if (this.yo.side === 1) {
            this.tweens.timeline({
                targets: p1_4_1.body.velocity,
                loop: -1,
                tweens: [
                    { y: -40, duration: 3500, ease: 'Stepped' },
                    { y: 40, duration: 3500, ease: 'Stepped' }

                ]
            });
        }

    }

    crearPlataformasLaboratorio2() {
        let p2_4_1 = this.physics.add.image(120 + 1180 * this.escenarios[4].pos, 275 + this.game.canvas.height / 2, "labplatform").setImmovable(true);
        p2_4_1.displayHeight = 20;
        p2_4_1.displayWidth = 80;



        let p2_4_2 = this.physics.add.image(745 + 1180 * this.escenarios[4].pos, 675, "labplatform").setImmovable(true);
        p2_4_2.displayHeight = 20;
        p2_4_2.displayWidth = 80;

        let p2_4_3 = this.physics.add.image(845 + 1180 * this.escenarios[4].pos, 635, "labplatform").setImmovable(true);
        p2_4_3.displayHeight = 20;
        p2_4_3.displayWidth = 90;

        let p2_4_4 = this.physics.add.image(220 + 1180 * this.escenarios[4].pos, 665, "labplatform").setImmovable(true);
        p2_4_4.displayHeight = 20;
        p2_4_4.displayWidth = 80;

        let grupoP2_Lab = this.add.group();
        grupoP2_Lab.add(p2_4_1);
        grupoP2_Lab.add(p2_4_2);
        grupoP2_Lab.add(p2_4_3);
        grupoP2_Lab.add(p2_4_4);


        this.physics.add.collider(this.playerD, grupoP2_Lab);

        this.plataformasLaboratorioP2[0] = p2_4_1;


        if (this.yo.side === 2) {
            this.tweens.timeline({
                targets: p2_4_1.body.velocity,
                loop: -1,
                tweens: [
                    { y: -40, duration: 3500, ease: 'Stepped' },
                    { y: 40, duration: 3500, ease: 'Stepped' }

                ]
            });
        }

    }

    crearPlataformasNieve1() {
        let p1_5_1 = this.physics.add.image(100 + 1180 * this.escenarios[2].pos, 295, "snowplat").setImmovable(true);
        p1_5_1.displayHeight = 20;
        p1_5_1.displayWidth = 80;
        p1_5_1.body.friction.x = 0.3;




        let p1_5_2 = this.physics.add.image(300 + 1180 * this.escenarios[2].pos, 225, "snowplat").setImmovable(true);
        p1_5_2.displayHeight = 20;
        p1_5_2.displayWidth = 80;


        let p1_5_3 = this.physics.add.image(495 + 1180 * this.escenarios[2].pos, 225, "snowplat").setImmovable(true);
        p1_5_3.displayHeight = 20;
        p1_5_3.displayWidth = 80;
        p1_5_3.body.friction.x = 0.3;



        let p1_5_4 = this.physics.add.image(595 + 1180 * this.escenarios[2].pos, 185, "snowplat").setImmovable(true);
        p1_5_4.displayHeight = 20;
        p1_5_4.displayWidth = 40;

        let p1_5_5 = this.physics.add.image(975 + 1180 * this.escenarios[2].pos, 210, "snowplat").setImmovable(true);
        p1_5_5.displayHeight = 20;
        p1_5_5.displayWidth = 80;
        p1_5_5.body.friction.x = 0.2;




        let grupoP1_snow = this.add.group();
        grupoP1_snow.add(p1_5_1);
        grupoP1_snow.add(p1_5_2);
        grupoP1_snow.add(p1_5_3);
        grupoP1_snow.add(p1_5_4);
        grupoP1_snow.add(p1_5_5);

        this.physics.add.collider(this.playerU, grupoP1_snow);


        this.plataformasNieveP1[0] = p1_5_1;
        this.plataformasNieveP1[1] = p1_5_3;
        this.plataformasNieveP1[2] = p1_5_5;


        if (this.yo.side === 1) {
            this.tweens.timeline({
                targets: p1_5_1.body.velocity,
                loop: -1,
                tweens: [
                    { x: 60, duration: 1000, ease: 'Stepped' },
                    { x: -60, duration: 1000, ease: 'Stepped' }

                ]
            });

            this.tweens.timeline({
                targets: p1_5_3.body.velocity,
                loop: -1,
                tweens: [
                    { x: -70, duration: 1500, ease: 'Stepped' },
                    { x: 70, duration: 1500, ease: 'Stepped' }

                ]
            });

            this.tweens.timeline({
                targets: p1_5_5.body.velocity,
                loop: -1,
                tweens: [
                    { x: -95, duration: 2500, ease: 'Stepped' },
                    { x: 95, duration: 2500, ease: 'Stepped' }

                ]
            });
        }



    }

    crearPlataformasNieve2() {
        let p2_5_1 = this.physics.add.image(100 + 1180 * this.escenarios[2].pos, 655, "snowplat").setImmovable(true);
        p2_5_1.displayHeight = 20;
        p2_5_1.displayWidth = 80;
        p2_5_1.body.friction.x = 0.3;




        let p2_5_2 = this.physics.add.image(300 + 1180 * this.escenarios[2].pos, 585, "snowplat").setImmovable(true);
        p2_5_2.displayHeight = 20;
        p2_5_2.displayWidth = 80;


        let p2_5_3 = this.physics.add.image(495 + 1180 * this.escenarios[2].pos, 585, "snowplat").setImmovable(true);
        p2_5_3.displayHeight = 20;
        p2_5_3.displayWidth = 80;
        p2_5_3.body.friction.x = 0.3;


        let p2_5_4 = this.physics.add.image(595 + 1180 * this.escenarios[2].pos, 545, "snowplat").setImmovable(true);
        p2_5_4.displayHeight = 20;
        p2_5_4.displayWidth = 40;

        let p2_5_5 = this.physics.add.image(975 + 1180 * this.escenarios[2].pos, 210 + this.game.canvas.height / 2, "snowplat").setImmovable(true);
        p2_5_5.displayHeight = 20;
        p2_5_5.displayWidth = 80;
        p2_5_5.body.friction.x = 0.2;



        let grupoP2_snow = this.add.group();
        grupoP2_snow.add(p2_5_1);
        grupoP2_snow.add(p2_5_2);
        grupoP2_snow.add(p2_5_3);
        grupoP2_snow.add(p2_5_4);
        grupoP2_snow.add(p2_5_5);

        this.physics.add.collider(this.playerD, grupoP2_snow);


        this.plataformasNieveP2[0] = p2_5_1;
        this.plataformasNieveP2[1] = p2_5_3;
        this.plataformasNieveP2[2] = p2_5_5;

        if (this.yo.side === 2) {
            this.tweens.timeline({
                targets: p2_5_1.body.velocity,
                loop: -1,
                tweens: [
                    { x: 60, duration: 1000, ease: 'Stepped' },
                    { x: -60, duration: 1000, ease: 'Stepped' }

                ]
            });

            this.tweens.timeline({
                targets: p2_5_3.body.velocity,
                loop: -1,
                tweens: [
                    { x: -70, duration: 1500, ease: 'Stepped' },
                    { x: 70, duration: 1500, ease: 'Stepped' }

                ]
            });


            this.tweens.timeline({
                targets: p2_5_5.body.velocity,
                loop: -1,
                tweens: [
                    { x: -95, duration: 2500, ease: 'Stepped' },
                    { x: 95, duration: 2500, ease: 'Stepped' }

                ]
            });


        }



    }


    //#endregion



    unlockP1() {
        //console.log("unlock")

        this.keyLockP1 = false;
    }

    unlockP2() {
        //console.log("unlock")

        this.keyLockP2 = false;
    }


    delayDone() {
        this.playerU.body.setSize(this.playerU.width * 0.25, this.playerU.height, true)
        this.playerD.body.setSize(this.playerD.width * 0.25, this.playerD.height, true)
        this.playerU.setGravityY(3000);
        this.playerD.setGravityY(3000);
        // ! this.empezar();
    }



    keyDelete() {
        this.input.keyboard.clearCaptures();
    }

    borrarIntervalos() {


        this.keyDelete();
        var interval_id = window.setInterval("", 9999); // Get a reference to the last
        // interval +1
        for (var i = 1; i < interval_id; i++)
            window.clearInterval(i);
        //for clearing all intervals
    }

    endP1(bandera) {
        var that = this
        console.log("bandera p1")
        this.pararP1();
        this.end.player1 = true;


        if (this.end.player1 === true && this.end.player2 === true) {
            this.borrarIntervalos();
            if (this.online) {
                this.handler.close();
            }
            this.scene.start("Victoria", {
                escena: null,
                soundManager: this.soundManager,
                ganador: 2,
                nameP1: this.playerU.name,
                nameP2: this.playerD.name,
                tiempoP1: this.tiempoFinalP1,
                tiempoP2: this.tiempoFinalP2,
                online: this.online,
                yo: this.yo,
                lobby: this.lobby,

            });
        }
        bandera.destroy();
        this.BP1.destroy();
    }

    endP2(bandera) {
        console.log("bandera p2")
        this.pararP2();
        this.end.player2 = true;
        if (this.end.player1 === true && this.end.player2 === true) {
            this.borrarIntervalos();
            if (this.online) {
                this.handler.close();
            }
            this.scene.start("Victoria", {
                escena: null,
                soundManager: this.soundManager,
                ganador: 1,
                nameP1: this.playerU.name,
                nameP2: this.playerD.name,
                tiempoP1: this.tiempoFinalP1,
                tiempoP2: this.tiempoFinalP2,
                online: this.online,
                yo: this.yo,
                lobby: this.lobby
            });
        }
        bandera.destroy();
        this.BP2.destroy();
    }



    funcionOverlapP1() {
        if (this.keyboardP1.E.isDown === true && !this.escenasActivas[0] && this.yo.side === 1) {

            var msg = {
                tipo: "BOTONES",
                w: false,
                a: false,
                side: 1,
                d: false,
                e: true,
                touching: false
            }
            this.handler.send(JSON.stringify(msg));
            return true
        } else if (this.yo.side === 2 && this.Eauxiliar === true) {
            this.Eauxiliar = false;
            return true;
        }
        else {
            return false
        }

    }

    funcionOverlapP2() {
        if (this.keyboardP1.E.isDown === true && !this.escenasActivas[1] && this.yo.side === 2) {
            var msg = {
                tipo: "BOTONES",
                w: false,
                a: false,
                side: 2,
                d: false,
                e: true,
                touching: false
            }
            this.handler.send(JSON.stringify(msg));
            return true
        } else if (this.yo.side === 1 && this.Eauxiliar === true) {
            this.Eauxiliar = false;
            return true;
        }
        else {
            return false
        }

    }

    //API REST COSAS//


    getLobbyPlayers(callback) {
        var that = this
        let idPartida = this.partidaDatos.id
        $.ajax({
            url: 'http://localhost:8080/partida/' + idPartida,

        }).done(function (partida) {
            //console.log("Partida de getLobby", partida)
            if (typeof callback !== 'undefined') {
                if (partida !== null) {
                    //asignamos la posición en la partida del jugador que se haya loggeado (P1 o P2)
                    // if (that.yo.side === 1 && partida.p1.side === 1) {
                    //     that.yo = partida.p1;
                    // } else if (that.yo.side === 2 && partida.p1.side === 2) {
                    //     that.yo = partida.p2;
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
            this.online = false;
            if (this.handler.readyState === 1)
                this.handler.close();
            //borramos el nombre, el estado, los ids y las posiciones del JSON, y devolvemos al jugador al menú principal
            this.yo.user = "";
            this.yo.status = "";
            this.yo.id = 0;
            this.yo.side = 0;
            this.cerrarEscenas();
            this.scene.start("MAINMENU", { escena: null, soundManager: this.soundManager });
        })

    }

    putPlayer(player, callback) {

        let partidaID = this.partidaDatos.id;
        $.ajax({
            method: "PUT",
            url: 'http://localhost:8080/partida/player/' + partidaID,
            data: JSON.stringify(player),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (partida) {
            if (typeof callback !== 'undefined') {

                callback(partida)
            }
        }).fail(() => {
            //Si el servidor no está disponible, borramos todos los intervalos de tiempo establecidos
            this.borrarIntervalos();
            alert("Los servidores no se encuentran disponibles, volviendo al menú principal");
            //borramos el nombre, el estado, los ids y las posiciones del JSON, y devolvemos al jugador al menú principal
            // ? Desconectamos del socket
            this.online = false;
            if (this.handler.readyState === 1)
                this.handler.close();
            this.yo.user = "";
            this.yo.status = "";
            this.yo.id = 0;
            this.yo.side = 0;
            this.cerrarEscenas();
            this.scene.start("MAINMENU", { escena: null, soundManager: this.soundManager });
        })
    }

    todos(players, callback) {

        if (players[0].status === "" || players[0].status === "disconected" || players[0].status === null) {
            this.borrarIntervalos();

            // let player;
            // player.user = this.yo.user ;
            // player.status = this.yo.status ;
            // player.id = this.yo.id ;
            // player.side = this.yo.side ;


            //! Se ha caido un jugador

            // ? Desconectamos del socket
            this.online = false;
            if (this.handler.readyState === 1)
                this.handler.close();


            this.yo.user = "";
            this.yo.status = "";
            this.yo.id = 0;
            this.yo.side = 0;
            alert("Player 1 desconectado, volviendo al menu principal");
            this.eliminarUsuario(this.yo, () => {
                this.yo = null;
                this.eliminarUsuario(players[1], () => {
                    console.log("borrados")
                    this.cerrarEscenas();
                    this.scene.start("MAINMENU", { escena: null, soundManager: this.soundManager });
                })
            })
            return
        }
        if (players[1].status === "" || players[1].status === "disconected" || players[1].status === null) {
            this.borrarIntervalos();


            // ? Desconectamos del socket
            this.online = false;
            if (this.handler.readyState === 1)
                this.handler.close();


            this.yo.user = "";
            this.yo.status = "";
            this.yo.id = 0;
            this.yo.side = 0;
            alert("Player 2 desconectado, volviendo al menu principal");
            this.eliminarUsuario(this.yo, () => {
                this.yo = null;
                this.eliminarUsuario(players[0], () => {
                    console.log("borrados")
                    this.cerrarEscenas();
                    this.scene.start("MAINMENU", { escena: null, soundManager: this.soundManager });
                })
            })
            return
        }


        //! esto en teoria ya no se tiene que ejecutar esto era antes de WS
        if (players[0].status === "win") {
            this.borrarIntervalos();
            console.log(players)
            this.yo.user = "";
            this.yo.status = "";
            this.yo.id = 0;
            this.yo.side = 0;
            alert("Player 1 ya ha llegado a la meta, volviendo al menu principal");
            this.eliminarUsuario(players[0], () => {
                this.yo = null;
                this.eliminarUsuario(players[1], () => {
                    console.log("borrados")
                    console.log(players)
                    this.scene.start("MAINMENU", { escena: null, soundManager: this.soundManager });
                })
            })
            return

        }

        if (players[1].status === "win") {
            this.borrarIntervalos();

            this.yo.user = "";
            this.yo.status = "";
            this.yo.id = 0;
            this.yo.side = 0;

            alert("Player 2 ya ha llegado a la meta, volviendo al menu principal");
            this.eliminarUsuario(players[1], () => {
                this.yo = null;
                this.eliminarUsuario(players[0], () => {
                    console.log("borrados")
                    console.log(players)
                    this.scene.start("MAINMENU", { escena: null, soundManager: this.soundManager });
                })
            })
            return

        }


        if (typeof callback !== 'undefined') {
            callback()
        }

    }

    eliminarUsuario(player, callback) {
        //console.log(player)

        player.status = null
        player.user = null;
        player.id = 0;
        this.putPlayer(player, callback)

    }

    playerPulseMnj(message) {
        var that = this;

        if (message.side === 1) {

            if (!that.escenasActivas[0]) {

                if (message.w === true && message.touching) {
                    that.playerU.setVelocityY(-750);

                }

                if (message.a === true) {
                    that.playerU.body.setVelocityX(-that.playerU.velocidad);
                    if (message.touching) {
                        that.playerU.anims.play("CorrerIzquierdaP1", true);
                    } else {
                        that.playerU.anims.play("SaltoIzquierdaP1", true);
                    }

                }
                if (message.d === true) {
                    that.playerU.body.setVelocityX(that.playerU.velocidad);
                    if (message.touching) {
                        that.playerU.anims.play("CorrerDerechaP1", true);
                    } else {
                        that.playerU.anims.play("SaltoDerechaP1", true);
                    }
                }

                if (message.d === false && message.a === false && message.w === false) {
                    if (that.playerU.body.velocity.x > 0) {
                        that.playerU.anims.stop();
                        that.playerU.anims.play("IdleDerechaP1", true);
                    }
                    if (that.playerU.body.velocity.x < 0) {
                        that.playerU.anims.stop();
                        that.playerU.anims.play("IdleIzquierdaP1", true);
                    }
                    that.playerU.body.setVelocityX(0);
                }
                if (message.e === true) {

                    that.Eauxiliar = true;
                } else {
                    that.Eauxiliar = false;
                }


            }
        } else if (message.side === 2) {
            if (!that.escenasActivas[1]) {
                if (message.w === true && message.touching) {
                    that.playerD.setVelocityY(-750); //cambiar para que salte menos y poder bajar plataformas

                }

                if (message.a === true) {
                    that.playerD.body.setVelocityX(-that.playerD.velocidad);
                    if (message.touching) {
                        that.playerD.anims.play("CorrerIzquierdaP2", true);
                    } else {
                        that.playerD.anims.play("SaltoIzquierdaP2", true);
                    }

                }
                if (message.d === true) {
                    that.playerD.body.setVelocityX(that.playerD.velocidad);
                    if (message.touching) {
                        that.playerD.anims.play("CorrerDerechaP2", true);
                    } else {
                        that.playerD.anims.play("SaltoDerechaP2", true);
                    }
                }

                if (message.d === false && message.a === false && message.w === false) {
                    if (that.playerD.body.velocity.x > 0) {
                        that.playerD.anims.stop();
                        that.playerD.anims.play("IdleDerechaP2", true);
                    }
                    if (that.playerD.body.velocity.x < 0) {
                        that.playerD.anims.stop();
                        that.playerD.anims.play("IdleIzquierdaP2", true);
                    }
                    that.playerD.body.setVelocityX(0);
                }

                if (message.e === true) {

                    that.Eauxiliar = true;
                } else {
                    that.Eauxiliar = false;
                }

            }
        }


    }


    PlayerPositionMnj(message) {
        var that = this;
        if (message.side === 1) {
            //console.log(message)
            // Personaje 1
            if (!that.escenasActivas[0]) {
                that.playerU.x = message.x;
                that.playerU.y = message.y;
            }
        } else if (message.side === 2) {
            if (!that.escenasActivas[1]) {
                that.playerD.x = message.x;
                that.playerD.y = message.y;
            }
        }

    }


    gameEventMnj(message) {
        var that = this;
        if (message.portal !== "null") {

            //Player 1
            if (message.portal === "gimansioP1") {

                that.crearPortalGimnasioP1();

                that.escenarios[0].completadoP1U = true;
                that.PCU.tint.onChange(0xE74C3C)
            } else if (message.portal === "contadorP1") {
                that.escenarios[1].completadoP1U = true;
                that.crearPortalPulsadorP1();
            } else if (message.portal === "electricidadP1") {
                that.escenarios[3].completadoP1U = true;
                that.crearPortalElectricidadP1();
                that.PEPU.tint.onChange(0xE74C3C)
            } else if (message.portal === "laboratorioP1") {
                that.crearPortalLaboratorioP1();
                that.escenarios[4].completadoP1U = true;
                that.LP1.destroy();
                that.particlesLPU.destroy()
            }
            //Player 2
            else if (message.portal === "gimansioP2") {
                that.escenarios[0].completadoP2U = true;
                that.crearPortalGimnasioP2();
                that.PCD.tint.onChange(0xE74C3C)
            } else if (message.portal === "contadorP2") {
                that.escenarios[1].completadoP2U = true;
                that.crearPortalPulsadorP2();
            } else if (message.portal === "electricidadP2") {
                that.escenarios[3].completadoP2U = true;
                that.crearPortalElectricidadP2();
                that.PEPD.tint.onChange(0xE74C3C)
            } else if (message.portal === "laboratorioP2") {
                that.crearPortalLaboratorioP2();
                that.escenarios[4].completadoP2U = true;
                that.LP2.destroy();
                that.particlesLPD.destroy()
            }

        }
        if (message.teletransporte !== "null") {

            let pos = parseInt(message.teletransporte);
            console.log("Pos : " + pos + " || Mensaje pos: " + message.teletransporte);
            if (that.yo.side === 1) {
                that.teletransporteD(that.playerD, pos, that.cam2, true);
            } else {
                that.teletransporte(that.playerU, pos, that.cam1, true);
            }


        }
        if (message.powerUp !== "null") {
            //Player 1
            if (message.powerUp === "rayosD") {

                that.crearRayosP1();
                that.escenarios[0].completadoP1D = true;
                that.particlesCPU.destroy()
                that.CP1.destroy()


            } else if (message.powerUp === "masP1") {
                that.crearMasTP1();
            } else if (message.powerUp === "blindP1") {
                that.crearBlindP1();
                that.escenarios[3].completadoP1D = true;
                that.particlesEPU.destroy()
                that.escena.EP1.destroy();
            }
            //Player 2
            else if (message.powerUp === "rayosU") {
                that.crearRayosP2();
                that.escenarios[0].completadoP2D = true;
                that.particlesCPD.destroy()
                that.CP2.destroy()

            } else if (message.powerUp === "masP2") {
                that.crearMasTP2();
            } else if (message.powerUp === "blindP2") {
                that.crearBlindP1();
                that.escenarios[3].completadoP2D = true;
                that.particlesEPD.destroy()
                that.escena.EP2.destroy();
            }







        }
    }


    adjustplatforms(message) {
        var that = this;
        if (this.yo.side === 2) {
            let plataformas = message.arrayPlatforms;
            let escenario = message.escenario;
            let tam = this.escenarios[escenario].plataformasP1.length;
            // console.log("Plataformas ", plataformas)
            // console.log("Escenario ", escenario)
            // console.log("tam ", tam)
            // console.log("Actualizando plataformas de p1 en P2")
            if (this.ultimaActualizacionPlataforma !== escenario) {
                console.log("Cambio de escenario!!!!!!! ");
                let tama = this.escenarios[this.ultimaActualizacionPlataforma].plataformasP1.length;
                for (let i = 0; i < tama; i++) {

                    this.escenarios[this.ultimaActualizacionPlataforma].plataformasP1[i].x = 0;
                    this.escenarios[this.ultimaActualizacionPlataforma].plataformasP1[i].y = 0;
                    this.escenarios[this.ultimaActualizacionPlataforma].plataformasP1[i].body.velocity.x = 0;
                    this.escenarios[this.ultimaActualizacionPlataforma].plataformasP1[i].body.velocity.y = 0;
                }

                this.ultimaActualizacionPlataforma = escenario;
            }
            for (let i = 0; i < tam; i++) {
                let j = i * 3;
                this.escenarios[escenario].plataformasP1[i].x = plataformas[j];
                this.escenarios[escenario].plataformasP1[i].y = plataformas[j + 1];
                this.escenarios[escenario].plataformasP1[i].body.velocity.x = plataformas[j + 2].x;
                this.escenarios[escenario].plataformasP1[i].body.velocity.y = plataformas[j + 2].y;
            }
        } else {
            let plataformas = message.arrayPlatforms;
            let escenario = message.escenario;
            let tam = this.escenarios[escenario].plataformasP1.length;
            if (this.ultimaActualizacionPlataforma !== escenario) {
                console.log("Cambio de escenario!!!!!!! ");
                let tama = this.escenarios[this.ultimaActualizacionPlataforma].plataformasP1.length;
                for (let i = 0; i < tama; i++) {

                    this.escenarios[this.ultimaActualizacionPlataforma].plataformasP2[i].x = 0;
                    this.escenarios[this.ultimaActualizacionPlataforma].plataformasP2[i].y = 0;
                    this.escenarios[this.ultimaActualizacionPlataforma].plataformasP2[i].body.velocity.x = 0;
                    this.escenarios[this.ultimaActualizacionPlataforma].plataformasP2[i].body.velocity.y = 0;
                }

                this.ultimaActualizacionPlataforma = escenario;
            }
            for (let i = 0; i < tam; i++) {
                let j = i * 3;
                this.escenarios[escenario].plataformasP2[i].x = plataformas[j];
                this.escenarios[escenario].plataformasP2[i].y = plataformas[j + 1];
                this.escenarios[escenario].plataformasP2[i].body.velocity.x = plataformas[j + 2].x;
                this.escenarios[escenario].plataformasP2[i].body.velocity.y = plataformas[j + 2].y;
            }
        }


    }



    onMensajeHandler() {
        var that = this;
        this.handler.onmessage = function (msg) {
            var message = JSON.parse(msg.data)
            if (message.tipo != "POSICION" && message.tipo != "EVENTOS" && message.tipo != "BOTONES") {
                //console.log("message, AAAAAAA " + message.tipo, message);
            }


            if (message.tipo === "POSICION") {
                that.PlayerPositionMnj(message);
            } else if (message.tipo === "BOTONES") {
                that.playerPulseMnj(message);
            } else if (message.tipo === "EVENTOS") {
                that.gameEventMnj(message);
            } else if (message.tipo === "CREAR") {
                that.crearPlataformasGimnasioP1();
                that.crearPlataformasGimnasioP2();
                that.crearPlataformasContador1();
                that.crearPlataformasContador2();
                that.crearPlataformasElectricidad1();
                that.crearPlataformasElectricidad2();
                that.crearPlataformasLaboratorio1();
                that.crearPlataformasLaboratorio2();
                that.crearPlataformasNieve1();
                that.crearPlataformasNieve2();

                that.escenarios[0].plataformasP1 = that.plataformasGimnasioP1;
                that.escenarios[0].plataformasP2 = that.plataformasGimnasioP2;
                that.escenarios[1].plataformasP1 = that.plataformasContadorP1;
                that.escenarios[1].plataformasP2 = that.plataformasContadorP2;
                that.escenarios[2].plataformasP1 = that.plataformasNieveP1;
                that.escenarios[2].plataformasP2 = that.plataformasNieveP2;
                that.escenarios[3].plataformasP1 = that.plataformasElectricidadP1;
                that.escenarios[3].plataformasP2 = that.plataformasElectricidadP2;
                that.escenarios[4].plataformasP1 = that.plataformasLaboratorioP1;
                that.escenarios[4].plataformasP2 = that.plataformasLaboratorioP2;



                that.empezar();
                that.loadingBG.destroy();
            } else if (message.tipo = "PLATFORM") {
                //console.log("LO QUE ME LLEGÓ", message);
                that.adjustplatforms(message);
            }

        }


    }



    habilitarPausa(){
        console.log("vamos a activar la pausa")
        setTimeout(()=>{this.ActivarPausa=true},300)
    
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
        this.escenasActivas[0] = false;
        this.escenasActivas[1] = false;

    }






}



export default Scene_play_Online;