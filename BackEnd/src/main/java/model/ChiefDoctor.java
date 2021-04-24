package model;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class ChiefDoctor extends User{
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;
    private String role="chiefDoctor";


}


