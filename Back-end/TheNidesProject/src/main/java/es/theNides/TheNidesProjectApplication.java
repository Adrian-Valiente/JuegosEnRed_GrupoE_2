package es.theNides;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class TheNidesProjectApplication implements WebSocketConfigurer {

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(playerPulse(), "/Lobby_1").setAllowedOrigins("*");
		registry.addHandler(playerPulse(), "/Lobby_2").setAllowedOrigins("*");
		registry.addHandler(playerPulse(), "/Lobby_3").setAllowedOrigins("*");
		registry.addHandler(playerPulse(), "/Lobby_4").setAllowedOrigins("*");
		registry.addHandler(playerPulse(), "/Lobby_5").setAllowedOrigins("*");
		//registry.addHandler(Lobby1(), "/Lobby_1").setAllowedOrigins("*");
	}

	private WebSocketHandler playerPulse() {

		return new Handler();
	}
	private WebSocketHandler Lobby1() {

		return new Lobby1();
	}



	public static void main(String[] args) {
		SpringApplication.run(TheNidesProjectApplication.class, args);

	}

}
