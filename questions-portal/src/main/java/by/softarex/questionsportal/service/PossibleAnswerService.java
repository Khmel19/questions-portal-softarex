package by.softarex.questionsportal.service;

import by.softarex.questionsportal.entity.PossibleAnswer;
import by.softarex.questionsportal.repository.PossibleAnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PossibleAnswerService {
    private final PossibleAnswerRepository possibleAnswerRepository;

    @Autowired
    public PossibleAnswerService(PossibleAnswerRepository possibleAnswerRepository) {
        this.possibleAnswerRepository = possibleAnswerRepository;
    }

    public void savePossibleAnswer(PossibleAnswer possibleAnswer){
        possibleAnswerRepository.save(possibleAnswer);
    }
}
