package by.softarex.questionsportal.controller;

import by.softarex.questionsportal.dto.ProcessedQuestion;
import by.softarex.questionsportal.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class QuestionController {

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }


    @GetMapping("/api/{userId}/questions")
    public ResponseEntity<Page<ProcessedQuestion>> getAllUserQuestions(@PathVariable Long userId, Pageable pageable, HttpServletResponse response) {

        return ResponseEntity.ok(questionService.getAllUserQuestions(userId, pageable));
    }


    @GetMapping("/api/questions/{questionId}")
    public ResponseEntity<ProcessedQuestion> getQuestion(@PathVariable Long questionId) {
        return ResponseEntity.ok(questionService.getQuestion(questionId));
    }

    @PostMapping("/api/{userId}/questions/add")
    public void addQuestion(@RequestBody ProcessedQuestion processedQuestion, @PathVariable Long userId) {
        questionService.saveQuestion(processedQuestion, userId);
    }


    @PutMapping("/api/{userId}/questions/{questionId}")
    public void updateQuestion(
            @RequestBody ProcessedQuestion processedQuestion,
            @PathVariable Long userId,
            @PathVariable Long questionId
    ) {
        questionService.updateQuestion(processedQuestion, userId, questionId);
    }


    @DeleteMapping("/api/{userId}/questions/{questionId}/delete")
    public void deleteQuestion(@PathVariable Long questionId) {
        questionService.deleteQuestion(questionId);
    }
}