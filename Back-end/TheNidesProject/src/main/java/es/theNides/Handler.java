package es.theNides;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import javax.annotation.PostConstruct;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import com.fasterxml.jackson.databind.ObjectMapper;

public class Handler extends TextWebSocketHandler {
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	int contador = 0;

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());

		sessions.put(session.getId(), session);
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		sessions.remove(session.getId());

		contador--;
		if (contador < 0) {
			contador = 0;
		}
		System.out.println("Contador : " + contador);
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

		// System.out.println("Message received: " + message.getPayload());
		JsonNode node = mapper.readTree(message.getPayload());
		sendOtherParticipants(session, node);
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
			// System.out.println("Message sent: " + node.toString());
			newNode.put("w", node.get("w").asBoolean());
			newNode.put("a", node.get("a").asBoolean());
			newNode.put("d", node.get("d").asBoolean());
			newNode.put("s", node.get("s").asBoolean());
			newNode.put("e", node.get("e").asBoolean());
			if (node.has("dato"))
				newNode.put("dato", node.get("dato").asInt());
			for (WebSocketSession participant : sessions.values()) {
				if (!participant.getId().equals(session.getId())) {
					participant.sendMessage(new TextMessage(newNode.toString()));
				}
			}
			break;
		case "EVENTOS":
			System.out.println("Message sent: " + node.toString());
			newNode.put("portal", node.get("portal").asText());
			newNode.put("powerUp", node.get("powerUp").asText());
			newNode.put("teletransporte", node.get("teletransporte").asText());

			for (WebSocketSession participant : sessions.values()) {
				if (!participant.getId().equals(session.getId())) {
					participant.sendMessage(new TextMessage(newNode.toString()));
				}
			}

			break;
		case "CONECTADO":
			contador++;
			System.out.println("Contador : " + contador);
			if (contador == 2) {
				
				ObjectNode conecta = mapper.createObjectNode();
				conecta.put("tipo", "CREAR");
				
				for (WebSocketSession participant : sessions.values()) {

					participant.sendMessage(new TextMessage(conecta.toString()));

				}
			}

			break;
			
		case "PLATFORM":
		
			for (WebSocketSession participant : sessions.values()) {
				if (!participant.getId().equals(session.getId())) {
					participant.sendMessage(new TextMessage(node.toString()));
				}
			}
			
		
		}

	}

}