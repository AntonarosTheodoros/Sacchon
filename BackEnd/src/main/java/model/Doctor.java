package model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.Date;
import java.util.List;


@Data @Entity
public class Doctor extends User{
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY) private long id;
    private String role="doctor";
    private Date recentConsultation;

    @OneToMany(mappedBy ="doctor", fetch= FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Consultation> consultationList;
    @OneToMany(mappedBy ="doctor", fetch= FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Patient> patientList;

}
