package resource;

import exception.AuthorizationException;
import model.Consultation;
import org.restlet.resource.Get;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;
import jpaUtil.JpaUtil;
import model.Consultation;
import repository.ConsultationRepository;
import representation.ConsultationRepresentation;
import security.Shield;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

public class ConsultationResource extends ServerResource{
    private long id;

    protected void doInit(){
        id= Long.parseLong(getAttribute("id"));
    }


    @Get("json")
    public ConsultationRepresentation getConsultation() throws AuthorizationException {
        ResourceUtils.checkRole(this, Shield.ROLE_CHIEF_DOCTOR);
        EntityManager em= JpaUtil.getEntityManager();
        ConsultationRepository consultationRepository= new ConsultationRepository(em);
        Consultation consultation= consultationRepository.read(id);
        ConsultationRepresentation consultationRepresentation= new ConsultationRepresentation(consultation);
        em.close();
        return consultationRepresentation;
    }
}
