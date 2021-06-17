package es.theNides;

import java.awt.List;
import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import javax.annotation.PostConstruct;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/Lobby_1")
public class Lobby1 extends TextWebSocketHandler {
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	Map<Long, Player> players = new ConcurrentHashMap<>();
	boolean empezado = false;

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());

		sessions.put(session.getId(), session);
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		sessions.remove(session.getId());
		System.out.println("Donde cerrar: "+ players.toString());
		if (empezado) {
			for (WebSocketSession participant : sessions.values()) {
				participant.sendMessage(new TextMessage("CERRAR"));
			}
		}
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

		// System.out.println("Message received: " + message.getPayload());
		JsonNode node = mapper.readTree(message.getPayload());
		if (node.get("tipo").asText().equals("ADD_PLAYER")) {
			Player p = new Player(0, node.get("user").asText(), node.get("status").asText(), node.get("side").asLong(),
					"Lobby_1");
			System.out.println(p.toString());
			players.put(node.get("side").asLong(), p);
			System.out.println(players.toString());
			
		}else {
			sendOtherParticipants(session, node);
		}

	}

	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {

		// System.out.println("Message sent: " + node.toString());

		String tipo = node.get("tipo").asText();
		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("tipo", node.get("tipo").asText());
		switch (tipo) {
		case "POSICION":
			newNode.put("x", node.get("x").asDouble());
			newNode.put("y", node.get("y").asDouble());
			newNode.put("side", node.get("side").asInt());

			for (WebSocketSession participant : sessions.values()) {
				if (!participant.getId().equals(session.getId())) {
					participant.sendMessage(new TextMessage(newNode.toString()));
				}
			}
			break;
		case "BOTONES":
			newNode.put("w", node.get("w").asBoolean());
			newNode.put("a", node.get("a").asBoolean());
			newNode.put("d", node.get("d").asBoolean());
			newNode.put("e", node.get("e").asBoolean());
			newNode.put("side", node.get("side").asInt());
			newNode.put("touching", node.get("touching").asBoolean());

			for (WebSocketSession participant : sessions.values()) {
				if (!participant.getId().equals(session.getId())) {
					participant.sendMessage(new TextMessage(newNode.toString()));
				}
			}
			break;
		case "PRUEBA":
			System.out.println("Message sent: " + node.toString());
			newNode.put("w", node.get("w").asBoolean());
			newNode.put("a", node.get("a").asBoolean());
			newNode.put("d", node.get("d").asBoolean());
			newNode.put("s", node.get("s").asBoolean());
			newNode.put("e", node.get("e").asBoolean());
			for (WebSocketSession participant : sessions.values()) {
				if (!participant.getId().equals(session.getId())) {
					participant.sendMessage(new TextMessage(newNode.toString()));
				}
			}
			break;
		case "EVENTOS":

			newNode.put("portal", node.get("portal").asText());
			newNode.put("powerUp", node.get("powerUp").asText());
			newNode.put("teletransporte", node.get("teletransporte").asText());

			for (WebSocketSession participant : sessions.values()) {
				if (!participant.getId().equals(session.getId())) {
					participant.sendMessage(new TextMessage(newNode.toString()));
				}
			}

			break;
		}

	}
	
	private Collection<Player> getPlayersSocket(){
		return players.values();
	}
	
	
	
	@CrossOrigin
	@RequestMapping(value = "/players", method = RequestMethod.GET)
	public Collection<Player> getPlayers() throws Exception {
		Collection<Player> pp= getPlayersSocket();
		System.out.println("En el get "+players.toString());
		System.out.println("En el getv2 "+pp.toString());
		return pp;

	}

}
