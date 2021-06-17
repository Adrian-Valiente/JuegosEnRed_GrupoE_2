class CintaTP1 extends Phaser.Scene {
    constructor() {
        super({ key: "CintaTP1" });

    }
    init(data) {
        this.data = data;
        this.soundManager = data.soundManager
    }

    preload() {
        this.data.escena.gimBU.alpha = 1;
    }


    create() {





        this.cinta = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 4, 'CintaA');
        this.cinta.play('CintaA');
        this.cinta.displayHeight = this.cinta.height * 0.55
        this.cinta.displayWidth = this.cinta.width * 0.55



        this.keyboard = this.input.stopPropagation().keyboard.addKeys('A,D,E');




        this.input.keyboard.on('keyup-' + 'A', this.unlock.bind(this));
        this.input.keyboard.on('keyup-' + 'D', this.unlock.bind(this));
        this.teclado = new Array();
        this.aux = new Array();
        this.contF = 0;
        this.puntuacion = 0;
        this.keyLock = false;
        this.tope = 20;
        this.texto = this.add.text(this.game.canvas.width/2-30, 75).setScrollFactor(0).setFontSize(21).setColor('#2874A6');
        this.keyLock = false;
      

    }
    unlock() {
        console.log("unlock")

        this.keyLock = false;
    }


    update() {


        if (this.keyboard.A.isDown == true && this.keyLock == false) {

            this.keyLock = true;
            this.teclado.push('A');
            this.aux.push('A');



        }
        if (this.keyboard.D.isDown == true && this.keyLock == false) {
            this.keyLock = true;
            this.teclado.push('D');
            this.aux.push('D');

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
            this.data.escena.gimBU.alpha = 0;     
            this.scene.stop(this);
        }
        //console.log(this.keyLock)
        this.texto.setText([this.puntuacion+'/' + this.tope])
    }






}
export default CintaTP1;