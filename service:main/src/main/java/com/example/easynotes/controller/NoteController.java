package com.example.easynotes.controller;

import com.example.easynotes.dto.UserSignup;
import com.example.easynotes.dto.UsersResponseDTO;
import com.example.easynotes.model.Note;
import com.example.easynotes.model.Users;
import com.example.easynotes.repository.NoteRepository;
import com.example.easynotes.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * Created by rajeevkumarsingh on 27/06/17.
 */
@RestController
@RequestMapping("/palagani")
public class NoteController {

    @Autowired
    NoteRepository noteRepository;
    
    @Autowired
    UserRepository userRepository;
    
    

    @GetMapping("/notes")
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    @GetMapping("/notes/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable(value = "id") Long noteId) {
        Note note = noteRepository.findOne(noteId);
        if(note == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(note);
    }

    @PostMapping("/notes")
    public Note createNote(@Valid @RequestBody Note note) {
        return noteRepository.save(note);
    }

    @PutMapping("/notes/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable(value = "id") Long noteId,
                                           @Valid @RequestBody Note noteDetails) {
        Note note = noteRepository.findOne(noteId);
        if(note == null) {
            return ResponseEntity.notFound().build();
        }
        note.setTitle(noteDetails.getTitle());
        note.setContent(noteDetails.getContent());

        Note updatedNote = noteRepository.save(note);
        return ResponseEntity.ok(updatedNote);
    }

    @DeleteMapping("/notes/{id}")
    public ResponseEntity<Note> deleteNote(@PathVariable(value = "id") Long noteId) {
        Note note = noteRepository.findOne(noteId);
        if(note == null) {
            return ResponseEntity.notFound().build();
        }

        noteRepository.delete(note);
        return ResponseEntity.ok().build();
    }
    
    
    @GetMapping("/signin/{id}")
    public ResponseEntity<Users> getUseraccess(@PathVariable(value = "id") Long userId) {
         Users  user= userRepository.findOne(userId);
        if(user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(user);
    }
    
    @PostMapping("/signin")
    @CrossOrigin
    public ResponseEntity<UsersResponseDTO> signIn( @RequestBody Users requestUser) {
    	UsersResponseDTO usersResponseDTO = new UsersResponseDTO();
         Users  user= userRepository.findByUserName(requestUser.getUserName());
         try{
         if(user.getPassword().equals(requestUser.getPassword()) && user != null)
         {
        	 usersResponseDTO.setMessage("login successful");
        	 usersResponseDTO.setStatus(HttpStatus.OK);
			 usersResponseDTO.setStatuscode(200);
        	 
        	 
         }
         else
         {
        	 usersResponseDTO.setMessage("login failed");
        	 usersResponseDTO.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
			 usersResponseDTO.setStatuscode(500);
         }
         
         }
         catch(Exception e)
         {
        	 usersResponseDTO.setMessage("login failed");
        	 usersResponseDTO.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
			 usersResponseDTO.setStatuscode(500);
         }
         return  ResponseEntity.status(usersResponseDTO.getStatuscode()).body(usersResponseDTO);
    }
    
    
    
    @PostMapping("/signup")
    @CrossOrigin
    public ResponseEntity<UsersResponseDTO> createUser( @RequestBody UserSignup signupUser) {
    	UsersResponseDTO usersResponseDTO = new UsersResponseDTO();
    	
    	if(signupUser.getPassword().equals(signupUser.getRepeatPassword()))
    	{
    	 Users  userDeatils = userRepository.findByUserName(signupUser.getUsername());
    	 if(userDeatils == null)
    	 {
    		 Users user = new Users();
    		 user.setAcesstype(signupUser.getAcesstype());
    		 user.setPassword(signupUser.getPassword());
    		 user.setUserName(signupUser.getUsername());
    		 userDeatils = userRepository.save(user);
    		 if(userDeatils != null)
    		 {
    			 usersResponseDTO.setMessage("account created sucessfully");
    			 usersResponseDTO.setStatus(HttpStatus.OK);
    			 usersResponseDTO.setStatuscode(200);
    		 }
    		 else
    		 {
    			 usersResponseDTO.setMessage("problem in creating account");
    			 usersResponseDTO.setStatus(HttpStatus.BAD_REQUEST);
    			 usersResponseDTO.setStatuscode(400);
    		 }
    		 	 
         
    	 }
    	 else
    	 {
    		 usersResponseDTO.setMessage("account is already created with this user name");
    		 usersResponseDTO.setStatus(HttpStatus.BAD_REQUEST);
			 usersResponseDTO.setStatuscode(400);
    	 }
    	}
    	else
    	{
    		 usersResponseDTO.setMessage("password miss match");
    		 usersResponseDTO.setStatus(HttpStatus.BAD_REQUEST);
			 usersResponseDTO.setStatuscode(400);
    		
    	}
    	return  ResponseEntity.status(usersResponseDTO.getStatuscode()).body(usersResponseDTO);
    }
    
    @GetMapping("/checkAccess/{username}")
//    @CrossOrigin(origins = "http://localhost:4200/")
    @CrossOrigin
    public ResponseEntity<UsersResponseDTO> getCheckAccess(@PathVariable(value = "username") String username) {
    	UsersResponseDTO usersResponseDTO = new UsersResponseDTO();
    	String message = null;
    	
    	 Users  user = userRepository.findByUserName(username);
    	 if(user != null && user.getAcesstype().equalsIgnoreCase("Y"))
    	 {
    		 message = "user have access";
    		 usersResponseDTO.setMessage(message);
    		 
    	 }
    	 else
    	 {
    		 message = "user doesnot have access";
    		 usersResponseDTO.setMessage(message);
    		 
    	 }
    	 
    	return ResponseEntity.status(HttpStatus.OK).body(usersResponseDTO);
    }
    
    
}
