package by.softarex.questionsportal.service;

import by.softarex.questionsportal.dto.Credentials;
import by.softarex.questionsportal.dto.UserDTO;
import by.softarex.questionsportal.entity.User;
import by.softarex.questionsportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Autowired
    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       EmailService emailService) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    public User getUser(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        return userOptional.orElse(null);
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

    public User validateUserPassword(Credentials credentials) {
        String email = credentials.getEmail();
        String password = credentials.getPassword();
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

    public boolean deleteUser(Long userId, Credentials password) {
        User deletedUser = userRepository.getById(userId);
        if (passwordEncoder.matches(password.getPassword(), deletedUser.getPassword())) {
            emailService.sendSimpleMessage(deletedUser.getEmail(), "deletion");
            userRepository.delete(deletedUser);
            return true;
        } else {
            return false;
        }
    }


    public User updateUser(UserDTO updatedUser, Long userId) {
        User existingUser = userRepository.getById(userId);

        if (passwordEncoder.matches(updatedUser.getCurrentPassword(), existingUser.getPassword())) {
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setPhoneNumber(updatedUser.getPhoneNumber());

            if (!updatedUser.getNewPassword().equals("")) {
                existingUser.setPassword(passwordEncoder.encode(updatedUser.getNewPassword()));
            }
            return userRepository.save(existingUser);
        } else {
            return null;
        }
    }
}
