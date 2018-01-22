package com.example.easynotes.dto;

import java.util.Date;

import org.springframework.http.HttpStatus;

public class UsersResponseDTO {

	private HttpStatus status;
	private String message;
	private int statuscode;

	public HttpStatus getStatus() {
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public int getStatuscode() {
		return statuscode;
	}

	public void setStatuscode(int statuscode) {
		this.statuscode = statuscode;
	}

	public UsersResponseDTO() {
		super();
	}

	public UsersResponseDTO(HttpStatus status, String message, int statuscode) {
		super();
		this.status = status;
		this.message = message;
		this.statuscode = statuscode;
	}
}
