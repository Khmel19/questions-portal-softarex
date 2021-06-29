package by.softarex.questionsportal.controller;

import by.softarex.questionsportal.dto.Credentials;
import by.softarex.questionsportal.dto.UserDTO;
import by.softarex.questionsportal.entity.User;
import by.softarex.questionsportal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/api/login")
    public ResponseEntity<User> login(@RequestBody Credentials credentials, HttpServletRequest request) {

        User user = userService.validateUserPassword(credentials);
        if (user != null) {
            request.getSession().setAttribute("authenticated", true);
            return ResponseEntity.ok(user);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/api/logout")
    public void logout(HttpServletRequest request) {
        try {
            request.logout();
        } catch (ServletException e) {
            e.printStackTrace();
        }
    }


    @GetMapping("/api/users/{userId}")
    public ResponseEntity<User> getUser(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUser(userId));
    }


    @GetMapping("/api/emails")
    public ResponseEntity<List<String>> getEmails() {
        return ResponseEntity.ok(userService.getAllUsersEmails());
    }


    @PostMapping("/api/registration")
    public ResponseEntity<User> registration(@RequestBody User newUser, HttpServletRequest request) {
        User user = userService.registerUser(newUser);
        if (user != null) {
            request.getSession().setAttribute("authenticated", true);
            return ResponseEntity.ok(user);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/api/{userId}/delete")
    public ResponseEntity<User> deleteUser(@PathVariable Long userId, @RequestBody Credentials password, HttpServletRequest request) {
        if (userService.deleteUser(userId, password)) {
            try {
                request.logout();
            } catch (ServletException e) {
                e.printStackTrace();
            }
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @PutMapping("/api/{userId}/edit")
    public ResponseEntity<User> updateUser(@RequestBody UserDTO updatedUser, @PathVariable Long userId) {
        User user = userService.updateUser(updatedUser, userId);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
