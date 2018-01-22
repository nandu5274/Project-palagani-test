package com.example.easynotes.dto;

public class UserSignup {

	
	private String username;
	
	private String password;
	
	private String repeatPassword;
	
	 private String acesstype;

	public UserSignup(String username, String password, String repeatPassword, String acesstype) {
		super();
		this.username = username;
		this.password = password;
		this.repeatPassword = repeatPassword;
		this.acesstype = acesstype;
	}

	public UserSignup() {
		super();
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRepeatPassword() {
		return repeatPassword;
	}

	public void setRepeatPassword(String repeatPassword) {
		this.repeatPassword = repeatPassword;
	}

	public String getAcesstype() {
		return acesstype;
	}

	public void setAcesstype(String acesstype) {
		this.acesstype = acesstype;
	}
	
	
}
