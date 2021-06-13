package by.softarex.questionsportal.service;

import by.softarex.questionsportal.entity.PossibleAnswer;
import by.softarex.questionsportal.entity.Question;
import by.softarex.questionsportal.repository.PossibleAnswerRepository;
import by.softarex.questionsportal.repository.QuestionRepository;
import by.softarex.questionsportal.util.ProcessedQuestion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final UserService userService;
    private final ProcessedQuestionService processedQuestionService;
    private final PossibleAnswerRepository possibleAnswerRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository,
                           ProcessedQuestionService processedQuestionService,
                           UserService userService,
                           PossibleAnswerRepository possibleAnswerRepository) {
        this.questionRepository = questionRepository;
        this.processedQuestionService = processedQuestionService;
        this.userService = userService;
        this.possibleAnswerRepository = possibleAnswerRepository;
    }


    public void saveQuestion(ProcessedQuestion processedQuestion, Long userId) {
        questionRepository.save(processedQuestionService.getQuestionFromProcessedQuestion(processedQuestion, userId));
    }


    public void updateQuestion(ProcessedQuestion processedQuestion, Long userId, Long questionId) {
        Question existingQuestion = questionRepository.findById(questionId).get();
        Question updatingQuestion = processedQuestionService.getQuestionFromProcessedQuestion(processedQuestion, userId, questionId);

        updatingQuestion.setUuid(existingQuestion.getUuid());
        for (PossibleAnswer possibleAnswer : updatingQuestion.getPossibleAnswers()) {
           possibleAnswerRepository.save(possibleAnswer);
        }
        questionRepository.save(updatingQuestion);
    }


    public List<ProcessedQuestion> getAllUserQuestions(Long id) {
        return processedQuestionService.getProcessedQuestions(questionRepository.getAllByUser(userService.getUser(id)));
    }


    public void deleteQuestion(Long questionId){
        questionRepository.delete(questionRepository.getById(questionId));
    }
}
