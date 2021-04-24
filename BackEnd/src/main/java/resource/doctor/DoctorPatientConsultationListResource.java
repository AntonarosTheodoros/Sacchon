package resource.doctor;

import exception.AuthorizationException;
import jpaUtil.JpaUtil;
import model.Consultation;
import model.Doctor;
import model.Patient;
import org.restlet.resource.Get;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;
import repository.ConsultationRepository;
import repository.DoctorRepository;
import repository.PatientRepository;
import representation.ConsultationRepresentation;
import resource.ResourceUtils;
import security.Shield;

import javax.persistence.EntityManager;
import javax.print.Doc;
import java.util.ArrayList;
import java.util.List;

public class DoctorPatientConsultationListResource extends ServerResource {
    private long patientId;

    protected void doInit(){
        patientId= Long.parseLong(getAttribute("patientId"));
    }


    @Get("json")
    public List<ConsultationRepresentation> getConsultationList() throws AuthorizationException {
        ResourceUtils.checkRole(this, Shield.ROLE_DOCTOR);
        EntityManager em= JpaUtil.getEntityManager();

        PatientRepository patientRepository= new PatientRepository(em);
        List<Consultation> consultationList= patientRepository.getConsultationList(this.patientId);
        List<ConsultationRepresentation> consultationRepresentationList= new ArrayList<>();

        for(Consultation c: consultationList) {
            consultationRepresentationList.add(new ConsultationRepresentation(c));
        }

        em.close();
        return consultationRepresentationList;
    }

    @Post("json")
    public ConsultationRepresentation add(ConsultationRepresentation consultationRepresentationIn) throws AuthorizationException {
        ResourceUtils.checkRole(this, Shield.ROLE_DOCTOR);
        if(consultationRepresentationIn==null) return null;

        consultationRepresentationIn.setPatientId(this.patientId);
        Consultation consultation= consultationRepresentationIn.createConsultation();
        EntityManager em= JpaUtil.getEntityManager();
        ConsultationRepository consultationRepository= new ConsultationRepository(em);
        consultationRepository.save(consultation);
        ConsultationRepresentation c= new ConsultationRepresentation(consultation);

        PatientRepository patientRepository= new PatientRepository(em);
        Patient patient= patientRepository.read(patientId);

        DoctorRepository doctorRepository= new DoctorRepository(em);
        patient.setDoctor(doctorRepository.read(consultationRepresentationIn.getDoctorId()));
        patient.setRecentConsultation(consultationRepresentationIn.getDate());

        em.detach(patient);
        patientRepository.update(patient);

        Doctor doctor= doctorRepository.read(consultationRepresentationIn.getDoctorId());
        em.detach(doctor);
        doctor.setRecentConsultation(consultationRepresentationIn.getDate());
        doctorRepository.update(doctor);


        return c;
    }
}