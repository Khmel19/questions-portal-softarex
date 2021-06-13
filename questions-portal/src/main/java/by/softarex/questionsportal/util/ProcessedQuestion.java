package by.softarex.questionsportal.util;

import by.softarex.questionsportal.entity.PossibleAnswer;
import by.softarex.questionsportal.entity.Question;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class ProcessedQuestion implements Serializable {
    private String forUserEmail;
    private String questionContent;
    private String answerType;
    private String answer;
    private List<String> possibleAnswersList;

    public ProcessedQuestion(Question question) {
        this.forUserEmail = question.getForUserEmail();
        this.questionContent = question.getContent();
        this.answerType = question.getAnswerType();
        this.answer = question.getAnswer();
        this.possibleAnswersList = new ArrayList<>();
        for (PossibleAnswer possibleAnswer : question.getPossibleAnswers()){
            this.possibleAnswersList.add(possibleAnswer.getPossibleAnswer());
        }
    }
}
