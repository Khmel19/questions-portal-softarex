package by.softarex.questionsportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private UUID uuid = UUID.randomUUID();

    private String content;

    @Column(name = "answer_type")
    private String answerType;

    private String answer;

    @Column(name = "for_user_email")
    private String forUserEmail;

    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OnDelete(action = OnDeleteAction.CASCADE)
    @OneToMany(cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    @JoinColumn(name = "question_id")
    private List<PossibleAnswer> possibleAnswers = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Question question = (Question) o;

        if (!Objects.equals(id, question.id)) return false;
        if (!Objects.equals(uuid, question.uuid)) return false;
        if (!Objects.equals(content, question.content)) return false;
        if (!Objects.equals(answerType, question.answerType)) return false;
        if (!Objects.equals(answer, question.answer)) return false;
        if (!Objects.equals(forUserEmail, question.forUserEmail))
            return false;
        if (!Objects.equals(user, question.user)) return false;
        return Objects.equals(possibleAnswers, question.possibleAnswers);
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (uuid != null ? uuid.hashCode() : 0);
        result = 31 * result + (content != null ? content.hashCode() : 0);
        result = 31 * result + (answerType != null ? answerType.hashCode() : 0);
        result = 31 * result + (answer != null ? answer.hashCode() : 0);
        result = 31 * result + (forUserEmail != null ? forUserEmail.hashCode() : 0);
        result = 31 * result + (user != null ? user.hashCode() : 0);
        result = 31 * result + (possibleAnswers != null ? possibleAnswers.hashCode() : 0);
        return result;
    }
}
