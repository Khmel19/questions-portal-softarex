package by.softarex.questionsportal.service;

import by.softarex.questionsportal.dto.ProcessedAnswer;
import by.softarex.questionsportal.dto.ProcessedQuestion;
import by.softarex.questionsportal.entity.Question;
import by.softarex.questionsportal.repository.QuestionRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final UserService userService;
    private final ProcessedQuestionService processedQuestionService;
    private final PossibleAnswerService possibleAnswerService;
    private final ProcessedAnswerService processedAnswerService;
    private final QuestionConverterService questionConverterService;

    @Autowired
    public QuestionService(QuestionRepository questionRepository,
                           ProcessedQuestionService processedQuestionService,
                           UserService userService,
                           PossibleAnswerService possibleAnswerService,
                           ProcessedAnswerService processedAnswerService,
                           QuestionConverterService questionConverterService) {
        this.questionRepository = questionRepository;
        this.processedQuestionService = processedQuestionService;
        this.userService = userService;
        this.possibleAnswerService = possibleAnswerService;
        this.processedAnswerService = processedAnswerService;
        this.questionConverterService = questionConverterService;

    }


    public void saveQuestion(ProcessedQuestion processedQuestion, Long userId) {
        questionRepository.save(questionConverterService.getQuestionFromProcessedQuestion(processedQuestion, userId));
    }


    public void updateQuestion(ProcessedQuestion processedQuestion, Long userId, Long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        if (optionalQuestion.isPresent()) {
            Question existingQuestion = optionalQuestion.get();
            Question updatingQuestion = questionConverterService.getQuestionFromProcessedQuestion(processedQuestion, userId, questionId);

            updatingQuestion.setUuid(existingQuestion.getUuid());
            updatingQuestion.getPossibleAnswers().forEach(possibleAnswerService::savePossibleAnswer);
            questionRepository.save(updatingQuestion);
        }
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
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        if (optionalQuestion.isPresent()) {
            Question existingQuestion = optionalQuestion.get();

            JSONObject answerJson = new JSONObject(answer);
            String answerStr = answerJson.getString("answer");
            existingQuestion.setAnswer(answerStr);
            questionRepository.save(existingQuestion);
        }
    }


    public ProcessedQuestion getQuestion(Long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        return optionalQuestion.map(processedQuestionService::getProcessedQuestion).orElse(null);
    }


    public ProcessedAnswer getAnswer(Long answerId) {
        Optional<Question> optionalQuestion = questionRepository.findById(answerId);
        return optionalQuestion.map(processedAnswerService::getProcessedAnswer).orElse(null);
    }


    public Page<ProcessedAnswer> getAllUserAnswers(Long userId, Pageable pageable) {
        Page<Question> answersPage = questionRepository
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
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        optionalQuestion.ifPresent(questionRepository::delete);
    }
}
