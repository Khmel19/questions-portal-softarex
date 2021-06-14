package by.softarex.questionsportal.service;

import by.softarex.questionsportal.entity.Question;
import by.softarex.questionsportal.util.ProcessedAnswer;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProcessedAnswerService {

    public List<ProcessedAnswer> getProcessedAnswers(List<Question> questionsList) {
        List<ProcessedAnswer> processedQuestionList = new ArrayList<>();

        for (Question question : questionsList) {
            processedQuestionList.add(new ProcessedAnswer(question));
        }
        return processedQuestionList;
    }

}
