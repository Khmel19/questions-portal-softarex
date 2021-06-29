package by.softarex.questionsportal.dto;

import by.softarex.questionsportal.entity.Question;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class ProcessedAnswer implements Serializable {
    private Long id;
    private UUID uuid;
    private String fromUserEmail;
    private String questionContent;
    private String answer;
    private String answerType;
    private List<String> possibleAnswersList;

    public ProcessedAnswer(Question question) {
        this.id = question.getId();
        this.uuid = question.getUuid();
        this.fromUserEmail = question.getUser().getEmail();
        this.answerType = question.getAnswerType();
        this.questionContent = question.getContent();
        this.answer = question.getAnswer();
        this.possibleAnswersList = new ArrayList<>();

        question.getPossibleAnswers().forEach(possibleAnswer -> this.possibleAnswersList.add(possibleAnswer.getPossibleAnswer()));

    }
}
