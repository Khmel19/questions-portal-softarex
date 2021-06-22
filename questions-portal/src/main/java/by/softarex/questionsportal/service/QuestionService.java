package by.softarex.questionsportal.service;

import by.softarex.questionsportal.entity.PossibleAnswer;
import by.softarex.questionsportal.entity.Question;
import by.softarex.questionsportal.repository.QuestionRepository;
import by.softarex.questionsportal.util.ProcessedAnswer;
import by.softarex.questionsportal.util.ProcessedQuestion;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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
        Question existingQuestion = questionRepository.findById(questionId).get(); // TODO: Use Optional correctly.
        Question updatingQuestion = processedQuestionService.getQuestionFromProcessedQuestion(processedQuestion, userId, questionId);

        updatingQuestion.setUuid(existingQuestion.getUuid());
        for (PossibleAnswer possibleAnswer : updatingQuestion.getPossibleAnswers()) {  // TODO: Use java 8 steams here
            possibleAnswerService.savePossibleAnswer(possibleAnswer);
        }
        questionRepository.save(updatingQuestion);
    }


    public Page<ProcessedQuestion> getAllUserQuestions(Long userId, Pageable pageable) {

        Page<Question> questionsPage = questionRepository.getAllByUser(userService
                .getUser(userId), pageable);

        List<ProcessedQuestion> processedQuestionPageList = processedQuestionService
                .getProcessedQuestions(questionsPage.getContent());

        List<ProcessedQuestion> processedQuestionList = processedQuestionService
                .getProcessedQuestions(questionRepository
                        .getAllByUser(userService.getUser(userId)));

        return new PageImpl<>(
                processedQuestionPageList,
                pageable, processedQuestionList.size());
    }


    public void updateQuestionAnswer(Long questionId, String answer) {
        Question existingQuestion = questionRepository.findById(questionId).get(); // TODO: Use Optional correctly.
        JSONObject answerJson = new JSONObject(answer); // TODO: is Answer are JSON object? If yes, you should use some DTO object instead of String.
        String answerStr = answerJson.getString("answer");
        existingQuestion.setAnswer(answerStr);
        questionRepository.save(existingQuestion);
    }


    public ProcessedQuestion getQuestion(Long questionId) {
        return processedQuestionService.getProcessedQuestion(questionRepository.findById(questionId).get()); // TODO: Use Optional correctly.
    }


    public Page<ProcessedAnswer> getAllUserAnswers(Long userId, Pageable pageable) {
        Page<Question> answersPage = questionRepository // TODO: Code formatting looks strange (in some cases you use 8 spaces instead of 4, but it up to you.
                .getAllByForUserEmail(userService
                        .getUser(userId)
                        .getEmail(), pageable);

        List<ProcessedAnswer> processedAnswerPageList = processedAnswerService
                .getProcessedAnswers(answersPage.getContent());

        List<ProcessedAnswer> processedAnswerList = processedAnswerService
                .getProcessedAnswers(questionRepository
                        .getAllByForUserEmail(userService
                                .getUser(userId)
                                .getEmail()));

        return new PageImpl<>(
                processedAnswerPageList,
                pageable, processedAnswerList.size());
    }


    public void deleteQuestion(Long questionId) {
        questionRepository.delete(questionRepository.findById(questionId).get()); // TODO: Use Optional correctly.
    }
}
