package model;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;


@Data @Entity
public class Carb{
    @Id @GeneratedValue(strategy= GenerationType.IDENTITY) private long id;

    private double carb;
    private Date date;
    private Date simpleDate;

    @ManyToOne
    private Patient patient;
}
