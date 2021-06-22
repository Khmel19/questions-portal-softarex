package by.softarex.questionsportal.service;

import by.softarex.questionsportal.entity.Question;
import by.softarex.questionsportal.util.ProcessedAnswer;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
// TODO: I believe more appropriate name will be AnswerConverterService for this class
public class ProcessedAnswerService {

    public List<ProcessedAnswer> getProcessedAnswers(List<Question> questionsList) {
        List<ProcessedAnswer> processedQuestionList = new ArrayList<>();

        for (Question question : questionsList) { // TODO: Please java 8 stream here
            processedQuestionList.add(new ProcessedAnswer(question));
        }
        return processedQuestionList;
    }

}
