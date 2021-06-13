package by.softarex.questionsportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "possible_answer")
public class PossibleAnswer implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "possible_answer")
    private String possibleAnswer;


    public PossibleAnswer(String possibleAnswer) {
        this.possibleAnswer = possibleAnswer;
    }
}
