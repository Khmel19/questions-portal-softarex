package by.softarex.questionsportal.controller;

import by.softarex.questionsportal.service.QuestionService;
import by.softarex.questionsportal.util.ProcessedAnswer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        // don't use userId to retrieve all emails, better to use uuid filed
        return ResponseEntity.ok(questionService.getAllUserAnswers(userId, pageable));
    }


    @PutMapping("/{userId}/answers/{answerId}/edit") // TODO: juts /{userId}/answers/{answerId} without edit
    public ResponseEntity<ProcessedAnswer> updateQuestionAnswer( // TODO: you don't return here anything, you don't need ResponseEntity<ProcessedAnswer>
            @RequestBody String answer,
            @PathVariable Long userId,
            @PathVariable Long answerId) {
        questionService.updateQuestionAnswer(answerId, answer);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
