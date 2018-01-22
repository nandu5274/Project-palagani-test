package com.example.easynotes.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.easynotes.model.Users;

public interface UserRepository extends JpaRepository<Users, Long> {

	@Query("SELECT t FROM Users t where t.userName = ?1")
	public Users findByUserName(String name);

}
