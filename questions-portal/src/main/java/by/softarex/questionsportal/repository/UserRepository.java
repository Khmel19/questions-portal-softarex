package by.softarex.questionsportal.repository;

import by.softarex.questionsportal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User getByEmail(String email);

    @Query("SELECT u.email FROM User u")
    List<String> getAllUserEmails();
}
