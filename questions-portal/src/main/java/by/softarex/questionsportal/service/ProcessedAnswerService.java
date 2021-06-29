package by.softarex.questionsportal.service;

import by.softarex.questionsportal.dto.ProcessedAnswer;
import by.softarex.questionsportal.entity.Question;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProcessedAnswerService {

    public List<ProcessedAnswer> getProcessedAnswers(List<Question> questionsList) {
        List<ProcessedAnswer> processedQuestionList = new ArrayList<>();
        questionsList.forEach(question -> processedQuestionList.add(new ProcessedAnswer(question)));
        return processedQuestionList;
    }


    public ProcessedAnswer getProcessedAnswer(Question question) {
        return new ProcessedAnswer(question);
    }
}
