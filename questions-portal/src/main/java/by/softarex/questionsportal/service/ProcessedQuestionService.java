package by.softarex.questionsportal.service;

import by.softarex.questionsportal.dto.ProcessedQuestion;
import by.softarex.questionsportal.entity.Question;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProcessedQuestionService {

    public List<ProcessedQuestion> getProcessedQuestions(List<Question> questionsList) {
        List<ProcessedQuestion> processedQuestionList = new ArrayList<>();
        questionsList.forEach(question -> processedQuestionList.add(new ProcessedQuestion(question)));
        return processedQuestionList;
    }


    public ProcessedQuestion getProcessedQuestion(Question question) {
        return new ProcessedQuestion(question);
    }

}