package by.softarex.questionsportal.service;

import by.softarex.questionsportal.dto.ProcessedQuestion;
import by.softarex.questionsportal.entity.PossibleAnswer;
import by.softarex.questionsportal.entity.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionConverterService {

    private final UserService userService;

    @Autowired
    public QuestionConverterService(UserService userService) {
        this.userService = userService;
    }


    public Question getQuestionFromProcessedQuestion(ProcessedQuestion processedQuestion, Long userId) {
        return fillQuestionFields(processedQuestion, userId);
    }


    public Question getQuestionFromProcessedQuestion(ProcessedQuestion processedQuestion, Long userId, Long questionId) {
        Question question = fillQuestionFields(processedQuestion, userId);
        question.setAnswer("");
        question.setId(questionId);
        return question;
    }


    private Question fillQuestionFields(ProcessedQuestion processedQuestion, Long userId) {
        Question question = new Question();

        question.setForUserEmail(processedQuestion.getForUserEmail());
        question.setAnswer(processedQuestion.getAnswer());
        question.setContent(processedQuestion.getQuestionContent());
        question.setAnswerType(processedQuestion.getAnswerType());
        question.setUser(userService.getUser(userId));

        processedQuestion.getPossibleAnswersList().forEach(possibleAnswer -> question.getPossibleAnswers().add(new PossibleAnswer(possibleAnswer)));
        return question;
    }
}
