package resource.doctor;

import exception.AuthorizationException;
import jpaUtil.JpaUtil;
import model.*;
import model.Consultation;
import org.restlet.resource.Get;
import org.restlet.resource.Post;
import org.restlet.resource.Put;
import org.restlet.resource.ServerResource;
import repository.DoctorRepository;
import repository.GlucoseRepository;
import repository.ConsultationRepository;
import repository.PatientRepository;
import representation.ConsultationRepresentation;
import representation.GlucoseRepresentation;
import representation.ConsultationRepresentation;
import representation.PatientRepresentation;
import resource.ResourceUtils;
import security.Shield;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class DoctorConsultationListResource extends ServerResource {
    private long doctorId;

    protected void doInit(){
        doctorId= Long.parseLong(getAttribute("doctorId"));
    }

    @Get("json")
    public List<ConsultationRepresentation> getConsultationList() throws AuthorizationException {
        ResourceUtils.checkRole(this, Shield.ROLE_DOCTOR);
        EntityManager em= JpaUtil.getEntityManager();
        DoctorRepository doctorRepository= new DoctorRepository(em);
        List<Consultation> consultationList= doctorRepository.getConsultationList(this.doctorId);
        List<ConsultationRepresentation> consultationRepresentationList= new ArrayList<>();

        for(Consultation consultation: consultationList) {
            consultationRepresentationList.add(new ConsultationRepresentation(consultation));
        }

        em.close();

        return consultationRepresentationList;
    }
    @Post("json")
    public ConsultationRepresentation add(ConsultationRepresentation consultationRepresentationIn) throws AuthorizationException {
        ResourceUtils.checkRole(this, Shield.ROLE_DOCTOR);
        if(consultationRepresentationIn==null) return null;

        consultationRepresentationIn.setDoctorId(this.doctorId);
        Consultation consultation= consultationRepresentationIn.createConsultation();
        EntityManager em= JpaUtil.getEntityManager();
        ConsultationRepository consultationRepository= new ConsultationRepository(em);
        consultationRepository.save(consultation);
        ConsultationRepresentation c= new ConsultationRepresentation(consultation);

        DoctorRepository doctorRepository= new DoctorRepository(em);
        Doctor doctor= doctorRepository.read(doctorId);
        em.detach(doctor);
        doctor.setRecentConsultation(new Date());
        doctorRepository.update(doctor);

        return c;
    }

}
