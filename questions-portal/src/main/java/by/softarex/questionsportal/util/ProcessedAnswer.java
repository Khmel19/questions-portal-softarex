package by.softarex.questionsportal.util;

import by.softarex.questionsportal.entity.PossibleAnswer;
import by.softarex.questionsportal.entity.Question;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
// TODO: Processed? Maybe better name this like AnswerDTO (read about DTOs if you didn't hear), also I'm not sure that this class should be related to utils


// TODO: this class could be Immutable
public class ProcessedAnswer implements Serializable {
    private Long id;
    private UUID uuid;
    private String fromUserEmail;
    private String questionContent;
    private String answer;
    private List<String> possibleAnswersList;

    public ProcessedAnswer(Question question) {
        this.id = question.getId();
        this.uuid = question.getUuid();
        this.fromUserEmail = question.getUser().getEmail();
        this.questionContent = question.getContent();
        this.answer = question.getAnswer();
        this.possibleAnswersList = new ArrayList<>();

        for (PossibleAnswer possibleAnswer : question.getPossibleAnswers()) { // TODO: use Java 8 here too.
            this.possibleAnswersList.add(possibleAnswer.getPossibleAnswer());
        }
    }
}
