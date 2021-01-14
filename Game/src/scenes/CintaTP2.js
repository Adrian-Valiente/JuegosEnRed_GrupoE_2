class CintaTP2 extends Phaser.Scene {
    constructor() {
        super({ key: "CintaTP2" });

    }
    init(data) {
        this.data = data;
        this.soundManager = data.soundManager
    }

    preload() {
        this.data.escena.gimBD.alpha = 1;
    }

    create() {



        this.cinta = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height * 0.75, 'CintaA');
        this.cinta.play('CintaA');
        this.cinta.displayHeight = this.cinta.height * 0.55
        this.cinta.displayWidth = this.cinta.width * 0.55

     
        this.keyboard = this.input.keyboard.addKeys('LEFT,RIGHT');

        this.input.keyboard.on('keyup-'+'LEFT', this.unlock.bind(this));
        this.input.keyboard.on('keyup-'+'RIGHT', this.unlock.bind(this));
        this.teclado = new Array();
        console.log(this.keyboard.W);
        this.contF = 0;
        this.puntuacion = 0;
      
        this.tope = 20;
        this.texto = this.add.text(this.game.canvas.width/2-30, 75+this.game.canvas.height/2).setScrollFactor(0).setFontSize(21).setColor('#2874A6');



    }
    unlock() {
  
        this.keyLock = false;
    }


    update() {

        if (this.keyboard.LEFT.isDown == true && this.keyLock == false) {
            this.keyLock = true;
            this.teclado.push('A');

         

        }
        if (this.keyboard.RIGHT.isDown == true && this.keyLock == false) {
            this.keyLock = true;
            this.teclado.push('D');
        
        }

        //Cerrar nivel
        /*
        if (this.cursor.shift.isDown === true) {

            this.data.escena.escenasActivas[this.data.id] = false;
            this.data.escena.blur2.alpha = 0;
            this.scene.stop(this);
        }
        */


        if (this.teclado[0] != undefined) {
            if (this.ultimaL != this.teclado[0]) {
                console.log("corrido un paso");
                this.cinta.setFrame(this.contF)
                this.contF++;
                this.puntuacion++;
                //Sonido
                this.soundManager.play('Paso1');
                
                if (this.contF >= 3)
                    this.contF = 0;
            } if(this.ultimaL==this.teclado[0]) {
                console.log("Te has tropezado");
                this.cinta.setFrame(3);
                this.puntuacion=0;
            }
            this.ultimaL = this.teclado.shift();
            console.log(this.ultimaL)
        }

        if (this.puntuacion >= this.tope) {
            this.data.escena.escenasActivas[1] = false;
            this.data.escena.gimBD.alpha = 0;
            this.scene.stop(this);
        }

        this.texto.setText([this.puntuacion+'/' + this.tope])
    }




}
export default CintaTP2;