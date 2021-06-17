package es.theNides;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Collection;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import javax.annotation.PostConstruct;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/partida")

public class PartidaController {

	AtomicLong id = new AtomicLong();
	Map<Long, Partida> partidas = new ConcurrentHashMap<>();
	boolean creado = false;

	Timer myTimer = new Timer();

	TimerTask task = new TimerTask() {

		public void run() {
			System.out.println("Actualizando sistema");
			Partida[] juegos = partidas.values().toArray(new Partida[0]);
			for (int i = 0; i < juegos.length; i++) {

				Player p1 = juegos[i].getP1();
				Player p2 = juegos[i].getP2();
				int contador = 0;

				if (p1.getStatus() != null && !(p1.getStatus().equals("")) && !(p1.getStatus().equals("disconected"))) {
					if (p1.getStatus().equals("connected")) {
						p1.setStatus("missing");

					} else if (p1.getStatus().equals("missing") || (p1.getStatus().equals("win"))) {
						p1.setStatus("disconected");
					} else if (p1.getStatus().equals("ready")) {
						p1.setStatus("connected");
					}

				}
				if (p2.getStatus() != null && !(p2.getStatus().equals("")) && !(p2.getStatus().equals("disconected"))) {
					if (p2.getStatus().equals("connected")) {
						p2.setStatus("missing");

					} else if (p2.getStatus().equals("missing") || (p2.getStatus().equals("win"))) {
						p2.setStatus("disconected");
					} else if (p2.getStatus().equals("ready")) {
						p2.setStatus("connected");
					}
				}
				if(p1.getStatus()!=null) {
					if(p1.getStatus().equals("disconected")) {
						p1.setUser("");
						p1.setId(0);
						p1.setSide(0);
						p1.setLobby("");
					
					}
				}
				if(p2.getStatus()!=null) {
					if(p2.getStatus().equals("disconected")) {
						p2.setUser("");
						p2.setId(0);
						p2.setSide(0);
						p2.setLobby("");
					
					}
				}
			
				
				

				// fin
				juegos[i].setP1(p1);
				juegos[i].setP2(p2);
				partidas.put(juegos[i].getId(), juegos[i]);

			}
			System.out.println("Sistema actualizado");
		}
	};

	// Get de todos los elementos de la Lista//

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public Collection<Partida> getPartidas() {
		// System.out.println("Boton actualizar partidas");
		Collection<Partida> games = partidas.values();

		if (games != null) {
			Partida[] juegos = partidas.values().toArray(new Partida[0]);
			for (int i = 0; i < juegos.length; i++) {

				Player p1 = juegos[i].getP1();
				Player p2 = juegos[i].getP2();
				int contador = 0;

				if (p1.getStatus() != null && !(p1.getStatus().equals("")) && !(p1.getStatus().equals("disconected"))) {
					contador++;
				}
				if (p2.getStatus() != null && !(p2.getStatus().equals("")) && !(p2.getStatus().equals("disconected"))) {
					// System.out.println(p2.getStatus());
					contador++;
				}

				// System.out.println(contador);
				juegos[i].setNum(contador);
				partidas.put(juegos[i].getId(), juegos[i]);
			}
		}

		return partidas.values();
	}

	;
	// Get de un elemento en concreto//

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Partida getConcretePartida(@PathVariable long id) throws Exception {
		Partida p = partidas.get(id);
		if (p != null) {
			Player p1 = p.getP1();
			Player p2 = p.getP2();
			int contador = 0;

			if (p1.getStatus() != null && !(p1.getStatus().equals("")) && !(p1.getStatus().equals("disconected"))) {
				contador++;
			}

			if (p2.getStatus() != null && !(p2.getStatus().equals("")) && !(p2.getStatus().equals("disconected"))) {
				// System.out.println(p2.getStatus());
				contador++;
			}
			// System.out.println("Actualizando , numero de players : " + contador);
			p.setNum(contador);
			partidas.put(id, p);
		}
		return p;

	}

