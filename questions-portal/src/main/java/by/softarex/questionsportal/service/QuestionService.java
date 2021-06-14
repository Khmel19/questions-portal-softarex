package by.softarex.questionsportal.service;

import by.softarex.questionsportal.entity.PossibleAnswer;
import by.softarex.questionsportal.entity.Question;
import by.softarex.questionsportal.repository.QuestionRepository;
import by.softarex.questionsportal.util.ProcessedAnswer;
import by.softarex.questionsportal.util.ProcessedQuestion;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final UserService userService;
    private final ProcessedQuestionService processedQuestionService;
    private final PossibleAnswerService possibleAnswerService;
    private final ProcessedAnswerService processedAnswerService;

    @Autowired
    public QuestionService(QuestionRepository questionRepository,
                           ProcessedQuestionService processedQuestionService,
                           UserService userService,
                           PossibleAnswerService possibleAnswerService,
                           ProcessedAnswerService processedAnswerService) {
        this.questionRepository = questionRepository;
        this.processedQuestionService = processedQuestionService;
        this.userService = userService;
        this.possibleAnswerService = possibleAnswerService;
        this.processedAnswerService = processedAnswerService;
    }


    public void saveQuestion(ProcessedQuestion processedQuestion, Long userId) {
        questionRepository.save(processedQuestionService.getQuestionFromProcessedQuestion(processedQuestion, userId));
    }


    public void updateQuestion(ProcessedQuestion processedQuestion, Long userId, Long questionId) {
        Question existingQuestion = questionRepository.findById(questionId).get();
        Question updatingQuestion = processedQuestionService.getQuestionFromProcessedQuestion(processedQuestion, userId, questionId);

        updatingQuestion.setUuid(existingQuestion.getUuid());
        for (PossibleAnswer possibleAnswer : updatingQuestion.getPossibleAnswers()) {
            possibleAnswerService.savePossibleAnswer(possibleAnswer);
        }
        questionRepository.save(updatingQuestion);
    }


    public List<ProcessedQuestion> getAllUserQuestions(Long userId) {
        return processedQuestionService.getProcessedQuestions(questionRepository
                .getAllByUser(userService
                        .getUser(userId)));
    }


    public void updateQuestionAnswer(Long questionId, String answer){
        Question existingQuestion = questionRepository.findById(questionId).get();
        JSONObject answerJson = new JSONObject(answer);
        String answerStr = answerJson.getString("answer");
        existingQuestion.setAnswer(answerStr);
        questionRepository.save(existingQuestion);
    }


    public List<ProcessedAnswer> getAllUserAnswers(Long userId) {
        return processedAnswerService.getProcessedAnswers(questionRepository
                .getAllByForUserEmail(userService
                        .getUser(userId)
                        .getEmail()));
    }

    public void deleteQuestion(Long questionId) {
        questionRepository.delete(questionRepository.getById(questionId));
    }
}
