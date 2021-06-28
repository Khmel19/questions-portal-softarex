package by.softarex.questionsportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "possible_answer")
public class PossibleAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "possible_answer")
    private String possibleAnswer;


    public PossibleAnswer(String possibleAnswer) {
        this.possibleAnswer = possibleAnswer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PossibleAnswer that = (PossibleAnswer) o;

        if (!Objects.equals(id, that.id)) return false;
        return Objects.equals(possibleAnswer, that.possibleAnswer);
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (possibleAnswer != null ? possibleAnswer.hashCode() : 0);
        return result;
    }
}
