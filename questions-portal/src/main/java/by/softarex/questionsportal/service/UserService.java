package by.softarex.questionsportal.service;

import by.softarex.questionsportal.entity.User;
import by.softarex.questionsportal.repository.UserRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    public User getUser(Long userId) {
        return userRepository.findById(userId).get();
    }

    public User validateUserPassword(String passwordAndUsername) {
        JSONObject passwordAndUsernameJson = new JSONObject(passwordAndUsername);
        String email = passwordAndUsernameJson.getString("email");
        String password = passwordAndUsernameJson.getString("password");
        User user = userRepository.getByEmail(email.toLowerCase());
        if (user != null) {
            if (passwordEncoder.matches(password, user.getPassword())) {
                return user;
            } else {
                return null;
            }
        } else {
            return null;
        }

    }


    public List<String> getAllUsersEmails() {
        return userRepository.getAllUserEmails();
    }


    public User registerUser(User newUser) {
        User existingUser = userRepository.getByEmail(newUser.getEmail().toLowerCase());
        if (existingUser == null) {
            newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
            emailService.sendSimpleMessage(newUser.getEmail(), "registration");
            return userRepository.save(generateUser(newUser));
        } else {
            return null;
        }
    }


    private User generateUser(User newUser) {
        User user = new User();
        user.setFirstName(newUser.getFirstName());
        user.setLastName(newUser.getLastName());
        user.setPhoneNumber(newUser.getPhoneNumber());
        user.setEmail(newUser.getEmail());
        user.setPassword(newUser.getPassword());

        return user;
    }


    public boolean deleteUser(Long userId, String password) {
        User deletedUser = userRepository.getById(userId);
        JSONObject passwordJson = new JSONObject(password);
        if (passwordEncoder.matches(passwordJson.getString("password"), deletedUser.getPassword())) {
            emailService.sendSimpleMessage(deletedUser.getEmail(), "deletion");
            userRepository.delete(deletedUser);
            return true;
        } else {
            return false;
        }
    }


    public User updateUser(String updatedUser, Long userId) {
        User existingUser = userRepository.getById(userId);
        JSONObject updatedUserJson = new JSONObject(updatedUser);
        if (passwordEncoder.matches(updatedUserJson.getString("currentPassword"), existingUser.getPassword())) {
            existingUser.setFirstName(updatedUserJson.getString("firstName"));
            existingUser.setLastName(updatedUserJson.getString("lastName"));
            existingUser.setPhoneNumber(updatedUserJson.getString("phoneNumber"));

            if (!updatedUserJson.getString("newPassword").equals("")) {
                existingUser.setPassword(passwordEncoder.encode(updatedUserJson.getString("newPassword")));
            }
            return userRepository.save(existingUser);
        } else {
            return null;
        }
    }
}
