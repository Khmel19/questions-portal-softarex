package by.softarex.questionsportal.service;

import by.softarex.questionsportal.entity.PossibleAnswer;
import by.softarex.questionsportal.entity.Question;
import by.softarex.questionsportal.util.ProcessedQuestion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProcessedQuestionService {

    private final UserService userService;

    @Autowired
    public ProcessedQuestionService(UserService userService) {
        this.userService = userService;
    }


    public List<ProcessedQuestion> getProcessedQuestions(List<Question> questionsList) {
        List<ProcessedQuestion> processedQuestionList = new ArrayList<>();

        for (Question question : questionsList) {
            processedQuestionList.add(new ProcessedQuestion(question));
        }
        return processedQuestionList;
    }


    public Question getQuestionFromProcessedQuestion(ProcessedQuestion processedQuestion, Long userId) {
        return fillQuestionFields(processedQuestion, userId);
    }


    public Question getQuestionFromProcessedQuestion(ProcessedQuestion processedQuestion, Long userId, Long questionId) {
        Question question = fillQuestionFields(processedQuestion, userId);
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

        for (String possibleAnswer : processedQuestion.getPossibleAnswersList()) {
            question.getPossibleAnswers().add(new PossibleAnswer(possibleAnswer));
        }
        return question;
    }
}