package by.softarex.questionsportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", length = 35)
    private String firstName;

    @Column(name = "last_name", length = 45)
    private String lastName;
    @Column(length = 55, unique = true)
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    private String password;

}
