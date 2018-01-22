package com.example.easynotes.repository;

import com.example.easynotes.model.Note;
import com.example.easynotes.model.Users;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by rajeevkumarsingh on 27/06/17.
 */
public interface NoteRepository extends JpaRepository<Note, Long> {

}




