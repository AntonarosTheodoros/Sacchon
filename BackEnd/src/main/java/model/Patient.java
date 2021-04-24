package model;


import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data @Entity
public class Patient extends User{
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY) private long id;
    private int age;
    private String sex;
    private Date dateRegistered;
    private String role= "patient";
    private boolean consultationChanged= false;
    private Date recentConsultation;
    private Date recentCarb;
    private Date recentGlucose;

    @ManyToOne
    private Doctor doctor;
    @OneToMany(mappedBy = "patient", fetch= FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Carb> carbList;
    @OneToMany(mappedBy = "patient", fetch= FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Glucose> glucoseList;
    @OneToMany(mappedBy = "patient", fetch= FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Consultation> consultationList;



}
