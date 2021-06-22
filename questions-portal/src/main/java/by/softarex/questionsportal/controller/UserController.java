package by.softarex.questionsportal.controller;

import by.softarex.questionsportal.entity.User;
import by.softarex.questionsportal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody String passwordAndUsername, HttpServletRequest request) {

        User user = userService.validateUserPassword(passwordAndUsername);
        if (user != null) {
            request.getSession().setAttribute("authenticated", true);
            return ResponseEntity.ok(user);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/logout")
    public ResponseEntity<User> logout(HttpServletRequest request) {
        request.getSession().setAttribute("authenticated", null);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PostMapping("/registration")
    public ResponseEntity<User> registration(@RequestBody User newUser, HttpServletRequest request) {
        User user = userService.registerUser(newUser);
        if (user != null){
            request.getSession().setAttribute("authenticated", true);
            return ResponseEntity.ok(user);
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @DeleteMapping("/{userId}/delete") // TODO: http method indicates the operation 'delete' is redundant
    public ResponseEntity<User> deleteUser(@PathVariable Long userId){
        userService.deleteUser(userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PutMapping("/{userId}/edit")
    public ResponseEntity<User> updateUser(@RequestBody String updatedUser, @PathVariable Long userId){
        User user = userService.updateUser(updatedUser, userId);
        if (user!=null){
            return ResponseEntity.ok(user);
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
