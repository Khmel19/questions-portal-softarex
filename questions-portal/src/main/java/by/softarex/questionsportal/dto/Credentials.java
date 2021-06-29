package by.softarex.questionsportal.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class Credentials implements Serializable {
    private String email;
    private String password;
}
