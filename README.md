# JuegosEnRed_GrupoE

- Adrián Valiente González: a.valiente.2018@alumnos.urjc.es    | Adrian-Valiente
- Aitor García Prádanos:    a.garciap.2018@alumnos.urjc.es     | aitoorgrc
- Daniel Sánchez Cánovas:   d.sanchezc.2018@alumnos.urjc.es    | Elniadas
- Javier Morales Lasheras:  j.morales.2018@alumnos.urjc.es     | javixmorales

# VÍDEO - Uso del juego

[![GÜINDEREIS](https://img.youtube.com/vi/_5sK8UHg8rc/0.jpg)](https://www.youtube.com/watch?v=_5sK8UHg8rc)

# GDD - JUEGOS EN RED

> ## Concepto del juego

> - El estudio, TheNidesJ, está formado por un grupo de 4 personas, Adrián Valiente González, Javier Morales Lasheras, Daniel Sánchez Cánovas y Aitor García Prádanos.

> -	El título del juego será algo original y fuera de todo lo común. Se estableció el siguiente nombre de juego: GüinDeReis (WinTheRace). El nombre ya describe un poco el juego ya que traducido al español sería “Gana la carrera”. 
 
> -   El género del videojuego va a ser un tanto variado. El juego en si trata de una carrera entre dos jugadores, en la cual tienen que ir realizando pruebas. Estas pruebas podrán ser de todo tipo, donde destacan sobre todo los géneros tanto de puzles como de plataformas.
  
> -  La plataforma en la que se quiere centrar para la salida del videojuego es en PC. Se considera que es una muy buena plataforma para lanzar el juego y puede dar una gran repercusión.
 
> - En cuanto a la versión del juego, se lanzará una versión beta que podrá ser probada por determinados jugadores en local para comprobar si el juego pudiera llegar a tener éxito. De ser así se lanzará la versión 1.0 de manera online en PC.
 
> - Sinopsis de Jugabilidad y Contenido (descripción breve del juego, jugabilidad mecánicas y contenido): GüinDeReis es un juego competitivo en el que los jugadores se embarcan en una carrera por resolver diversas pruebas donde la rapidez y la destreza con la que se realiza cada una de ellas, son factores clave. El juego combina distintos géneros y como se mencionó anteriormente, el tiempo es el factor que determina la victoria de un jugador u otro.
 
> - Con relación al aspecto visual, se tratará de un aspecto 2D Flat en el cual veremos el juego desde una perspectiva lateral y a los jugadores corriendo de un lado al otro de la pantalla.

> - El juego ha sido realizado a partir de las ideas que se han ido tomando de otros juegos. Estos han sido, tanto FireBoy and WaterGirl, del cual se ha sacado la idea general del juego. En cuanto a las pruebas y niveles, que serán expuestas posteriormente, Wii Party ha sido una gran inspiración, ya que tiene un modo de juego muy parecido al que se plantea.
 
> - Tecnología (hardware y software que se requiere para producir el juego. Lenguaje de programación, editor de sonidos etc) La tecnología necesaria para el videojuego en cuestión, mayormente va a estar relacionada con JavaScript y HTML

> ## 2. Mecánicas de juego

> - En este apartado se explicará más detalladamente la jugabilidad, progreso de una partida y las acciones que puede llevar a cabo cada jugador en cada momento dentro del mundo del juego. Junto a esto, se describirán los controles del juego, el tipo de cámara empleada en cada evento y cómo se guardan las puntuaciones de los jugadores.

> ### 2.1 Jugabilidad

> - Como se ha mencionado anteriormente, GüinDeReis es un juego donde la rapidez con la que se realiza cada una de las pruebas del circuito del mundo del juego, es crucial para establecer una buena marca de tiempo. Se establece una clasificación general de las pruebas según qué destreza se necesita en cada una de ellas:

> - Cada partida estará compuesta de 4 pruebas para cada jugador, más una quinta donde no habrá que realizar nada pero servirá para finalizar las partidas. Las pruebas se dividen en:
> - Pruebas de rapidez
> - Pruebas de destreza visual / memoria fotográfica
> - Plataformas en el mundo del juego (no pertenece a la categoría de pruebas)

> - Pruebas principales: Deben ser obligatoriamente realizadas por los jugadores para poder terminar el circuito y fijar una marca de tiempo. Los jugadores no podrán acabar su partida hasta haber realizado todas las pruebas.

> - Pruebas secundarias / opcionales: Al terminar una prueba principal y antes de fijar la marca de tiempo, cada jugador optará a realizar una variante de esta (generalmente más difícil o engorrosa). 

> - Si se termina con éxito, los jugadores obtendrán power ups de alto nivel (se hablan de ellos más adelante) con los cuales podrán perjudicar al contrario. 
El power up se activa al terminar la prueba secundaria, afectando a su rival al instante y en tiempo real, aunque esté realizando su prueba. 
Realizar las pruebas secundarias tiene sus ventajas pero también sus inconvenientes, ocupando más tiempo de los jugadores antes de fijar la marca de tiempo en cada escenario, por lo que conviene valorar el beneficio / riesgo de realizarla o no.

> - Power Ups de nivel bajo: estos se encuentran sueltos por el mapa, alrededor del circuito de pruebas (escondidos o en lo alto de plataformas). Los efectos de estos power ups afectarán en el jugador que los recoja y no en el contrincante. 

> - +Movement speed: el jugador se mueve con mayor rapidez

![RunPowerUp](https://github.com/Elniadas/JuegosEnRed_GrupoE/blob/main/Images/RUN.png)

> - -Time: el jugador podrá restar pocos segundos a su marcador

![RelojArena](https://github.com/Elniadas/JuegosEnRed_GrupoE/blob/main/Images/relojArena.png)

> - Power ups de alto nivel: obtenidos al realizar las pruebas secundarias. Causan un gran impacto en el circuito de pruebas del jugador contrario. Se activan al instante, al terminar con éxito una prueba secundaria. Algunos de estos pueden ser:

> - Blindsighted: Durante un breve periodo de tiempo, el jugador contrario verá reducido su campo de visión. (Obtenido en prueba de electricidad)
> - Laser Storm: A lo largo del circuito del jugador contrario, spawnearán intermitentemente rayos que se deberán esquivar; el jugador que toque los rayos tendrá su velocidad de movimiento reducida (Obtenido en prueba de gimnasio)
> - Time++: Suma tiempo al contador del jugador contrario. (Obtenido en prueba de contador)

> ### 2.2 Flujo del Juego

> - En el siguiente apartado se describirán de forma general el transcurso de una partida desde el arranque del juego, incluyendo las dependencias con el servidor y posteriormente, en el apartado de Niveles, se detalla cada una de las pruebas más específicamente.

> - Los jugadores comenzarán en el Menú Principal y tendrán varias opciones:
> - Si desean comenzar una partida deben acceder al botón de "Jugar".
> - Si desean ver el historial de partidas previas jugadas, deben acceder al botón de "Historial". Si el servidor no está conectado, no se mostrará ninguna partida previa.
> - Si los jugadores desean hacer una comprobación de los controles de las diferentes pruebas, podrán acceder al tutorial donde encontrarán todas las pruebas para probarlas las veces que deseen mediante el botón de "Cómo Jugar".
> - Si desea ajustar el volumen, los jugadores podrán acceder a ello mediante el botón de "Sonido".


> - Si se accionó el botón de "Jugar", los jugadores accederán a una lobby general. Si el servidor no está conectado, estarán disponibles las opciones "Salir", para volver al menú principal, y "Jugar sin online", para jugar en local. Si el servidor, en cambio, está conectado y disponibles, los jugadores podrán ver un selector de partidas a las que se podrán unir. Una vez seleccionada una de las partidas disponibles, éstos deberán introducir un nombre de usuario para poder chatear con otro jugador que esté conectado y se haya unido a la misma partida (o sala de chat previa a la partida). Cuando los jugadores consideren, podrán accionar el botón de "Jugar", para entrar en partida.

> - Al final de la partida, el sistema lleva a cabo un recuento del tiempo total de acabado de cada jugador en cada una de las pruebas y determinará un ganador.



![Diagrama](https://github.com/Elniadas/JuegosEnRed_GrupoE/blob/main/Images/DiagramaNavegacion.png)

![Diagrama](https://github.com/Elniadas/JuegosEnRed_GrupoE/blob/main/Images/Diagrama2.jpeg)

> ### 2.3 Cámara

> - Las acciones principales se desarrollan con eventos generalmente en primer plano, es decir, la cámara se sitúa directamente enfocando a la prueba que se tenga que realizar.

![Image from gyazo](https://github.com/Elniadas/JuegosEnRed_GrupoE/blob/main/Images/PrimerPlano.gif)


> - En cuanto al movimiento del jugador y el mundo del juego, este se desarrolla horizontalmente o con un desplazamiento horizontal (propio de juegos como Mario Bros o Sonic entre otros), también denominado Scroll lateral.

![Image from Gyazo](https://github.com/Elniadas/JuegosEnRed_GrupoE/blob/main/Images/Scroll.gif)



> ### 2.4 Sonido

> - El Menú principal y el resto del juego tendrá una misma banda sonora y el gameplay da comienzo con el sonido de unas campanas de boxeo. Los distintos escenarios de las distintas pruebas traen consigo sonidos ambientales para una mayor inmersión (pasos en una cinta de correr, cuenta atrás de un reloj, sonidos de chispazos en un escenario de electricidad, efectos de teletransporte al sobrepasar un portal...).

> ### 2.5 Controles

> - Las teclas principales de movimiento del jugador son: “D” (Movimiento hacia derecha), “A” (Movimiento hacia izquierda), “W” (Salto), “E” (Interactuar con una prueba para realizarla). Para un segundo jugador, las teclas de movimiento serán: “Flecha derecha” (Movimiento hacia derecha), “Flecha izquierda” (Movimiento hacia izquierda), “Flecha arriba” (Salto), “Espacio” (Interactuar con una prueba para realizarla)

> - Dentro de las pruebas con las que se interactúe, los controles serán los mismos que los anteriores, exceptuando el botón de acción; los de movimiento servirán para que los jugadores se desplacen por las pruebas, y los de acción varían dependiendo de la prueba.

> ### 2.6 Puntuación

> - Como se ha mencionado anteriormente, al final de cada partida se guarda el tiempo total que ambos jugadores han tardado en completar el recorrido de pruebas y el sistema decide quién es el ganador.

> - El tiempo empezará a correr al inicio de cada escenario, y se detendrá una vez los jugadores hayan llegado al final del último escenario.

> ## 3. Interfaces

> - Pantalla principal: con los botones "Jugar", "Cómo Jugar", "Historial" y "Sonido" como se ha mencionado en el apartado del Flujo del Juego.

![Diagrama](https://github.com/Elniadas/JuegosEnRed_GrupoE/blob/main/Images/MenuPrincipal.png)

> - Lobby principal: Selector de partidas que aparece sólo si el servidor está conectado

![Lobby](https://github.com/Elniadas/JuegosEnRed_GrupoE/blob/main/Images/SelectorPartidas.PNG)

> - Partida online: Partida concreta del selector de partidas. En ella, los jugadores pueden hablar a través del chat. Hay un chat independiente por Partida. Si los jugadores no introducen un nombre (loguearse), no pueden escribir por el chat.

![LobbyConcreta](https://github.com/Elniadas/JuegosEnRed_GrupoE/blob/main/Images/Lobby.PNG)

> - Partida offline: pantalla en la que se muestra a ambos jugadores y a la que se puede acceder accionando el botón "Jugando Offline", en la Lobby principal. Podrán ver su avatar y cambiar su nickname. 

![Diagrama](https://github.com/Elniadas/JuegosEnRed_GrupoE/blob/main/Images/LobbyOffline.png)

> - Pantalla de juego: la parte superior es el mapa del jugador 1 y la de debajo la del 2. Ambas tienen el tiempo que llevan consumido.

![Interfaz](https://github.com/Elniadas/JuegosEnRed_GrupoE/blob/main/Images/Interfaz.png)

> - Pantalla de pausa: Con los botones de "Reanudar" para continuar la partida, "Sonido" para ajustar el volumen y "Salir" para volver al menú

![Pausa](https://github.com/Elniadas/JuegosEnRed_GrupoE/blob/main/Images/Pausa.PNG)

> - Cómo jugar: donde aparecen una pantalla con las instrucciones con los controles y objetivo del juego.

![Image from gyazo](https://github.com/Elniadas/JuegosEnRed_GrupoE/blob/main/Images/tutorialControles.gif)

![Image from gyazo](https://github.com/Elniadas/JuegosEnRed_GrupoE/blob/main/Images/tutorial2.gif)

> - Historial de partidas: en él se almacenan las partidas previas terminadas por los jugadores.

![Historial](https://github.com/Elniadas/JuegosEnRed_GrupoE/blob/main/Images/Historial.PNG)

> - Pantalla de ajuste de sonido: para ajustar el volumen

![Sonidos](https://github.com/Elniadas/JuegosEnRed_GrupoE/blob/main/Images/Sonido.PNG)

> - Pantalla de victoria

![Victoria](https://github.com/Elniadas/JuegosEnRed_GrupoE/blob/main/Images/Victoria.gif)



> ## 4. Pruebas

> - GüinDeReis está formado por 5 escenarios, de los cuales 4 tienen pruebas, que deberán completarse lo más rápido posible con ayuda de power ups que se obtienen a lo largo del mapa, o bien realizando las pruebas secundarias como ha mencionado anteriormente. 

> ### 4.1. Prueba de correr

> - El jugador se acercará a la cinta eléctrica que está colocada al final del nivel encima de una plataforma.

> - El objetivo inicial de la prueba es presionar 20 veces 2 teclas alternativamente reflejando que se está corriendo en una cinta eléctrica. 

> - El jugador tiene 2 opciones (se indica según el color de las partículas de cada prueba):

> - Realizar la prueba principal (partículas verdes): es más rápida de realizar, ya que se debe llevar a cabo un número menor de pulsaciones de teclas (20). 

> - Realizar la prueba secundaria (partículas rojas): Se deberá realizar la misma prueba, pero con un mayor número de pulsaciones. Si se supera satisfactoriamente, se le aplicará al jugador contrario el power up "Laser storm"; el jugador que toque los rayos tendrá su velocidad de movimiento reducida durante un tiempo determinado


![Image from gyazo](https://github.com/Elniadas/JuegosEnRed_GrupoE/blob/main/Images/Cinta.gif)

> ### 4.2. Prueba de electricidad 

> - El objetivo de esta prueba será llevar la corriente de un punto a otro del recorrido girando las partes de los cables mal colocados. Los jugadores podrán desplazarse a lo largo del circuito con las teclas de movimiento (A,D y las flechas de izquierda y derecha) e interactuar con los cables mal orientados con las teclas W,S y las flechas de arriba y abajo (giro en ambos sentidos).

> - Una vez terminado el primer circuito se le ofrece al jugador la opción de realizar un segundo circuito (la prueba secundaria, con partícular rojas).

> - Si decide realizarla, se le presentará al usuario un circuito generalmente más complejo y con un objetivo extra; A lo largo del nuevo circuito se colocarán unas bombillas, y los jugadores tienen que llevar la corriente al otro extremo del circuito y además dejar las bombillas encendidas.

> - Una vez superada la prueba opcional, el jugador obtendrá el power up Blindsighted, que cegará parcialmente la visión del jugador rival por unos instantes.


![Image from gyazo](https://github.com/Elniadas/JuegosEnRed_GrupoE/blob/main/Images/Electricidad.gif)

> ### 4.3. Prueba del contador

> - El jugador se acercará al pulsador del final del escenario tras haber realizado el recorrido de plataformas. 

> - Aparecerá una pantalla con un contador que empezará en 00:00 y empezará a sumar tiempo un cronómetro; al llegar al segundo 04:00 la pantalla se cierra. 

> - El objetivo es que el jugador lleve la cuenta del cronómetro en su cabeza y que intente acercarse al número 7.00 pulsando las teclas S y "flecha de abajo". Las respuestas válidas para superar la prueba son las que se encuentran entre el 6.5 y el 7.5. 

> - Si el jugador consigue parar el contador entre los segundos 6.98 y 7.02 obtendrá el power up Time++ a modo de recompensa, que sumará tiempo al contador del jugador contrario. 


![Image from gyazo](https://github.com/Elniadas/JuegosEnRed_GrupoE/blob/main/Images/Contador.gif)

> ### 4.4. Prueba de los símbolos

> - Los jugadores comienzan el nivel en un laboratorio; en él, hay una pizarra con símbolos cambiados de orientación. Al final del escenario, encontrarán un ordenador en el que aparecerán estos símbolos descolocados y en la orientación correcta. Los jugadores deberán colocar los símbolos en el orden correcto para completar la prueba (para este escenario, no hay prueba secundaria).

>- El desplazamiento dentro del ordenador se realiza con las teclas "A" y "D" (jugador 1), y "Flecha Izquierda" y "Flecha Derecha" (jugador 2). Para elegir cada símbolo se hará uso de las teclas "W" y "S" (jugador 1), y "Flecha Arriba" y "Flecha Abajo" (jugador 2).

> - Si los jugadores (1 y 2) olvidan el orden de los símbolos, podrán salir de la prueba respectivamente con las teclas "Q" y "M". 



![Image from gyazo](https://github.com/Elniadas/JuegosEnRed_GrupoE/blob/main/Images/Ordenador.gif)

> ### 4.5. Escenario de Nieve (final)

> - Éste será el último escenario donde los jugadores tendrán que llegar a una bandera final. 

> - Al coger esta bandera se fijará el tiempo de cada jugador individualmente para comprobar el ganador.


![Image from gyazo](https://github.com/Elniadas/JuegosEnRed_GrupoE/blob/main/Images/EscenarioNieve.gif)



> ## 5. Diagrama de clases del servidor 

> ### 5.1 Diagrama de clases API REST only

> El servidor tiene las siguientes clases que se listan a continuación:
> - Clase Player: guarda el nombre de los usuarios, su estado, y el lado del jugador (Player 1 o Player 2).

> - Clase Partida: Guarda los nombres de las distintas partidas de la lobby, el número de jugadores por partida.

> - Clase PartidaController: Controlador de partidas; el frontend realizará peticiones para crear las distintas partidas de la lobby y pedir las distintas partidas creadas al servidor, para posteriormente mostrarlas en pantalla. Adicionalmente, y como cada partida tiene su propio chat, el controlador de las partidas permite leer y escribir los distintos mensajes del chat de cada una de ellas. Cada partida tiene un chat independiente del resto de partidas (se genera un .txt por partida)

> - Clase TheNidesProjectApplication: Aplicación principal de Spring

> - Clase HistorialController: Clase que permite leer y escribir las distintas partidas acabadas en una sesión de juego. Las partidas se escriben y leen de un .txt.

> - Clase SimpleCORSFilter: Clase que permite hacer llamadas AJAX a recursos que residen fuera del origen. Permite ejecutar el servidor en el navegador.

![Diagrama clases backend](https://github.com/Elniadas/JuegosEnRed_GrupoE/blob/main/Images/DiagramaClasesBackend.png)


> ### 5.2 Diagrama de clases API REST & WebSockets

> El servidor se ha actualizado con nuevas clases empleadas para la comunicación asíncrona con WebSockets. Las clases del diagrama API REST se mantienen iguales, por lo que solo se describirán las empleadas para los Sockets:

> - Clase Handler: Maneja y gestiona todos los mensajes enviados por los clientes para mandarlos al resto de los clientes conectados en la partida. Adicionalmente, lleva la cuenta interna de los jugadores que se han conectado a una sesión de juego; para que los elementos como los cronómetros o la aparición de los objetos en escena empiecen de manera sincronizada, cuando hay dos jugadores en una partida, el servidor manda un mensaje a ambos para que comiencen a correr los tiempos, se pinten las plataformas, se habiliten los controles...

> Gestiona mensajes de posición e input de los jugadores, eventos que ocurren en el juego (interacciones con objetos), velocidad y posición de las plataformas...

![Diagrama clases backend Sockets](https://github.com/Adrian-Valiente/JuegosEnRed_GrupoE_2/blob/Elnidas/Images/Diagrama%20en%20blanco.png)

> ## 6. Documentación del protocolo empleado sobre WebSockets

> Como se ha mencionado en el apartado anterior, hay una única clase que se encarga de gestionar todos los mensajes recibidos por los clientes y de comunicarle al resto de clientes una respuesta. Dado que Guindereis es un juego de pantalla partida en el que ambos jugadores pueden ver lo que lleva a cabo el contrario, todo aquel movimiento, acción o animación que se lleve a cabo en uno de los jugadores, se debe transmitir y simular en la ventana del jugador contrario.

> Es por ello que, cada vez que uno de los jugadores presiona una tecla, cambia de posición, interactúa con un objeto... dicha acción se transmite mediante un mensaje al servidor para que este envíe de vuelta el mensaje al resto de clientes (exceptuando aquel que mandó originalmente el mensaje). 

> Los mensajes en formato JSON tienen un campo concreto "tipo", que distingue unos mensajes de otros. Se enumera a continuación aquellas partes del juego donde se hace uso del protocolo de comunicación:

> - Inputs del jugador: toda tecla funcional en el juego que presione un cliente, se mandará al servidor en forma de booleano (Si se presiona "w" y "a", estas tendrán un valor true que se transmitirá al servidor en formato JSON). El servidor posteriormente manda el mismo mensaje con los valores booleanos al resto de clientes (excluyendo al remitente) y estos simularán la misma acción desencadenada por la/s tecla/s pulsada/s. El campo "tipo" del mensaje JSON que lo distingue del resto de mensajes tiene el valor de "BOTONES".

> - Posiciones de los jugadores: Adicionalmente y para una mayor consistencia, además de pasarse los inputs de los jugadores, se mandan las posiciones "x" e "y" de los jugadores en el escenario. El campo "tipo" del mensaje JSON que lo distingue del resto de mensajes tiene el valor de "POSICION".

> - Pruebas del juego: Estos mensajes van orientados a los "minijuegos" o pruebas necesarias de completar para pasar a niveles posteriores. La estructura del mensaje es muy similar a la de los "Inputs del jugador", dado que las pruebas se basan fundamentalmente en presionar teclas. Nuevamente, las teclas se pasan al servidor con unos valores booleanos, este transmite el mensaje al resto de clientes y se simularán las mismas acciones llevadas a cabo en la correspondiente prueba por el remitente del mensaje. El campo "tipo" del mensaje JSON que lo distingue del resto de mensajes tiene el valor de "PRUEBA".

> - Eventos del juego: Mensajes orientados a la aparición y uso de los portales al terminar una prueba. El cliente envía un mensaje con el portal correspondiente a la prueba terminada que debería aparecer. Posteriormente el servidor envía de vuelta el mensaje al resto de los clientes para que se simule en sus ventanas el mismo evento ocurrido. El campo "tipo" del mensaje JSON que lo distingue del resto de mensajes tiene el valor de "EVENTOS".

> - Conexión de jugadores: Cuando un jugador figure como conectado y listo dentro del juego (accionando el botón de jugar), se le enviará un mensaje al servidor. Internamente , este aumentará un contador de jugadores conectados. Si el número de jugadores conectados es igual a 2, el servidor mandará un mensaje a los clientes de tipo "CREAR", que se explicará a continuación. El campo "tipo" del mensaje JSON (de las conexiones) que lo distingue del resto de mensajes tiene el valor de "CONECTADO".

> - Comienzo sincronizado: Como se ha mencionado anteriormente, cuando el contador de jugadores conectados al servidor es igual a 2, este envía un mensaje a TODOS los clientes (aquí no se excluye al remitente porque es el propio servidor el que envía el mensaje), para que se creen las distintas plataformas, se inicien los cronómetros y se activen los controles de los jugadores. El campo "tipo" del mensaje JSON que envía el servidor y que lo distingue del resto de mensajes tiene el valor de "CREAR".

> - Sincronización de las plataformas: Una vez iniciado el juego y creadas las distintas plataformas, cada cliente comenzará a simular el movimiento de las mismas con funciones de phaser como tweens.timeline. Estas funciones afectan directamente a la velocidad de las distintas plataformas durante un periodo de tiempo antes de volver a cambiarla. Por lo tanto, en el update cada cliente mandará en distintos intervalos de tiempo las velocidades de las plataformas móviles únicamente (dado que la información de las estáticas se mantiene igual en todo momento). El campo "tipo" del mensaje JSON que envía el servidor y que lo distingue del resto de mensajes tiene el valor de "PLATFORM".

> IMPORTANTE: Para que no haya una saturación con el envío de mensajes NO se envían las velocidades de todas las plataformas en todo momento, solo se envían las velocidades de las plataformas del escenario en el que se encuentran los jugadores en un momento determinado.


> ## 6. Instrucciones para ejecutar la aplicación

> El juego se ejecuta en el localhost, por lo tanto no hace falta abrir el Visual Studio para ejecutar la aplicación. Por lo tanto, los pasos para abrir el servidor y acceder al juego son los siguientes:

> - 1º: Abrir la consola de comandos (cmd en el buscador de windows) y situarse en el directorio donde se encuentre el archivo .jar descargado (Si el archivo está en Descargas: "cd Downloads").

> - 2º: Una vez situados en el directorio correspondiente, buscar el archivo .jar: "java -jar *NombreDelArchivo.jar*" y presionar enter.

> - 3º: El servidor ya estará abierto, para acceder al juego, basta con poner en la barra de búsqueda del navegador (preferiblemente Firefox) "localhost:8080".

> Una vez realizados estos pasos, ya se podrá empezar a jugar al juego

> La alternativa a localhost es:

> - Abrir el servidor desde la consola de comandos tal cual se especifica en la alternativa anterior

> - Abrir la carpeta "TheNidesProject" -> "src" -> "main" -> "java" -> "resources" -> "static" en Visual Studio, y lanzar abrir la aplicación con la extensión "Live Share" del Visual Studio.

> Con el servidor abierto desde la consola de comandos y la aplicación abierta desde el visual, también se puede empezar a jugar




> ## Referencias

Estructura de un GDD:
<p>https://github.com/dsaltares/sion-tower/blob/master/doc/gdd/gdd.pdf</p>
<p>https://www.youtube.com/watch?v=z97ys0TDwDI</p>

Cambiar fuente de texto phaser:
<p>https://youtu.be/eejnHjgiy3I<p>


