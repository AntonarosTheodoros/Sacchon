package model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@Data @MappedSuperclass
public class User {
    @Column(unique=true) private String username;
    @Column(unique=true)
    private String password;

    private String name;
    private String email;
    private String address;




}
