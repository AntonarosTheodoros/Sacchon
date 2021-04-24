package representation;

import jpaUtil.JpaUtil;
import lombok.Data;
import lombok.NoArgsConstructor;
import model.Glucose;
import repository.PatientRepository;

import javax.persistence.EntityManager;
import java.util.Date;
@Data
@NoArgsConstructor
public class GlucoseRepresentation {
    private long id;
    private double glucose;
    private Date date;
    private long patientId;

    private String uri;

    public GlucoseRepresentation(Glucose glucose) {
        if (glucose != null) {
            this.glucose = glucose.getGlucose();
            id= glucose.getId();
            date = glucose.getDate();
            if(glucose.getPatient()!=null){
                patientId= glucose.getPatient().getId();
            }
            uri =  "http://localhost:9000/v1/glucose/" + glucose.getId();
        }

    }

    public Glucose createGlucose() {
        Glucose glucose = new Glucose();
        glucose.setGlucose(this.glucose);

        if(date== null) date= new Date();
        glucose.setDate(date);

        EntityManager em= JpaUtil.getEntityManager();
        PatientRepository patientRepository= new PatientRepository(em);
        glucose.setPatient(patientRepository.read(patientId));
        return glucose;
    }
}
