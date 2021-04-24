package resource.doctor;

import exception.AuthorizationException;
import jpaUtil.JpaUtil;
import model.Consultation;
import model.Patient;
import org.restlet.resource.Get;
import org.restlet.resource.Put;
import org.restlet.resource.ServerResource;
import repository.ConsultationRepository;
import repository.PatientRepository;
import representation.ConsultationRepresentation;
import resource.ResourceUtils;
import security.Shield;

import javax.persistence.EntityManager;
import java.util.List;

public class DoctorPatientConsultationResource extends ServerResource {
    private long patientId;
    private long consultationId;

    protected void doInit(){
        patientId= Long.parseLong(getAttribute("patientId"));
        consultationId= Long.parseLong(getAttribute("consultationId"));
    }


    @Get("json")
    public ConsultationRepresentation getConsultation() throws AuthorizationException {
        ResourceUtils.checkRole(this, Shield.ROLE_DOCTOR);
        EntityManager em= JpaUtil.getEntityManager();

        PatientRepository patientRepository= new PatientRepository(em);
        List<Consultation> consultationList= patientRepository.getConsultationList(this.patientId);
        Consultation consultation= new Consultation();
        for(Consultation c: consultationList){
            if(c.getId()==consultationId){
                consultation= c;
            }
        }
        ConsultationRepresentation consultationRepresentation= new ConsultationRepresentation(consultation);
        em.close();
        return consultationRepresentation;
    }

    @Put("json")
    public ConsultationRepresentation updateConsultation(ConsultationRepresentation consultationRepresentation) throws AuthorizationException {
        ResourceUtils.checkRole(this, Shield.ROLE_DOCTOR);
        if(consultationRepresentation==null) return null;
        EntityManager em= JpaUtil.getEntityManager();
        ConsultationRepository consultationRepository= new ConsultationRepository(em);
        Consultation consultation= consultationRepresentation.createConsultation();
        em.detach(consultation);
        consultation.setId(consultationId);
        consultationRepository.update(consultation);

        PatientRepository patientRepository= new PatientRepository(em);
        Patient patient= patientRepository.read(consultationRepresentation.getPatientId());
        patient.setConsultationChanged(true);
        patientRepository.update(patient);
        return consultationRepresentation;
    }

}
