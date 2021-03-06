package by.softarex.questionsportal.service;

import by.softarex.questionsportal.entity.User;
import by.softarex.questionsportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUser(Long userId) {
        return userRepository.getById(userId);
    }
}
