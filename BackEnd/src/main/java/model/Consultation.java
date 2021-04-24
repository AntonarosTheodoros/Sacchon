package model;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;


@Data @Entity
public class Consultation {
    @Id @GeneratedValue(strategy= GenerationType.IDENTITY) private long id;
    private Date date;
    private String medicationName;
    private double dosage;
    private String comment;
    @ManyToOne
    private Patient patient;
    @ManyToOne
    private Doctor doctor;

}
