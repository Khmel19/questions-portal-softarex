package by.softarex.questionsportal.controller;

import by.softarex.questionsportal.service.QuestionService;
import by.softarex.questionsportal.util.ProcessedQuestion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
public class QuestionController {

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }


    @GetMapping("/{userId}/questions")
    public ResponseEntity<List<ProcessedQuestion>> getAllUserQuestions(@PathVariable Long userId) {
        return ResponseEntity.ok(questionService.getAllUserQuestions(userId));
    }


    @PostMapping("/{userId}/questions/add")
    public ResponseEntity<ProcessedQuestion> addQuestion(HttpServletRequest request, HttpServletResponse response, @RequestBody ProcessedQuestion processedQuestion, @PathVariable Long userId) {
        questionService.saveQuestion(processedQuestion, userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PutMapping("/{userId}/questions/{questionId}/edit")
    public ResponseEntity<ProcessedQuestion> updateQuestion(
            @RequestBody ProcessedQuestion processedQuestion,
            @PathVariable Long userId,
            @PathVariable Long questionId
    ) {
        questionService.updateQuestion(processedQuestion, userId, questionId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @DeleteMapping("/{userId}/questions/{questionId}/delete")
    public ResponseEntity<ProcessedQuestion> deleteQuestion(@PathVariable Long questionId){
        questionService.deleteQuestion(questionId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}