package representation;

import jpaUtil.JpaUtil;
import lombok.Data;
import lombok.NoArgsConstructor;
import model.Consultation;
import repository.DoctorRepository;
import repository.PatientRepository;

import javax.persistence.EntityManager;
import java.util.Date;

@Data
@NoArgsConstructor
public class ConsultationRepresentation {
    private long id;
    private Date date;
    private String medicationName;
    private double dosage;
    private String comment;
    private long patientId;
    private long doctorId;

    private String uri;

    public ConsultationRepresentation(Consultation consultation) {
        if (consultation != null) {
            id= consultation.getId();
            date= consultation.getDate();
            medicationName = consultation.getMedicationName();
            dosage = consultation.getDosage();
            comment = consultation.getComment();
            if(consultation.getPatient()!=null) {
                patientId = consultation.getPatient().getId();
            }
            if(consultation.getDoctor()!=null) {
                doctorId = consultation.getDoctor().getId();
            }
            uri =  "http://localhost:9000/v1/consultation/" + consultation.getId();
        }

    }

    public Consultation createConsultation() {
        Consultation consultation = new Consultation();
        consultation.setDate(date);
        consultation.setMedicationName(medicationName);
        consultation.setDosage(dosage);
        consultation.setComment(comment);

        EntityManager em= JpaUtil.getEntityManager();
        PatientRepository patientRepository= new PatientRepository(em);
        DoctorRepository doctorRepository= new DoctorRepository(em);
        consultation.setPatient(patientRepository.read(patientId));
        consultation.setDoctor(doctorRepository.read(doctorId));

        return consultation;
    }
}
