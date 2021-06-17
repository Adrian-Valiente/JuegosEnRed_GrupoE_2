package es.theNides;

public class Player {
	
	long id;
	String user;
	String status;
	long side;
	String lobby;
	
	


	public Player() {
		super();
	}

	



	public Player(long id, String user, String status, long side, String lobby) {
		super();
		this.id = id;
		this.user = user;
		this.status = status;
		this.side = side;
		this.lobby = lobby;
	}





	public long getId() {
		return id;
	}





	public void setId(long id) {
		this.id = id;
	}





	public String getUser() {
		return user;
	}





	public void setUser(String user) {
		this.user = user;
	}





	public String getStatus() {
		return status;
	}





	public void setStatus(String status) {
		this.status = status;
	}





	public long getSide() {
		return side;
	}





	public void setSide(long side) {
		this.side = side;
	}





	public String getLobby() {
		return lobby;
	}





	public void setLobby(String lobby) {
		this.lobby = lobby;
	}





	public String toString() {return ("\"id:\""+id+",\"user\":"+"\""+user+"\""+",\"status\":"+"\""+status+",\"side:\""+side+"\"\n");}
	

}
