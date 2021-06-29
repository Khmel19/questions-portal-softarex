package by.softarex.questionsportal.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class UserDTO implements Serializable {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String currentPassword;
    private String newPassword;
}
