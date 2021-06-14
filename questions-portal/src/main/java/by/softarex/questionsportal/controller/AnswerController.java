package by.softarex.questionsportal.controller;

import by.softarex.questionsportal.service.QuestionService;
import by.softarex.questionsportal.util.ProcessedAnswer;
import netscape.javascript.JSObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AnswerController {

    private final QuestionService questionService;

    @Autowired
    public AnswerController(QuestionService questionService) {
        this.questionService = questionService;
    }


    @GetMapping("/{userId}/answers")
    public ResponseEntity<List<ProcessedAnswer>> getAllUserAnswers(@PathVariable Long userId) {
        return ResponseEntity.ok(questionService.getAllUserAnswers(userId));
    }


    @PutMapping("/{userId}/answers/{answerId}/edit")
    public ResponseEntity<ProcessedAnswer> updateQuestionAnswer(
            @RequestBody String answer,
            @PathVariable Long userId,
            @PathVariable Long answerId) {
        questionService.updateQuestionAnswer(answerId, answer);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