	@RequestMapping(value = "/", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Partida postPlayer(@RequestBody Partida partida) throws Exception {

		long currentId = id.incrementAndGet();
		partida.setId(currentId);
		partidas.put(currentId, partida);
		return partida;
	}

	// Modificar un objeto en concreto//

	@RequestMapping(value = "/player/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Partida> modifyPlayer(@PathVariable long id, @RequestBody Player pj) {

		Partida p = partidas.get(id);

		if (p != null) {

			Player p1 = p.getP1();
			Player p2 = p.getP2();
			int contador = 0;

			if (p1.getStatus() != null && !(p1.getStatus().equals("")) && !(p1.getStatus().equals("disconected"))) {
				contador++;
			}

			if (p2.getStatus() != null && !(p2.getStatus().equals("")) && !(p2.getStatus().equals("disconected"))) {
				// System.out.println(p2.getStatus());
				contador++;
			}

			// System.out.println("Actualizando , numero de players : " + contador);
			p.setNum(contador);

			if (pj.getSide() == 1) {
				p.setP1(pj);
				partidas.put(id, p);
				return new ResponseEntity<>(p, HttpStatus.OK);

			}
			if (pj.getSide() == 2) {
				p.setP2(pj);
				partidas.put(id, p);
				return new ResponseEntity<>(p, HttpStatus.OK);

			}
			return null;
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Partida> modifyPartida(@PathVariable long id, @RequestBody Partida partida) {
		Partida p = partidas.get(id);

		if (p != null) {
			partida.setId(id);
			partidas.put(id, partida);
			return new ResponseEntity<>(partida, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// Borrar un elemento en concreto//

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Partida> deletePlayer(@PathVariable long id) {
		Partida p = partidas.remove(id);
		if (p != null) {
			return new ResponseEntity<>(p, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@CrossOrigin
	@RequestMapping(value = "/fileWrite/{id}", method = RequestMethod.POST)
	public @ResponseBody String fileWrite(@PathVariable long id, @RequestBody String texto) throws Exception {
		Partida p = partidas.get(id);
		if (p != null) {
			String nombre = p.getNombre();
			try {

				String content;
				// String [] UaM= texto.split("|||");
				content = texto;
				// System.out.println(texto);
				FileWriter fw = new FileWriter(nombre + ".txt", true);
				BufferedWriter bw = new BufferedWriter(fw);
				bw.write(content);
				bw.write('\n');
				bw.close();

				return "done";

			} catch (IOException e) {
				System.out.println("Fallo??");
				System.out.println(e.toString());
				return e.getMessage();
			}
		} else {
			return "No esta ese lobby";
		}

	}

	@CrossOrigin
	@RequestMapping(value = "/fileRead/{id}", method = RequestMethod.GET)
	public @ResponseBody String[] fileRead(@PathVariable long id) throws Exception {

		Partida p = partidas.get(id);
		if (p != null) {
			String nombre = p.getNombre();
			File file = new File(nombre + ".txt");

			FileInputStream fis = null;

			try {
				fis = new FileInputStream(file);
				// System.out.println(file.getAbsolutePath());
				// System.out.println(file.getPath());
				// System.out.println("Total file size to read (in bytes) : " +
				// fis.available());
				String texto = new String();
				int content;
				while ((content = fis.read()) != -1) {
					// convert to char and display it
					texto += (char) content;
				}

				String chat[] = texto.split("\n");
				if (chat.length > 100) {

					int i = chat.length - 100;
					String[] chatC = new String[100];

					for (int j = i, aux = 0; j < chat.length; j++, aux++) {

						chatC[aux] = chat[j];
					}
					// System.out.println("Devolviendo los ultimos 100");
					return chatC;
				} else {
					return chat;
				}

			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				try {
					if (fis != null)
						fis.close();
				} catch (IOException ex) {
					ex.printStackTrace();
					return null;
				}

			}

		} else {
			return null;
		}

		return null;
	}

	public void crearPartidas() {
		if (!creado) {

			creado = true;
			Partida p1 = new Partida("Lobby_1");
			long currentId = id.incrementAndGet();
			p1.setId(currentId);
			partidas.put(currentId, p1);

			Partida p2 = new Partida("Lobby_2");
			currentId = id.incrementAndGet();
			p2.setId(currentId);
			partidas.put(currentId, p2);

			Partida p3 = new Partida("Lobby_3");
			currentId = id.incrementAndGet();
			p3.setId(currentId);
			partidas.put(currentId, p3);

			Partida p4 = new Partida("Lobby_4");
			currentId = id.incrementAndGet();
			p4.setId(currentId);
			partidas.put(currentId, p4);

			Partida p5 = new Partida("Lobby_5");
			currentId = id.incrementAndGet();
			p5.setId(currentId);
			partidas.put(currentId, p5);

			System.out.println("Partidas generadas");

		}
	}

	@PostConstruct
	public void start() {
		crearPartidas();
		myTimer.scheduleAtFixedRate(task, 10000, 10000);
	}

}
