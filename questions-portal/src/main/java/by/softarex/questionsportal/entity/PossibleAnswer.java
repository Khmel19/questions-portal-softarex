package by.softarex.questionsportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

// TODO: please rewrite equals and hashCode methods.
// This is a error prone way when we autogenerate it
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
}
