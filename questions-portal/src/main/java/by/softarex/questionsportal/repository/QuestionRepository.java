package by.softarex.questionsportal.repository;

import by.softarex.questionsportal.entity.Question;
import by.softarex.questionsportal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> getAllByUser(User user);

}
