package by.softarex.questionsportal.repository;

import by.softarex.questionsportal.entity.Question;
import by.softarex.questionsportal.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends PagingAndSortingRepository<Question, Long> {

    Page<Question> getAllByUser(User user, Pageable pageable);

    List<Question> getAllByUser(User user);

    List<Question> getAllByForUserEmail(String forUserEmail);

    Page<Question> getAllByForUserEmail(String forUserEmail, Pageable pageable);
}
