import Bootloader from './bootloader.js';
import Scene_play from './scenes/scene_play.js'
import Scene_play_Online from './scenes/scene_play_Online.js'
import mainMenu from './scenes/mainMenu.js';
import CintaP1 from './scenes/CintaP1.js';
import CintaP1V2 from './scenes/CintaP1V2.js';
import CintaP2V2 from './scenes/CintaP2V2.js';
import CintaP2 from './scenes/CintaP2.js';
import ContadorP1 from './scenes/ContadorP1.js';
import ContadorP2 from './scenes/ContadorP2.js';
import ElectricidadP1 from './scenes/ElectricidadP1.js';
import ElectricidadP2 from './scenes/ElectricidadP2.js';
import ElectricidadP1V2 from './scenes/ElectricidadP1V2.js';
import ElectricidadP2V2 from './scenes/ElectricidadP2V2.js';
import LaboratorioP1 from './scenes/LaboratorioP1.js';
import LaboratorioP2 from './scenes/LaboratorioP2.js';
import Pause from './scenes/Pause.js';
import Tutorial from './scenes/Tutorial.js';
import CintaTP1 from './scenes/CintaTP1.js';
import CintaTP2 from './scenes/CintaTP2.js';
import ContadorTP1 from './scenes/ContadorTP1.js';
import ContadorTP2 from './scenes/ContadorTP2.js';
import ElectricidadTP1 from './scenes/ElectricidadTP1.js';
import ElectricidadTP2 from './scenes/ElectricidadTP2.js';
import LaboratorioTP1 from './scenes/LaboratorioTP1.js';
import LaboratorioTP2 from './scenes/LaboratorioTP2.js';
import Victoria from './scenes/Victoria.js';
import Lobby from './scenes/Lobby.js';
import TeamScreen from './scenes/TeamScreen.js';
import Historial from './scenes/Historial.js';
import SelectorDePartidas from './scenes/SelectorDePartidas.js';
import LobbyOnline from './scenes/LobbyOnline.js';
import LobbyOnlineWS from './scenes/LobbyOnlineWS.js';


const config = {
    type: Phaser.AUTO,
    scale: {
        // mode: Phaser.Scale.ENVELOP,
        parent: "phaser_container",
        
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1080,//'100%',//document.getElementById("contenedor").clientWidth,
        height: 720//'100%'
    },
    audio: {
        disableWebAudio: true
    }
    ,
    dom: {
        createContainer: true
    },
    

    physics: {
        default: "arcade",
        arcade: {
            //gravity: { y: 1000 },
            debug: false
        }
    },
    scene: [
        Bootloader,
        Scene_play,
        Scene_play_Online,
        mainMenu,
        CintaP1,
        CintaP2,
        ContadorP1,
        ContadorP2,
        ElectricidadP1,
        ElectricidadP2,
        CintaP1V2,
        CintaP2V2,
        ElectricidadP1V2,
        ElectricidadP2V2,
        LaboratorioP1,
        LaboratorioP2,
        Tutorial,
        CintaTP1,
        CintaTP2,
        ContadorTP1,
        ContadorTP2,
        ElectricidadTP1,
        ElectricidadTP2,
        LaboratorioTP1,
        LaboratorioTP2,
        Victoria,
        Lobby,
        TeamScreen,
        Historial,
        SelectorDePartidas,
        LobbyOnlineWS,
        LobbyOnline,
        Pause
    ]
}

let game = new Phaser.Game(config);