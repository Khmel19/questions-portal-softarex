package by.softarex.questionsportal.controller;

import by.softarex.questionsportal.dto.ProcessedAnswer;
import by.softarex.questionsportal.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class AnswerController {

    private final QuestionService questionService;

    @Autowired
    public AnswerController(QuestionService questionService) {
        this.questionService = questionService;
    }


    @GetMapping("/{userId}/answers")
    public ResponseEntity<Page<ProcessedAnswer>> getAllUserAnswers(@PathVariable Long userId, Pageable pageable) {
        return ResponseEntity.ok(questionService.getAllUserAnswers(userId, pageable));
    }


    @GetMapping("/answers/{answerId}")
    public ResponseEntity<ProcessedAnswer> getAnswer(@PathVariable Long answerId) {
        return ResponseEntity.ok(questionService.getAnswer(answerId));
    }


    @PutMapping("/answers/{answerId}")
    public void updateQuestionAnswer(@RequestBody String answer, @PathVariable Long answerId) {
        questionService.updateQuestionAnswer(answerId, answer);
    }
}
