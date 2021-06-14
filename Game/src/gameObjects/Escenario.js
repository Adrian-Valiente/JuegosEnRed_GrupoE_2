class Escenario {
    constructor(nombre, pos, doble) {

        this.nombre = nombre
        this.pos = pos
        this.doble = doble;
        this.completadoP1U = false;
        this.completadoP2U = false;
        this.plataformas
        if (this.doble === true) {
            this.completadoP1D=false;
            this.completadoP2D=false;
        }
    }
}
export default Escenario;